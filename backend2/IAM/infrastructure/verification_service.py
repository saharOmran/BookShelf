import random
import string
import redis

class VerificationService:
    def __init__(self, redis_client):
        self.redis_client = redis_client

    def send_verification_code(self, mobile_number):
        # Generate verification code and store in Redis
        verification_code = ''.join(random.choices(string.digits, k=6))
        self.redis_client.setex(mobile_number, 60, verification_code)  # Expires in 60 seconds
        return verification_code

    def verify_code(self, mobile_number, verification_code):
        stored_code = self.redis_client.get(mobile_number)
        return stored_code and stored_code.decode() == verification_code
