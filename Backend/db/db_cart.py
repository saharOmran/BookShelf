import datetime

from sqlalchemy import Column

from db.models import Cart, Book, CartItem, User, Payment
from schemas import CartDisplay, CartItemsDisplay
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from fastapi import status
from sqlalchemy.sql.expression import and_

from typing import List



def add_to_cart(book_id: int, user_id: int, number: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    book = db.query(Book).filter(Book.id == book_id).first()

    if user.user_cart_id == 0:
        cart = Cart(
            user_id=user.id,
            total_price=0,
            payment_id=0,
        )
        db.add(cart)
        db.commit()

        payment = Payment(
            id=cart.id,
            cart_id=cart.id,
            payment_check=False
        )

        db.add(payment)
        db.commit()

        cart.payment_id = payment.id
        db.commit()

        user.user_cart_id = cart.id
        db.commit()

    else:
        cart_id = user.user_cart_id
        cart = db.query(Cart).filter(Cart.id == cart_id).first()


    cart_item = db.query(CartItem).filter(and_(CartItem.cart_id == Cart.id, CartItem.book_id == book.id)).first()
    if not cart_item:
        cart_item = CartItem(
            cart_id=cart.id,
            book_id=book.id,
            quantity=number,
            item_price=book.price * number,
        )

        db.add(cart_item)
        db.commit()

    else:
        for i in range(0, number):
            increase_item(book_id, user_id, db)

    db.commit()

    cart.total_price = cart.total_price + cart_item.item_price
    db.commit()

    return 'Item added to cart'


def increase_item(book_id: int, user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    book = db.query(Book).filter(Book.id == book_id).first()
    cart = db.query(Cart).filter(Cart.id == user.user_cart_id).first()


    cart_item = db.query(CartItem).filter(and_(CartItem.cart_id == cart.id, CartItem.book_id == book.id)).first()

#    cart_item.item_price = cart_item.item_price
    cart.total_price = cart.total_price + book.price
    cart_item.quantity = cart_item.quantity + 1
    db.commit()

    return 'Book added to your cart'


def decrease_item(book_id: int, user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    book = db.query(Book).filter(Book.id == book_id).first()
    cart = db.query(Cart).filter(Cart.id == user.user_cart_id).first()
    cart_item = db.query(CartItem).filter(and_(CartItem.cart_id == cart.id, CartItem.book_id == book_id)).first()

    cart_item.item_price = cart_item.item_price - book.price
    cart.total_price = cart.total_price - book.price
    cart_item.quantity = cart_item.quantity - 1
    db.commit()

    return 'Book removed from your cart'



def get_user_cart(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    if user.user_cart_id == 0:
        return """Your current cart in empty"""

    else:
        cart = db.query(Cart).filter(Cart.id == user.user_cart_id).first()
        payment = db.query(Payment).filter(Payment.id == cart.payment_id).first()
        payment_check = payment.payment_check

        user_display = {
            'username': user.username,
            'email': user.email
        }

        items = db.query(CartItem).filter(CartItem.cart_id == cart.id).all()
        items2 = []
        for item in items:
            book = db.query(Book).filter(Book.id == item.book_id).first()
            item_display = {
                'name': book.title,
                'quantity': item.quantity,
                'item_price': item.item_price,
                'book_image' : item.book_image
            }
            items2.append(item_display)

        display = {
            'user': user_display,
            'total_price': cart.total_price,
            'items': items2,
        }

        return display


