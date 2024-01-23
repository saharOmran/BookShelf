import datetime
from schemas import AuthorBase
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from fastapi import status
from db.models import Author


def add_author(request: AuthorBase, db :Session):
    new_author = Author(
        name = request.name
    )
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    return new_author


