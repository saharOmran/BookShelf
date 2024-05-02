from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Depends
import os
import json
from bson import ObjectId
from pymongo import MongoClient
from gridfs import GridFS
from fastapi.responses import Response, JSONResponse, StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import redis
from pathlib import Path
import sys
from urllib.parse import urljoin

app = FastAPI()

MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
client = MongoClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/")
db = client["media_db"]
fs = GridFS(db)

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

REDIS_HOST = os.getenv("REDIS_HOST", "172.18.0.2")
REDIS_PORT = 6379
redis_client = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

@app.get("/uploaded_files/{file_id}")
async def get_uploaded_file(file_id: str):
    if fs.exists(ObjectId(file_id)):
        file_info = fs.get(ObjectId(file_id))
        content = file_info.read()
        return Response(content, media_type='application/octet-stream', headers={"Content-Disposition": f"attachment; filename={file_info.filename}"})
    else:
        raise HTTPException(status_code=404, detail="File not found")
    
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    file_id = fs.put(content, filename=file.filename)
    # Extract metadata
    metadata = {
        "file_name": file.filename,
        "file_size": len(content),
        # Add more metadata as needed
    }
    # Save metadata along with the file ID
    db.metadata.insert_one({"file_id": str(file_id), "metadata": metadata})
    file_url = urljoin("http://localhost:8000/uploaded_files/", str(file_id))
    return JSONResponse(content={"file_id": str(file_id), "file_url": file_url, "metadata": metadata}, status_code=201)

@app.put("/edit/{file_id}")
async def edit_file(file_id: str, new_content: UploadFile = File(...)):
    content = await new_content.read()
    if fs.exists(ObjectId(file_id)):
        # Open existing file by file_id
        existing_file = fs.get(ObjectId(file_id))
        # Delete existing file
        fs.delete(ObjectId(file_id))
        # Create a new file with the same file_id and new content
        fs.put(content, _id=existing_file._id, filename=existing_file.filename)
        # Extract metadata from the new content
        metadata = {
            "file_name": existing_file.filename,
            "file_size": len(content),
            # Add more metadata as needed
        }
        # Update metadata in the database
        db.metadata.update_one({"file_id": str(file_id)}, {"$set": {"metadata": metadata}})
        # Return the edited file content and metadata
        edited_file = fs.get(ObjectId(file_id))
        edited_content = edited_file.read()
        
        # Encode metadata into headers
        headers = {
            "Content-Disposition": f"attachment; filename={edited_file.filename}",
            "metadata": json.dumps(metadata)  # Encode metadata as JSON string
        }
        
        return StreamingResponse(
            content=edited_content,
            media_type='application/octet-stream',
            headers=headers
        )
    else:
        raise HTTPException(status_code=404, detail="File not found")

# Endpoint for deleting files
@app.delete("/delete/{file_id}")
async def delete_file(file_id: str):
    if fs.exists(ObjectId(file_id)):
        fs.delete(ObjectId(file_id))
        return {"message": "File deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="File not found")
