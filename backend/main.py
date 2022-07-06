import json
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket
import movement_control
from pydantic import BaseModel
from multiprocessing import Value
import roslibpy
from ros_utils import insert_value, setup_ros, teardown_ros

TEST_WITHOUT_ROS = False

app = FastAPI()

# Fake JSON dataset to simulate real-time data changes
with open('fakedataset.json', 'r') as file:
    data_change = iter(json.loads(file.read()))

# To add new clients
# Initialise them here
# Add it into setup_ros()
# Put them into the respective route functions


# Initialise the topics
ros_client = setup_ros(app)

# Start subscribers
# Variables are parked under app to allow it to be shared,
# as this is a multithreaded application.
app.sensors_co2_client.subscribe(lambda msg: insert_value(co2_val, msg))
app.sensors_ir_client.subscribe(lambda msg: insert_value(ir_val, msg))
app.sensors_mic_client.subscribe(lambda msg: insert_value(mic_val, msg))
# TODO: this makes more sense to be a service instead
app.algo_pred_client.subscribe(lambda msg: insert_value(algo_pred_val, msg))

# Shared variables to keep the last received datapoint treadsafe
co2_val = Value("d", 0.0)
ir_val = Value("d", 0.0)
mic_val = Value("d", 0.0)
algo_pred_val = Value("d", 0.0)


# FastAPI settings
class Control(BaseModel):
    control: str


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
    if TEST_WITHOUT_ROS:
        return {0.8}

    return co2_val.value


@app.get("/sensors/IR")
async def read_IR():
    # in (insert units here)
    if TEST_WITHOUT_ROS:
        return {5}

    return ir_val.value


@app.get("sensors/Mic")
async def read_Mic():
    # in dB
    if TEST_WITHOUT_ROS:
        return {90}

    return mic_val.value


@app.get("/algo")
async def read_algo():
    # probability?
    if TEST_WITHOUT_ROS:
        return {0.9}

    return algo_pred_val.value


@app.post("/movement_control")
async def send_control(control: Control):
    data = movement_control.get(control.control)

    msg = {"pan": 0, "move": 0, "home_srm": False}
    msg[data[0]] = data[1]

    # Replace the below with the data that is transmitted in
    if ros_client.is_connected:
        app.movement_client.publish(roslibpy.Message(msg))
        print('Sending message...', msg)

    return msg

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        await asyncio.sleep(0.1)
        payload = next(data_change)
        # change to insert value? 
        await websocket.send_json(payload)
