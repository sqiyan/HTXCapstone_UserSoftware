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

@app.get("/sensors/CO2")
async def read_CO2():
    # in (insert units here)
    return {0.8}

@app.get("/sensors/IR")
async def read_IR():
    # in (insert units here)
    return {5}

@app.get("sensors/Mic")
async def read_Mic():
    # in dB
    return {90}

@app.get("/algo")
async def read_algo():
    # probability?
    return {0.9}

@app.get("/movement_control")
async def send_control():
    return {("forward",0)}