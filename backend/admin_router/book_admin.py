from fastapi import APIRouter, Depends, status, UploadFile, File
from fastapi.exceptions import HTTPException
from schemas import BookDisplay, BookBase, UserAuth
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_book
from typing import List
from string import ascii_letters
from authentication import auth
import random
import shutil


router = APIRouter(
    tags=['Admin Book'],
    prefix='/admin/book',
)


@router.post('/add_book', response_model=BookDisplay)
def add_book(request: BookBase, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.add_book(request, db, admin.id)


@router.get('/get_book/{id}', response_model=BookDisplay)
def get_book_by_admin(id: int, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.get_book_by_admin(id, db, admin.id)


@router.get('/get_all_books', response_model=List[BookDisplay])
def get_all_books_by_admin(db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.get_all_books_by_admin(db, admin.id)


@router.get('/get_books_by_title/{title}', response_model=List[BookDisplay])
def get_book_by_title_admin(title: str, db: Session = Depends(get_db),
                            admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.get_book_by_title_admin(title, db, admin.id)


@router.get('/get_books_by_author/{author}', response_model=List[BookDisplay])
def get_book_by_author_admin(author: str, db: Session = Depends(get_db),
                              admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.get_book_by_author_admin(author, db, admin.id)


@router.get('/get_books_by_category/{category}', response_model=List[BookDisplay])
def get_book_by_category_admin(category: str, db: Session = Depends(get_db),
                              admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.get_book_by_category_admin(category, db, admin.id)



@router.put('/edite_book/{id}', response_model=BookDisplay)
def edite_book(id: int, request: BookBase, db: Session = Depends(get_db),
                admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.edite_book(id, request, db, admin.id)


@router.delete('/delete_book/{id}')
def delete_book(id: int, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_book.delete_book(id, db, admin.id)
