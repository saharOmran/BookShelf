from datetime import timedelta
from distutils import errors
import logging
import secrets
from typing import List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from fastapi import Path as pth
from fastapi import File, UploadFile
import redis
from fastapi import Form
from passlib.context import CryptContext
import os
from bson import ObjectId
from sqlalchemy import create_engine
from fastapi.responses import JSONResponse
from urllib.parse import urljoin
from fastapi.responses import FileResponse
from sqlalchemy.orm import sessionmaker
import sys
from pathlib import Path
from security import authenticate_user, create_access_token
from constants import ALGORITHM, SECRET_KEY
from starlette.responses import Response
sys.path.append(str(Path(__file__).resolve().parent.parent))
from application.cart_service import CartService
from infrastructure.cart_repo import CartRepository
from sqlalchemy.orm import Session
from domain.cart_item import CartItem
from infrastructure.user_repo import UserRepository
from infrastructure.verification_service import VerificationService
from application.user_service import UserService
from domain.user import Base
import infrastructure
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, UploadFile, File
from pymongo import MongoClient
from gridfs import GridFS
from fastapi import HTTPException
from starlette.responses import StreamingResponse
import json
from domain.book import Book
from application.book_service import BookService
from infrastructure.book_repo import BookRepository
from bson import ObjectId
import requests
import pybreaker
from tenacity import retry, stop_after_attempt, wait_fixed


# Configure logger
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()
MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
client = MongoClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/")
db = client["media_db"]

book_repository = BookRepository(db)
book_service = BookService(db)

# Connect to MongoDB
client = MongoClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/")
db = client["media_db"]
fs = GridFS(db)

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

REDIS_HOST = os.getenv("REDIS_HOST", "172.18.0.2")
REDIS_PORT = 6379
redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

# Circuit Breaker Configuration
circuit_breaker = pybreaker.CircuitBreaker(fail_max=5, reset_timeout=60)

# Retry Configuration
@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
def call_external_service(url):
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response

# Token expiry time
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Service Instances
cart_repository = CartRepository(redis_client)
cart_service = CartService(cart_repository)
book_repository = BookRepository(db)
book_service = BookService(db)

@app.post("/register/")
def register(mobile_number: str, email: str, username: str, password: str):
    db = SessionLocal()
    user_repo = UserRepository(db)
    verification_service = VerificationService(redis_client)
    user_service = UserService(user_repo, verification_service)
    hashed_password = pwd_context.hash(password)
    registration_info = user_service.register_user(mobile_number, email, username, hashed_password)
    logging.info(f"Registration info: {registration_info}")
    return registration_info


@app.post("/login/")
def login(mobile_number: str, verification_code: str):
    db = SessionLocal()
    user_repo = UserRepository(db)
    verification_service = VerificationService(redis.Redis(host=REDIS_HOST, port=REDIS_PORT))
    user_service = UserService(user_repo, verification_service)
    user = user_service.login(mobile_number, verification_code)
    if user:
        return {"message": "Login successful", "user": user.mobile_number}
    else:
        raise HTTPException(status_code=401, detail="Login failed")
''' 
@app.post("/login2/")
def login(mobile_number: str, password: str):
    db = SessionLocal()  
    user_repo = UserRepository(db)  
    user = user_repo.get_by_mobile_number(mobile_number)  
    if user and user.password == password:
        return {"message": "Login successful", "user": user.mobile_number}
    else:
        raise HTTPException(status_code=401, detail="Login failed")
'''  



ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



@circuit_breaker
def authenticate_and_create_token(db, mobile_number, password):
    user_repo = UserRepository(db)
    user = authenticate_user(user_repo, mobile_number, password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect phone number or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.mobile_number}, expires_delta=access_token_expires)
    return access_token, user

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    try:
        access_token, user = authenticate_and_create_token(db, form_data.username, form_data.password)
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "email": user.email,
            "username": user.username,
            "phone_number": user.mobile_number
        }
    except pybreaker.CircuitBreakerError:
        raise HTTPException(status_code=503, detail="Service unavailable due to high failure rate. Please try again later.")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        db.close()


@app.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"username": username}


@app.get("/uploaded_files/{file_id}")
async def get_uploaded_file(file_id: str):
    if fs.exists(ObjectId(file_id)):
        file_info = fs.get(ObjectId(file_id))
        content = file_info.read()
        return Response(content, media_type='application/octet-stream', headers={"Content-Disposition": f"attachment; filename={file_info.filename}"})
    else:
        raise HTTPException(status_code=404, detail="File not found")
    

