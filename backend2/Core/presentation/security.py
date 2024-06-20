
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
from constants import ALGORITHM, SECRET_KEY

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(fake_db, mobile_number: str, password: str):
    user = fake_db.get_by_mobile_number(mobile_number)
    if not user or not pwd_context.verify(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
