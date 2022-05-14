from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"Hello, this is HTX Capstone 2022"}

@app.get("/sensors")
async def read_sensor():
    return {"CO2":0.8, "IR":5, "Microphone": 90}

@app.get("/algo")
async def read_algo():
    # probability?
    return {0.9}