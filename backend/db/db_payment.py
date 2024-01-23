from db.models import User, Payment, Cart
from schemas import paymentBase
from sqlalchemy.orm import Session
from db.db_cart import get_user_cart
import datetime


def pay_for_cart(request: paymentBase, db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user.user_cart_id == 0:
        return "No cart available for payment"

    cart = db.query(Cart).filter(Cart.id == user.user_cart_id).first()
    payment = db.query(Payment).filter(Payment.id == cart.payment_id).first()

    payment.payment_check = True
    db.commit()

    display_of_cart = get_user_cart(user.id, db)

    user.user_cart_id = 0
    db.commit()

    return display_of_cart
