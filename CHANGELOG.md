# __CHANGELOG__

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3]
client:
- temporarily Application as class
- guid conunting into Application class
- initial tests
- added uninstallPluginByInstance, uninstallPluginByGUID methods
- fillDependencies and fillPlugins as separate functions

server:
- deleted GIS_data.json

## [0.1.2]
### Added
client:
- getExtension, getSystem, getDependence public methods
- instance of the whole system in Application variable of window
- Application class as function
server:
- static serve of dependencies
- GIS_data.json, Design_objects.json
- manifest.json in dependencies


## [0.1.1]
### Removed
- axios
- serve plugin of client dev-server

### Moved
- directory plugins: from server/plugins to ./public/plugins
- Application: from libs to ./client/src 

### Added
- static serve on ./public
- GIS data end-point

## [0.1.0]
### Added

- Inited Repo WebGUI
- Inited server directory
- Added gridstack to project

- Inited core systems 2 of 3:
    - Storage systems
    - Plugins system

- Configured Repo