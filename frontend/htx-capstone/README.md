# HTX Capstone User Software
> Set up guide for running the user software of the project

## Setting up the environment
1. install npm, **make sure node version >= 14.0.0 and npm version => 5.6**

    ```
    sudo apt install npm
    ```
2. start up the frontend server

    ```
    cd frontend/htx-capstone
    npm install
    npm start
    ```
3. install fastapi

    ```
    pip install fastapi[all]
    ```
4. start up the backend server in a new terminal

    ```
    cd backend
    uvicorn main:app --reload
    ```
5. download and install [AntiMicroX](https://github.com/AntiMicroX/antimicrox/) to map our controller to keyboard input
