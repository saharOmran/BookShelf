from fastapi import APIRouter, Depends, status
from schemas import BookDisplay, BookBase, UserAuth
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_book
from typing import List
from authentication import auth
from fastapi.exceptions import HTTPException


router = APIRouter(prefix='/book', tags=['book'])

image_url_types = ['url', 'uploaded']


@router.get('/get_book/{id}', response_model=BookDisplay)
def get_book(id: int, db: Session = Depends(get_db)):
    return db_book.get_book(id, db)


@router.get('/get_all_books', response_model=List[BookDisplay])
def get_all_books(db: Session = Depends(get_db)):
    return db_book.get_all_books(db)


@router.get('/get_books_by_title/{title}', response_model=List[BookDisplay])
def get_book_by_title(title: str, db: Session = Depends(get_db)):
    return db_book.get_book_by_title(title, db)


@router.get('/get_books_by_author/{author}', response_model=List[BookDisplay])
def get_books_by_author(author: str, db: Session = Depends(get_db)):
    return db_book.get_book_by_author(author, db)


@router.get('/get_books_by_category/{category}', response_model=List[BookDisplay])
def get_books_by_category(category: str, db: Session = Depends(get_db)):
    return db_book.get_book_by_category(category, db)
