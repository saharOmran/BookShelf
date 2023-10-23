# # Use an official Python runtime as the base image
# FROM python:3.10.10

# # Set the working directory in the container
# WORKDIR /app

# # Copy the requirements file and install dependencies
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the project
# COPY . .

# # Set any necessary environment variables

# # Expose the port that Django runs on
# EXPOSE 8000

# # Start the Django development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM python:3.10.10

ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend
COPY . /backend
ADD requirements.txt /backend
RUN pip install -r requirements.txt