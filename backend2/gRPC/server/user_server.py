import grpc
from concurrent import futures
import sys
import sys
print(sys.path)

sys.path.append('/usr/src/app/IAM')
import user_pb2
import user_pb2_grpc
from IAM.domain.user import User
from IAM.infrastructure.user_repo import UserRepo

# Define the gRPC service class
class UserServiceServicer(user_pb2_grpc.UserServiceServicer):
    def __init__(self):
        self.repo = UserRepo()

    def GetUser(self, request, context):
        # Retrieve user from the database based on the request ID
        user = self.repo.get_user_by_id(request.id)
        if user:
            return user_pb2.GetUserResponse(user=user_pb2.User(id=user.id, mobile_number=user.mobile_number, email=user.email, username=user.username))
        else:
            # Return NotFound status if user not found
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("User not found")
            return user_pb2.GetUserResponse()

    def CreateUser(self, request, context):
        # Create a new user in the database
        new_user = User(mobile_number=request.user.mobile_number, email=request.user.email, username=request.user.username, password=request.user.password)
        self.repo.add_user(new_user)
        return user_pb2.CreateUserResponse(user=user_pb2.User(id=new_user.id, mobile_number=new_user.mobile_number, email=new_user.email, username=new_user.username))

def serve():
    # Create a gRPC server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    # Add the generated service implementation to the server
    user_pb2_grpc.add_UserServiceServicer_to_server(UserServiceServicer(), server)

    # Start the server on port 50051
    server.add_insecure_port('[::]:50051')
    server.start()

    # Keep the server running indefinitely
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
