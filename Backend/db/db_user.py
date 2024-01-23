from db.models import User
from schemas import UserBase,UpdateUserBase
from sqlalchemy.orm import Session
from db.hash import Hash
from fastapi.exceptions import HTTPException
from fastapi import status



def create_user(request: UserBase, db: Session):
    name = request.username
    checked = duplicate_username(name, db)
    if checked:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='This username already exists')

    user = User(
        username=request.username,
        password=Hash.bcrypt(request.password),
        email=request.email,
        user_cart_id=0,
        is_admin=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def edite_user(request: UpdateUserBase, db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    name = request.username
    checked = duplicate_username(name, db)
    if checked == True and user.username != request.username:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='This username already exists')

    user.username = request.username
    user.password = Hash.bcrypt(request.password)
    user.email = request.email

    db.commit()

    return user

def get_user_by_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='User not found !')

    return user



def delete_user(id: int, db: Session,  user_id : int):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    db.delete(user)
    db.commit()
    return 'user deleted'



def duplicate_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if user:
        return True
    else:
        return False