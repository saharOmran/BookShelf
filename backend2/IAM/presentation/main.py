from fastapi import FastAPI, HTTPException
import redis

from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from infrastructure.user_repo import UserRepository
from infrastructure.verification_service import VerificationService
from application.user_service import UserService
from domain.user import Base
import infrastructure


app = FastAPI()

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



@app.post("/register/")
def register(mobile_number: str, email: str, username: str, password: str):
    db = SessionLocal()
    user_repo = UserRepository(db)
    verification_service = VerificationService(redis.Redis())
    user_service = UserService(user_repo, verification_service)
    registration_info = user_service.register_user(mobile_number, email, username, password)
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
    
@app.post("/login2/")
def login(mobile_number: str, password: str):
    db = SessionLocal()  # Create a session
    user_repo = UserRepository(db)  # Create an instance of UserRepository
    user = user_repo.get_by_mobile_number(mobile_number)  # Call the method on the instance
    if user and user.password == password:
        return {"message": "Login successful", "user": user.mobile_number}
    else:
        raise HTTPException(status_code=401, detail="Login failed")