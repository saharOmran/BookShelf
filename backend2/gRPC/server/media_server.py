import os
import grpc
from concurrent import futures
import media_pb2
import media_pb2_grpc
from fastapi import FastAPI, HTTPException, File, UploadFile
from pymongo import MongoClient
from gridfs import GridFS
from bson import ObjectId
app = FastAPI()

MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
client = MongoClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/")
db = client["media_db"]
fs = GridFS(db)

# Define the gRPC service class
class MediaServiceServicer(media_pb2_grpc.MediaServiceServicer):
    def GetMedia(self, request, context):
        # Retrieve media from MongoDB based on the request ID
        if fs.exists(ObjectId(request.id)):
            file_info = fs.get(ObjectId(request.id))
            content = file_info.read()
            # Return the media content
            return media_pb2.GetMediaResponse(media=content)
        else:
            # Return NotFound status if media not found
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("Media not found")
            return media_pb2.GetMediaResponse()

    def UploadMedia(self, request, context):
        # Upload media to MongoDB
        content = request.content
        file_id = fs.put(content, filename=request.filename)
        return media_pb2.UploadMediaResponse(id=str(file_id))

def serve():
    # Create a gRPC server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    # Add the generated service implementation to the server
    media_pb2_grpc.add_MediaServiceServicer_to_server(MediaServiceServicer(), server)

    # Start the server on port 50052
    server.add_insecure_port('[::]:50052')
    server.start()

    # Keep the server running indefinitely
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
