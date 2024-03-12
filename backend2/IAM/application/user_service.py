from domain.user import User
import logging
class UserService:
    def __init__(self, user_repo, verification_service):
        self.user_repo = user_repo
        self.verification_service = verification_service

    def register_user(self, mobile_number, email, username, password):
        user = User(mobile_number=mobile_number, email=email, username=username, password=password)
        self.user_repo.save(user)
        verification_code = self.verification_service.send_verification_code(mobile_number)
        logging.info(f"Verification code: {verification_code}")
        return {
            "phone number": mobile_number,  
            "verification_code": verification_code
        }
    

    def login(self, mobile_number, verification_code):
        if self.verification_service.verify_code(mobile_number, verification_code):
            return self.user_repo.get_by_mobile_number(mobile_number)
        return None