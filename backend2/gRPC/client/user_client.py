import grpc
import server.user_pb2 as user_pb2
import server.user_pb2_grpc as user_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_pb2_grpc.UserServiceStub(channel)
        response = stub.GetUser(user_pb2.GetUserRequest(id=1))
        print("User fetched:", response.user)
        
        new_user = user_pb2.User(name="Jane Doe", email="jane.doe@example.com")
        create_response = stub.CreateUser(user_pb2.CreateUserRequest(user=new_user))
        print("User created:", create_response.user)

if __name__ == '__main__':
    run()
