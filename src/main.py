import pytesseract
import io

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from PIL import Image
from pdf2image import convert_from_bytes


app = FastAPI()

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "tiff", "tif", "gif", "bmp", "pdf"}

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="File type not supported")

    content = await file.read()

    try:
        if file.filename.lower().endswith(".pdf"):
            # Convert PDF pages to images
            images = convert_from_bytes(content)
            text = ""
            for i, img in enumerate(images):
                text += pytesseract.image_to_string(img)
        else:
            # Open image from bytes
            image = Image.open(io.BytesIO(content))
            text = pytesseract.image_to_string(image)

        return JSONResponse(content={"filename": file.filename, "text": text})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")
