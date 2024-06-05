import grpc
import server.media_pb2 as media_pb2
import server.media_pb2_grpc as media_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50052') as channel:
        stub = media_pb2_grpc.MediaServiceStub(channel)
        response = stub.GetMedia(media_pb2.GetMediaRequest(id=1))
        print("Media fetched:", response.media)
        
        new_media = media_pb2.Media(title="New Media", url="http://newmedia.com")
        create_response = stub.CreateMedia(media_pb2.CreateMediaRequest(media=new_media))
        print("Media created:", create_response.media)

if __name__ == '__main__':
    run()
