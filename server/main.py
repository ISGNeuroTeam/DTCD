import os
import json

from fastapi import FastAPI, Body

from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import HTMLResponse

import uvicorn 

app = FastAPI()

origins = [
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["DELETE","GET","POST","PUT"],
    allow_headers=["*"]
)
@app.get("/", response_class=HTMLResponse)
async def read_html():
    with open("./../public/index.html",'r') as file:
        return file.read()

@app.get("/get-plugin-list")
def read_plugins_list():
    list_dir = os.listdir("./plugins")
    list_dir.remove(".gitkeep")
    if ".DS_Store" in list_dir:
        list_dir.remove(".DS_Store")
    return list_dir

@app.get("/get-dependence-list")
def read_dependencies_manifest():
    with open("./dependencies/manifest.json","r") as file:
        data = json.load(file)
        return data

@app.get("/get-gis-data")
def give_bounds():
    with open("./GIS_data.json","r") as file:
        data = json.load(file)
        return data

@app.get("/get-design-objects")
def design_obejct():
    with open("./Design_objects.json","r") as file:
        data = json.load(file)
        return data

@app.get("/logs/configuration")
def log_config():
    with open("./log_configuration.json","r") as file:
        data = json.load(file)
        return data

@app.post("/logs/save")
def logs_save(logs: list = Body(...)):
    print(logs)
    return 'saved!'

if not os.path.isdir("./plugins"):
    os.mkdir("./plugins")

if not os.path.isdir("./../public"):
    os.mkdir("./../public")

app.mount("/plugins", StaticFiles(directory="./plugins"))
app.mount("/dependencies", StaticFiles(directory="./dependencies"))
app.mount("/", StaticFiles(directory="./../public"))

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=5000)