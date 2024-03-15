from datetime import timedelta
import secrets
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
import redis
from passlib.context import CryptContext

from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker
import sys
from pathlib import Path
from security import authenticate_user, create_access_token
from constants import ALGORITHM, SECRET_KEY

sys.path.append(str(Path(__file__).resolve().parent.parent))

from infrastructure.user_repo import UserRepository
from infrastructure.verification_service import VerificationService
from application.user_service import UserService
from domain.user import Base
import infrastructure
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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



@app.post("/register/")
def register(mobile_number: str, email: str, username: str, password: str):
    db = SessionLocal()
    user_repo = UserRepository(db)
    verification_service = VerificationService(redis.Redis())
    user_service = UserService(user_repo, verification_service)
    hashed_password = pwd_context.hash(password)
    registration_info = user_service.register_user(mobile_number, email, username, hashed_password)
    print(registration_info)
    return registration_info


@app.post("/login/")
def login(mobile_number: str, verification_code: str):
    db = SessionLocal()
    user_repo = UserRepository(db)
    verification_service = VerificationService(redis.Redis())
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



@app.post("/token")
async def login_for_access_token(mobile_number: str, password: str):
    db = SessionLocal() 
    user_repo = UserRepository(db)
    user = authenticate_user(user_repo, mobile_number, password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect phone number or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.mobile_number}, expires_delta=access_token_expires)
    
    return {"access_token": access_token, "token_type": "bearer"}


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
