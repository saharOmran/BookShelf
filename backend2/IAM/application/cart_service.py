from infrastructure.cart_repo import CartRepository
from domain.cart_item import CartItem
from typing import List

class CartService:
    def __init__(self, cart_repo: CartRepository):
        self.cart_repo = cart_repo

    def add_to_cart(self, user_id: str, cart_item: CartItem):
        self.cart_repo.add_to_cart(user_id, cart_item)

    def get_cart(self, user_id: str) -> List[CartItem]:
        return self.cart_repo.get_cart(user_id)

    def remove_from_cart(self, user_id: str, book_id: str):
        self.cart_repo.remove_from_cart(user_id, book_id)

    def clear_cart(self, user_id: str):
        self.cart_repo.clear_cart(user_id)

    def update_cart_item_quantity(self, user_id: str, book_id: str, quantity_change: int):
        self.cart_repo.update_cart_item_quantity(user_id, book_id, quantity_change)

    def add_to_favorites(self, user_id: str, book_id: str):
        self.cart_repo.add_to_favorites(user_id, book_id)

    def get_favorites(self, user_id: str):
        return self.cart_repo.get_favorites(user_id)

    def remove_from_favorites(self, user_id: str, book_id: str):
        self.cart_repo.remove_from_favorites(user_id, book_id)