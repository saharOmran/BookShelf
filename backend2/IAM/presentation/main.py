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

