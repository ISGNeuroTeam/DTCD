# DTCD

It's web-interface for editing of System Object Model (SOM), OMDS.

## Getting Started

### Prerequisites
```
- Node.js v.14.x.x
```
With mock_server:
```
- Python v3.8
- Virtualenv, tool to create isolated Python environments

```

### Installing

For production mode!

You need to place built core plugins of application and MenuPanel into following folder `./server/plugins`

---
For development mode!

To start working with the application only on local machine in development mode, 
you need to install all dependencies from ./client/package.json and from ./server/requirements.txt 
and start client-side application with mock-server application. 
To do this, enter the next commands in the terminal.

* Installing dependencies for client-side application and start them.
> 1. `cd ./DTCD`
> 2. `npm i`
> 3. `npm run dev`

* Installing dependencies for mock-server application and start them.
> 1. Open new terminal and go to root of repo.
> 2. `cd ./server`
> 3. `source ./venv/bin/activate`
> 4. `pip install -r requirements.txt`
> 5. `python3 main.py`

Also you can use makefile for this 
`make dev
`

> At the end you will see starting of client-side app in terminal

## Running the tests
`npm run test` from client directory or `make test`

## Create build package

```
make pack
```

## Clear dependencies

```
make clear
```

## Deployment

Create build package, unpack and move it to public directory by the following command:
```
tar -zxf DTCD-*.tar.gz
```
After, you need serve public directory and remove archive by following command
```
rm DTCD-*.tar.gz
```

## Core system plugins installation priorities

After downloading the plugins to the application, the core plugins are installed first.
The order of installation of core plugins occurs depending on the priorities set in the "priority" property of "getRegistrationMeta" in each core plugin, according to the principle: "the higher the priority - the earlier the plugin is installed".
If the priority in different core plugins is equal, then the first in the list of all plugins will be set first

|Core plugins|Priority|
|------------|--------|
|LogSystem | 7 |
|EventSystem  | 6 |
|InteractionSystem  | 4 |
|DataSourceSystem | 3.5 |
|StorageSystem  | 3 |
|StyleSystem | 3 |
|WorkspaceSystem | 2 |


## Built With

* [Node.js](https://maven.apache.org/) - for client-side app build
* [rollup.js](https://maven.apache.org/) - for client-side app bundle
* [Python3](http://www.dropwizard.io/1.0.2/docs/) - for starting Mock_server
* [GridStack.js](https://rometools.github.io/rome/) - for workspace on client-side app
* [PubSub.js](https://rometools.github.io/rome/) - EventSystem of DataCAD
* [FastAPI](https://rometools.github.io/rome/) - Mock_server http server library

## Contributing

Contact with development [Team](https://github.com/ISGNeuroTeam) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ISGNeuroTeam/DataCAD/tags). 

## Authors

**[Team](https://github.com/ISGNeuroTeam)**

See also the list of [contributors](https://github.com/ISGNeuroTeam/DataCAD/contributors) who participated in this project.

## License

This project is licensed under the [LICENSE.md](LICENSE.md) 

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
