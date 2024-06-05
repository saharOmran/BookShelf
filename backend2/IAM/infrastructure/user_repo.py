from sqlalchemy.orm import Session
from domain.user import User
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from sqlalchemy import create_engine
from tenacity import retry, stop_after_attempt, wait_fixed
from pybreaker import CircuitBreaker
from IAM.domain.user import User

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Circuit breaker setup
breaker = CircuitBreaker(fail_max=5, reset_timeout=60)

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, user: User):
        self.db.add(user)
        self.db.commit()

    def get_by_mobile_number(self, mobile_number: str):
        return self.db.query(User).filter(User.mobile_number == mobile_number).first()


    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    @breaker
    def add_user(self, user: User):
        try:
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
        except OperationalError as e:
            self.db.rollback()
            raise e

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    @breaker
    def get_user_by_id(self, user_id: int):
        try:
            return self.db.query(User).filter(User.id == user_id).first()
        except OperationalError as e:
            raise e