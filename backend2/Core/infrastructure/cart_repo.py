import redis
from typing import List
from domain.cart_item import CartItem
import json

class CartRepository:
    def __init__(self, redis_client: redis.StrictRedis):
        self.redis_client = redis_client

    def add_to_cart(self, user_id: str, cart_item: CartItem):
        cart_key = f"cart:{user_id}"
        cart_items = self.get_cart(user_id)
        for item in cart_items:
            if item.book_id == cart_item.book_id:
                item.quantity += cart_item.quantity
                break
        else:
            cart_items.append(cart_item)
        self.redis_client.set(cart_key, json.dumps([item.dict() for item in cart_items]))

    def get_cart(self, user_id: str) -> List[CartItem]:
        cart_key = f"cart:{user_id}"
        cart_data = self.redis_client.get(cart_key)
        if cart_data:
            return [CartItem(**item) for item in json.loads(cart_data)]
        return []

    def remove_from_cart(self, user_id: str, book_id: str):
        cart_key = f"cart:{user_id}"
        cart_items = self.get_cart(user_id)
        cart_items = [item for item in cart_items if item.book_id != book_id]
        self.redis_client.set(cart_key, json.dumps([item.dict() for item in cart_items]))

    def clear_cart(self, user_id: str):
        cart_key = f"cart:{user_id}"
        self.redis_client.delete(cart_key)

    def update_cart_item_quantity(self, user_id: str, book_id: str, quantity_change: int):
        cart_key = f"cart:{user_id}"
        cart_items = self.get_cart(user_id)
        for item in cart_items:
            if item.book_id == book_id:
                item.quantity += quantity_change
                if item.quantity <= 0:
                    cart_items = [i for i in cart_items if i.book_id != book_id]
                break
        self.redis_client.set(cart_key, json.dumps([item.dict() for item in cart_items]))

    def add_to_favorites(self, user_id: str, book_id: str):
        fav_key = f"favorites:{user_id}"
        favorites = self.redis_client.smembers(fav_key)
        if book_id in favorites:
            return
        self.redis_client.sadd(fav_key, book_id)

    def get_favorites(self, user_id: str):
        fav_key = f"favorites:{user_id}"
        return list(self.redis_client.smembers(fav_key))

    def remove_from_favorites(self, user_id: str, book_id: str):
        fav_key = f"favorites:{user_id}"
        self.redis_client.srem(fav_key, book_id)