# OCR API with FastAPI and pytesseract

This project provides a simple RESTful API built with FastAPI, capable of receiving image files (JPG, PNG, TIFF, GIF, BMP) and PDFs, and extracting textual content from them using the Tesseract OCR engine (`pytesseract`).

It also includes a minimal HTML + JavaScript client that allows uploading files and viewing extracted text directly in the browser.

---

## 📦 Features

- Accepts image files and PDFs via HTTP POST
- Extracts text using Tesseract OCR
- Returns extracted text in JSON format
- Includes a simple HTML client with drag-and-drop interface

---

## ⚙️ Requirements

### System Requirements

- Python 3.8 or newer
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) installed and available in the system PATH

#### Tesseract Installation

**Ubuntu/Debian:**

sudo apt install tesseract-ocr

**macOS (with Homebrew):**

```bash
brew install tesseract
```

**Windows:**
Download the installer from GitHub and ensure the install path is added to your system’s PATH.


### 🧪 Installation
Clone the repository:


```git
git clone https://github.com/yourusername/ocr-fastapi.git
cd ocr-fastapi
```
Create and activate a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

If you don’t have a requirements.txt, you can use:

```bash
pip install fastapi uvicorn python-multipart pillow pytesseract pdf2image
```
### 🚀 Running the API
Start the FastAPI server with:

```bash
uvicorn main:app --reload
```

By default, the API will be available at:

```bash
http://127.0.0.1:8000
```

##### Endpoint
POST /extract-text/: Accepts a file upload and returns extracted text

### 🌐 Web Client
You can use the provided index.html file to interact with the API via a browser.

Open index.html in any modern web browser.

Select or drag-and-drop an image or PDF file.

Click "Extract Text" and wait for the OCR result.

### 🔒 CORS Notice
If accessing the API from a browser running index.html, you may need to enable CORS. In main.py, add:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```