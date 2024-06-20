# Use an appropriate base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the global requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the IAM service
COPY IAM ./IAM
# Install IAM-specific requirements
RUN pip install -r IAM/requirements.txt

# Copy the Core service
COPY Core ./Core
# Install Core-specific requirements
RUN pip install -r Core/requirements.txt

# Copy the MEDIA service
COPY MEDIA ./MEDIA
# Install MEDIA-specific requirements
RUN pip install -r MEDIA/requirements.txt

# Copy Kafka configuration files
COPY kafka/server.properties /opt/kafka/config/server.properties
COPY kafka/kafka-init.sh /kafka/kafka-init.sh

# Ensure the init script has executable permissions
RUN chmod +x /kafka/kafka-init.sh

# Copy the gRPC service
COPY gRPC ./gRPC
# Install gRPC-specific requirements
RUN pip install -r gRPC/requirements.txt

# Optionally, copy other necessary parts of your project
COPY gateway ./gateway

# Expose the necessary ports
EXPOSE 8000 8002 80001 50051

CMD ["python", "IAM/presentation/main.py", , "Core/presentation/main.py", "MEDIA/main.py"]

