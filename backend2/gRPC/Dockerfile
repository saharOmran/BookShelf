# Use the appropriate base image for your project
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
# COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

RUN pip install grpcio
RUN pip install grpcio-tools

# Generate Python files from proto files
RUN python -m grpc_tools.protoc -I=protos --python_out=. --grpc_python_out=. protos/user.proto
RUN python -m grpc_tools.protoc -I=protos --python_out=. --grpc_python_out=. protos/media.proto

# Move the generated files to the server directory
RUN mv user_pb2.py user_pb2_grpc.py server/
RUN mv media_pb2.py media_pb2_grpc.py server/

# Expose the gRPC port
EXPOSE 50051

# Run the gRPC server
CMD ["python", "server/user_server.py"] 
