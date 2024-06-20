# Use the official Python image as base
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app/presentation

# Copy only the necessary files and directories into the container
COPY ./domain ../domain
COPY ./application ../application
COPY ./infrastructure ../infrastructure
COPY ./presentation ../presentation
COPY ./requirements.txt ../requirements.txt

# Install dependencies
RUN pip install -r ../requirements.txt

# Expose the port the app runs on
EXPOSE 8002

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002", "--proxy-headers"]
