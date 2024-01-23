import datetime
from schemas import CategoryBase
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from fastapi import status
from db.models import Category


def add_category(request: CategoryBase, db :Session):
    new_category = Category(
        name = request.name
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


