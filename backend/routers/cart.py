from fastapi import APIRouter, Depends
from schemas import CartItemsDisplay, UserAuth, CartDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_cart
from authentication import auth
from typing import List

router = APIRouter(prefix='/cart', tags=['cart'])


@router.get('/add_to_cart/{book_id}/{number}')
def add_to_cart(book_id: int, number: int, db: Session = Depends(get_db),
                user: UserAuth = Depends(auth.get_current_user)):
    return db_cart.add_to_cart(user_id=user.id, book_id=book_id, number=number, db=db)


@router.put('/increase_nuber_of_item/{book_id}')
def increase_nuber_of_item(book_id: int, db: Session = Depends(get_db),
                           user: UserAuth = Depends(auth.get_current_user)):
    return db_cart.increase_item(book_id=book_id, user_id=user.id, db=db)


@router.put('/decrease_nuber_of_item/{book_id}')
def decrease_nuber_of_item(book_id: int, db: Session = Depends(get_db),
                           user: UserAuth = Depends(auth.get_current_user)):
    return db_cart.decrease_item(book_id=book_id, user_id=user.id, db=db)


@router.get('/get_current_cart')
def get_current_cart(user: UserAuth = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    return db_cart.get_user_cart(user_id=user.id, db=db)


