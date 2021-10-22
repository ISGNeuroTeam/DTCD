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

# Workspaces
def get_workspace_list():
    list_dir_workspaces = os.listdir("./workspaces")
    list_dir_workspaces.remove(".gitkeep")
    if ".DS_Store" in list_dir_workspaces:
        list_dir_workspaces.remove(".DS_Store")

    workspaces=[]
    for file_name in list_dir_workspaces:
        with open(f'./workspaces/{file_name}', "r") as file:
            configuration = json.loads(file.read())
            workspaces.append(configuration)
    return workspaces

# Application
@app.get("/", response_class=HTMLResponse)
async def read_html():
    with open("./../public/index.html",'r') as file:
        return file.read()

@app.get("/plugins/plugins.json")
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
@app.get("/get-design-objects")
def design_obejct():
    with open("./Design_objects.json","r") as file:
        data = json.load(file)
        return data

# graph
@app.post("/v2/graphContent/save")
def save_graph(graphs: list = Body(...)):
    count = 0
    for graph in graphs:
        if not (graph["name"]) in os.listdir("./graphs"):
            with open(os.path.join("./graphs/",graph["name"]), "w") as file:
                file.write(graph["content"])
            count+=1
    if count==len(graphs):
        return {"status":"SUCCESS", "code":200, "count": str(len(graphs))}
    else:
        return {"status":"ERROR", "count": count}

@app.put("/v2/graphContent/update")
def update_graph(graphs: list = Body(...)):
    count = 0
    file_list = os.listdir("./graphs")
    file_list.remove(".gitkeep")
    for graph in graphs:
        if file_list[graph["id"]]:
            if "content" in graph:
                with open(os.path.join("./graphs/",graph["name"]), "w") as file:
                    file.write(graph["content"])
            if "name" in graph:
                source = "./graphs/%s" % file_list[graph["id"]]
                target = "./graphs/%s" % graph["name"]
                os.rename(source, target)
            count+=1
    if count==len(graphs):
        return {"status":"SUCCESS","count":count}
    else:
        return {"status":"ERROR", "count": count}

@app.delete("/v2/graphContent/delete")
def delete_graph(ids: list = Body(...)):
    print(ids)
    file_list = os.listdir("./graphs")
    file_list.remove(".gitkeep")
    count=0
    for id in ids:
        os.remove("./graphs/%s" % file_list[id])
        count+=1
    if count == len(ids):
        return {"status":"SUCCESS","count": count}
    else:
        return {"status":"ERROR", "count": count}

@app.get("/v2/graphContent/load")
def load_graph(id: int = 0):
    file_list = os.listdir("./graphs")
    file_list.remove(".gitkeep")
    with open("./graphs/%s" % file_list[id], 'r') as file:
        content = file.read()
    return {"id": id, "name": file_list[id], "content": content, "status": "SUCCESS"}

@app.get("/v2/graph/list")
def graph_list():
    file_list = os.listdir("./graphs")
    file_list.remove(".gitkeep")
    return [ {"name": file_name, "id": index} for index, file_name in enumerate(file_list)]

@app.get("/v2/workspace/object")
def workspace_configuration(id: int = 0):
    workspaces = get_workspace_list()
    if not id:
        mapped_confs = list(map(lambda conf: {'id':conf['id'], 'title':conf['title']}, workspaces))
        return mapped_confs
    conf = next(conf for conf in workspaces if conf["id"] == id)
    return {'id': conf['id'], 'title':conf['title'], 'content':json.dumps(conf)}

@app.post("/v2/workspace/object")
def create_workspace(workspaces: list = Body(...)):
    file_list = os.listdir("./workspaces")
    for workspace in workspaces:
        id = len(file_list)
        workspace["id"] = id
        with open(os.path.join("./workspaces", f"{id}.json"), "w") as file:
            file.write(json.dumps(workspace))
    return workspaces

@app.put("/v2/workspace/object")
def update_workspace(array: list = Body(...)):
    workspaces = get_workspace_list()
    idx = -1
    for conf in workspaces:
        if conf['id'] == array[0]['id']:
            idx = workspaces.index(conf)
    if idx != -1:
        workspaces[idx]['title'] = array[0]['title']
    return workspaces

@app.delete("/v2/workspace/object")
def delete_workspace(idxes: list = Body(...)):
    file_list = os.listdir("./workspaces")
    for idx in idxes:
        file_name = f"{idx}.json"
        if file_list.index(file_name) != -1:
            os.remove(os.path.join("./workspaces",file_name))
        else:
            return 'error'
    return 'success'

# GIS
@app.get("/get-gis-data")
def give_bounds():
    with open("./GIS_data.json","r") as file:
        data = json.load(file)
        return data

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