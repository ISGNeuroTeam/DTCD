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

from aiofiles.os import stat as aio_stat
class StaticFilesSym(StaticFiles):
  "subclass StaticFiles middleware to allow symlinks"
  async def lookup_path(self, path):
    for directory in self.all_directories:
      full_path = os.path.realpath(os.path.join(directory, path))
      try:
        stat_result = await aio_stat(full_path)
        return (full_path, stat_result)
      except FileNotFoundError:
        pass
    return ("", None)

app.mount("/plugins", StaticFilesSym(directory="./plugins"))
app.mount("/tmp", StaticFiles(directory="./tmp"))
app.mount("/", StaticFiles(directory="./../public"))


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=5000)