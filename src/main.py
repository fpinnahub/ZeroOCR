import pytesseract
import io
import base64

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from PIL import Image
from pdf2image import convert_from_bytes
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puoi restringerlo al tuo dominio se preferisci
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "tiff", "tif", "gif", "bmp", "pdf"}

def allowed_file(filename: str) -> bool:
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="File type not supported")

    content = await file.read()

    try:
        image_base64 = None

        if file.filename.lower().endswith(".pdf"):
            # Convert PDF pages to images
            images = convert_from_bytes(content)
            text = ""
            for i, img in enumerate(images):
                text += pytesseract.image_to_string(img)

            # Convert the first page to base64 for preview
            buffered = io.BytesIO()
            images[0].save(buffered, format="PNG")
            image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        else:
            # Open image from bytes
            image = Image.open(io.BytesIO(content))
            text = pytesseract.image_to_string(image)

        return {
            "filename": file.filename,
            "text": text,
            "preview_image": image_base64  # None for normal images
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")
