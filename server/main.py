import os
import json

from fastapi import FastAPI, Body, Response, Request, Cookie
from typing import Optional

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


# Workspaces
def get_workspace_list():
    list_dir_workspaces = os.listdir("./workspaces")
    if ".gitkeep" in list_dir_workspaces:
        list_dir_workspaces.remove(".gitkeep")
    if ".DS_Store" in list_dir_workspaces:
        list_dir_workspaces.remove(".DS_Store")

    workspaces=[]
    for file_name in list_dir_workspaces:
        with open(f'./workspaces/{file_name}', "r") as file:
            configuration = json.loads(file.read())
            workspaces.append(configuration)
    return workspaces

def get_pages():
    list_dir_pages = os.listdir("../docs/pages")

    if ".DS_Store" in list_dir_pages:
        list_dir_pages.remove(".DS_Store")

    pages= {}
    for file_name in list_dir_pages:
        with open(f'./../docs/pages/{file_name}', "r") as file:
            configuration = json.loads(file.read())
            pages[file_name.split('.')[0]]=  configuration
    return pages

# Application
@app.get("/", response_class=HTMLResponse)
async def read_html():
    with open("./../public/index.html",'r') as file:
        return file.read()

@app.get("/mock_server/v1/plugins/plugins.json")
def read_plugins_list():
    list_dir = os.listdir("./plugins")
    list_dir.remove(".gitkeep")
    if ".DS_Store" in list_dir:
        list_dir.remove(".DS_Store")
    def item_to_path(item):
        if(os.path.isdir("./plugins/%s"%item)):
            js_files = [file_name for file_name in os.listdir("./plugins/%s" % item) if file_name.endswith(".js") ]
            return "./{0}/{1}".format(item, js_files[0])
    return [item_to_path(item) for item in list_dir]

@app.get("/get-dependence-list")
def read_dependencies_manifest():
    with open("./dependencies/manifest.json","r") as file:
        data = json.load(file)
        return data

#logs
@app.get("/v2/logs/configuration")
def log_config():
    with open("./log_configuration.json","r") as file:
        data = json.load(file)
        return data

@app.post("/v2/logs/save")
def logs_save(logs: list = Body(...)):
    with open("./calc_log.txt",'w') as file:
        file.write(str(logs))
    return 'saved!'

#StyleSystem
@app.get("/mock_server/v1/get-design-objects")
def design_obejct():
    with open("./Design_objects.json","r") as file:
        data = json.load(file)
        return data

@app.get("/dtcd_utils/v1/page/{pagename}")
def pages(pagename):
    pages = get_pages()
    if pagename in pages:
        return pages[pagename]
    return 'error'

@app.get("/mock_server/v1/workspace/object")
def workspace_configuration(id: int = 0):
    workspaces = get_workspace_list()
    if not id:
        mapped_confs = list(map(lambda conf: {'id':conf['id'], 'title':conf['title']}, workspaces))
        return mapped_confs
    conf = next(conf for conf in workspaces if conf["id"] == id)
    return conf

@app.post("/mock_server/v1/workspace/object")
def create_workspace(workspaces: list = Body(...)):
    for configuration in workspaces:
        workspaceList = get_workspace_list()
        id = 0
        if len(workspaceList) != 0:
            id = max(list(map(lambda conf: conf['id'], workspaceList))) + 1
        else:
            id = 1
        configuration["id"] = id
        with open(os.path.join("./workspaces", f"{id}.json"), "w") as file:
            file.write(json.dumps(configuration))
    return workspaces

@app.put("/mock_server/v1/workspace/object")
def update_workspace(obj: dict = Body(...)):
    file_list = os.listdir("./workspaces")
    file_name = f"{obj['id']}.json"
    if file_list.index(file_name) != -1:
        if not 'content' in obj:
            configuration = ''
            with open(f'./workspaces/{file_name}', "r") as file:
                configuration = json.loads(file.read())
            os.remove(os.path.join("./workspaces",file_name))
            configuration['title'] = obj['title']
            with open(os.path.join("./workspaces", f"{obj['id']}.json"), "w") as file:
                file.write(json.dumps(configuration))
        else:
            os.remove(os.path.join("./workspaces",file_name))
            with open(os.path.join("./workspaces", f"{obj['id']}.json"), "w") as file:
                file.write(json.dumps(obj))
    return obj

@app.delete("/mock_server/v1/workspace/object")
def delete_workspace(idxes: list = Body(...)):
    file_list = os.listdir("./workspaces")
    for idx in idxes:
        file_name = f"{idx}.json"
        if file_list.index(file_name) != -1:
            os.remove(os.path.join("./workspaces",file_name))
        else:
            return 'error'
    return 'success'

if not os.path.isdir("./plugins"):
    os.mkdir("./plugins")

if not os.path.isdir("./../public"):
    os.mkdir("./../public")

if not os.path.isdir("./graphs"):
    os.mkdir("./graphs")

app.mount("/plugins", StaticFiles(directory="./plugins"))
app.mount("/", StaticFiles(directory="./../public"))

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=5000)