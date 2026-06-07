from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from services.cost_analyzer import analyze_costs
import shutil

app = FastAPI(
    title="AI Cloud Cost Detective",
    description="AWS cloud cost analysis and optimization assistant",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR.parent / "data" / "sample-billing-data.csv"


@app.get("/")
def home():
    return {"message": "AI Cloud Cost Detective Backend is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/analyze")
def analyze():
    result = analyze_costs(DATA_FILE)
    return result


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    upload_dir = BASE_DIR / "uploads"
    upload_dir.mkdir(exist_ok=True)

    file_path = upload_dir / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_costs(file_path)
    return result