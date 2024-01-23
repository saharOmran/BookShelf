from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_author
from typing import List
from authentication import auth
from fastapi.exceptions import HTTPException
from schemas import AuthorBase, AuthorDisplay
from authentication import auth
from schemas import BookDisplay, BookBase, UserAuth




router = APIRouter(prefix='/author', tags=['author'])


@router.post('/add_author', response_model=AuthorDisplay)
def add_author(request: AuthorBase, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_author.add_author(request, db)