@app.post("/books/")
async def add_book(
    name: str = Form(...),
    category: str = Form(...),
    writers_name: str = Form(...),
    publisher_name: str = Form(...),
    price: float = Form(...),
    year_of_publication: int = Form(...),
    explanation: str = Form(...),
    image: UploadFile = File(...),
    book_number: str = Form(...)
):
    # Save the uploaded image to GridFS
    content = await image.read()
    file_id = fs.put(content, filename=image.filename)
    image_url = f"http://localhost:8000/uploaded_files/{file_id}"

    # Prepare book data
    book_data = {
        "name": name,
        "category": category,
        "writers_name": writers_name,
        "publisher_name": publisher_name,
        "price": price,
        "year_of_publication": year_of_publication,
        "explanation": explanation,
        "image_url": image_url,
        "book_number": book_number
    }

    # Save the book to MongoDB
    try:
        book_id, _ = book_service.add_book(book_data)
        return {"book_id": book_id, "image_url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 

# Update Book Endpoint
@app.put("/books/{book_id}")
async def edit_book(
    book_id: str = pth(..., title="The ID of the book to edit"),
    name: str = Form(None),
    category: str = Form(None),
    writers_name: str = Form(None),
    publisher_name: str = Form(None),
    price: float = Form(None),
    year_of_publication: int = Form(None),
    explanation: str = Form(None),
    image: UploadFile = File(None),
    book_number: str = Form(None)
):
    try:
        # Retrieve existing book data
        existing_book = book_service.get_book_by_id(book_id)
        if not existing_book:
            raise HTTPException(status_code=404, detail="Book not found")

        # Update book data if new values are provided
        if name:
            existing_book["name"] = name
        if category:
            existing_book["category"] = category
        # Update other fields similarly...

        # If a new image is provided, update it in GridFS and update image_url
        if image:
            content = await image.read()
            file_id = fs.put(content, filename=image.filename)
            existing_book["image_url"] = f"http://localhost:8000/uploaded_files/{file_id}"

        # Save updated book data
        book_service.update_book(book_id, existing_book)
        return {"message": "Book updated successfully"}
    except Exception as e:
        logging.error(f"Error editing book: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/books/get_books_with_book_ids", response_model=List[dict])
async def get_books_with_book_ids():
    try:
        books = book_service.get_all_books()
        book_ids_and_titles = [{"book_id": str(book["_id"]), "title": book["name"]
                                , "title": book["name"]
                                , "category": book["category"]
                                , "writers_name": book["writers_name"]
                                , "publisher_name": book["publisher_name"]
                                , "price": book["price"]
                                , "year_of_publication": book["year_of_publication"]
                                , "explanation": book["explanation"]
                                , "image_url": book["image_url"]
                                , "book_number": book["book_number"]} for book in books]
        return book_ids_and_titles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Delete Book Endpoint
@app.delete("/books/{book_id}")
async def delete_book(book_id: str = pth(..., title="The ID of the book to delete")):
    try:
        # Check if the book exists
        existing_book = book_service.get_book_by_id(book_id)
        if not existing_book:
            raise HTTPException(status_code=404, detail="Book not found")

        # Delete book from MongoDB
        book_service.delete_book(book_id)

        # Delete associated image from GridFS
        if "image_url" in existing_book:
            file_id = existing_book["image_url"].split("/")[-1]
            fs.delete(ObjectId(file_id))

        return {"message": "Book deleted successfully"}
    except Exception as e:
        logging.error(f"Error deleting book: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    file_id = fs.put(content, filename=file.filename)
    # Extract metadata
    metadata = {
        "file_name": file.filename,
        "file_size": len(content),
        # Add more metadata as needed
    }
    # Save metadata along with the file ID
    db.metadata.insert_one({"file_id": str(file_id), "metadata": metadata})
    file_url = urljoin("http://localhost:8000/uploaded_files/", str(file_id))
    return JSONResponse(content={"file_id": str(file_id), "file_url": file_url, "metadata": metadata}, status_code=201)



@app.put("/edit/{file_id}")
async def edit_file(file_id: str, new_content: UploadFile = File(...)):
    content = await new_content.read()
    if fs.exists(ObjectId(file_id)):
        # Open existing file by file_id
        existing_file = fs.get(ObjectId(file_id))
        # Delete existing file
        fs.delete(ObjectId(file_id))
        # Create a new file with the same file_id and new content
        fs.put(content, _id=existing_file._id, filename=existing_file.filename)
        # Extract metadata from the new content
        metadata = {
            "file_name": existing_file.filename,
            "file_size": len(content),
            # Add more metadata as needed
        }
        # Update metadata in the database
        db.metadata.update_one({"file_id": str(file_id)}, {"$set": {"metadata": metadata}})
        # Return the edited file content and metadata
        edited_file = fs.get(ObjectId(file_id))
        edited_content = edited_file.read()
        
        # Encode metadata into headers
        headers = {
            "Content-Disposition": f"attachment; filename={edited_file.filename}",
            "metadata": json.dumps(metadata)  # Encode metadata as JSON string
        }
        
        return StreamingResponse(
            content=edited_content,
            media_type='application/octet-stream',
            headers=headers
        )
    else:
        raise HTTPException(status_code=404, detail="File not found")



# Endpoint for deleting files
@app.delete("/delete/{file_id}")
async def delete_file(file_id: str):
    if fs.exists(ObjectId(file_id)):
        fs.delete(ObjectId(file_id))
        return {"message": "File deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="File not found")


cart_repository = CartRepository(redis_client)
cart_service = CartService(cart_repository)
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
@app.post("/cart/add")
async def add_to_cart(cart_item: CartItem, token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    cart_service.add_to_cart(user_id, cart_item)
    return {"message": "Item added to cart successfully"}

@app.get("/cart")
async def get_cart(token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    cart_items = cart_service.get_cart(user_id)
    return {"cart_items": cart_items}

@app.delete("/cart/remove/{book_id}")
async def remove_from_cart(book_id: str, token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    cart_service.remove_from_cart(user_id, book_id)
    return {"message": "Item removed from cart successfully"}

@app.delete("/cart/clear")
async def clear_cart(token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    cart_service.clear_cart(user_id)
    return {"message": "Cart cleared successfully"}

@app.put("/cart/increase/{book_id}")
async def increase_item_quantity(book_id: str, token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    cart_service.update_cart_item_quantity(user_id, book_id, 1)
    return {"message": "Item quantity increased successfully"}

@app.put("/cart/decrease/{book_id}")
async def decrease_item_quantity(book_id: str, token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    cart_service.update_cart_item_quantity(user_id, book_id, -1)
    return {"message": "Item quantity decreased successfully"}



@app.post("/favorites/add")
async def add_to_favorites(book_id: str, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    cart_service.add_to_favorites(user_id, book_id)
    return {"message": "Book added to favorites successfully"}

@app.get("/favorites")
async def get_favorites(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    favorites = cart_service.get_favorites(user_id)
    return {"favorites": favorites}

@app.delete("/favorites/remove/{book_id}")
async def remove_from_favorites(book_id: str, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    cart_service.remove_from_favorites(user_id, book_id)
    return {"message": "Book removed from favorites successfully"}

@app.post("/payment")
async def make_payment(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    cart_items = cart_service.get_cart(user_id)
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    # Simulate payment processing
    cart_service.clear_cart(user_id)
    return {"message": "Payment successful and cart cleared"}


# Book Endpoints
@app.get("/book/get_book/{id}", response_model=Book)
async def get_book(id: str):
    try:
        book = book_service.get_book_by_id(id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book/get_all_books", response_model=List[Book])
async def get_all_books():
    try:
        books = book_service.get_all_books()
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book/get_books_by_title/{title}", response_model=List[Book])
async def get_books_by_title(title: str):
    try:
        books = book_service.get_books_by_title(title)
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book/get_books_by_author/{author}", response_model=List[Book])
async def get_books_by_author(author: str):
    try:
        books = book_service.get_books_by_author(author)
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book/get_books_by_category/{category}", response_model=List[Book])
async def get_books_by_category(category: str):
    try:
        books = book_service.get_books_by_category(category)
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/book/get_books_by_title_with_bookid_inresponse/{title}", response_model=List[dict])
async def get_books_by_title_with_bookid_inresponse(title: str):
    try:
        books = book_service.get_books_by_title(title)
        book_ids_and_books = [{"book_id": str(book["_id"])
                               , "name": book["name"]
                                , "category": book["category"]
                                , "writers_name": book["writers_name"]
                                , "publisher_name": book["publisher_name"]
                                , "price": book["price"]
                                , "year_of_publication": book["year_of_publication"]
                                , "explanation": book["explanation"]
                                , "image_url": book["image_url"]
                                , "book_number": book["book_number"]} for book in books]
        return book_ids_and_books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book/get_books_by_author_with_bookid_inresponse/{author}", response_model=List[dict])
async def get_books_by_author_with_bookid_inresponse(author: str):
    try:
        books = book_service.get_books_by_author(author)
        book_ids_and_books = [{"book_id": str(book["_id"])
                               , "name": book["name"]
                                , "category": book["category"]
                                , "writers_name": book["writers_name"]
                                , "publisher_name": book["publisher_name"]
                                , "price": book["price"]
                                , "year_of_publication": book["year_of_publication"]
                                , "explanation": book["explanation"]
                                , "image_url": book["image_url"]
                                , "book_number": book["book_number"]} for book in books]
        return book_ids_and_books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book/get_books_by_category_with_bookid_inresponse/{category}", response_model=List[dict])
async def get_books_by_category_with_bookid_inresponse(category: str):
    try:
        books = book_service.get_books_by_category(category)
        book_ids_and_books = [{"book_id": str(book["_id"])
                               , "name": book["name"]
                                , "category": book["category"]
                                , "writers_name": book["writers_name"]
                                , "publisher_name": book["publisher_name"]
                                , "price": book["price"]
                                , "year_of_publication": book["year_of_publication"]
                                , "explanation": book["explanation"]
                                , "image_url": book["image_url"]
                                , "book_number": book["book_number"]} for book in books]
        return book_ids_and_books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))