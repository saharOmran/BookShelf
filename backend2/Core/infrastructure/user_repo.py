from sqlalchemy.orm import Session
from domain.user import User

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, user: User):
        self.db.add(user)
        self.db.commit()

    def get_by_mobile_number(self, mobile_number: str):
        return self.db.query(User).filter(User.mobile_number == mobile_number).first()

