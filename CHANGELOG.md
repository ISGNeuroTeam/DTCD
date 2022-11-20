# **CHANGELOG**

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.15.0]

### Changed

- WorkspacePanel plugin version in pages
- WorkspaceSystem plugin version in pages
- ConfigEditorPanel plugin version in pages
- some plugin versions in prerequisites

## [0.14.0]

### Changed

- WorkspaceSystem plugin version in pages
- some plugin versions in prerequisites

## [0.13.0]

### Changed

- HeaderPanel plugin version in pages
- WorkspacePanel plugin version in pages
- WorkspaceSystem plugin version in pages
- ConfigEditorPanel plugin version in pages
- some plugin versions in prerequisites

## [0.12.0]

### Changed

- HeaderPanel plugin version in pages
- WorkspaceSystem plugin version in pages
- some plugin versions in prerequisites

## [0.11.0]

### Added

- aliases for systems without version to simplify interaction with them
- method `beforeUninstall` which is called before removing plugins

### Changed

- guid format for panels and systems

### Fixed

- error with plugin version comparison

## [0.10.0]

### Changed

- WorkspacePanel plugin version in pages
- WorkspaceSystem plugin version in pages
- some plugin versions in prerequisites

## [0.9.1]

### Fixed

- WorkspacePanel plugin version in pages

## [0.9.0]

### Changed

- doc files for deploy

## [0.8.0]

### Changed

- version of WorkspaceSystem in prerequisites

## [0.7.1]

### Changed

- updated cache section in nginx config example

## [0.7.0]

### Added

- Desing_objects with css varibles for DTCD

### Changed

- API prefix
- nginx boilerplate
- pages configs

## [0.6.1]

### Fixed

- version of HeaderPanel in pages files

## [0.6.0]

### Added

- method to reset core system states
- app version getter

## [0.5.1]

### Fixed

- error in message while loading

## [0.5.0]

### Added

- html layout for loader
- styles css for loader
- getSystem method now returns system with higher version if no requested is registrered

## [0.4.0]

### Added

- support of plugin versions

## [0.3.0]

### Added

server:

- .gitkeep to "workspaces" directory
- inited workspaces endpoints
- .gitkeep to "graphs" directory
- CRUD endpoints for LiveDash
- endpoints for LogSystem

client:

- removed dublicate of instance assignment to window.Application
- installExtension public method
- getGUID public method
- added list of parameters in getDependence method of Application(now is: name, type, version)
- rollup plugin-babel
- autocomplete object for DevPanel_Console

### Changed

server:

- get list of plugins by "os.listdir"

client:

-the way LogSystem installs

### Fixed

server:

- PUT endpoint saves changes in workspace configuration correctly
- added copies flag to venv

## [0.2.1] - 2021-02-16

### Fixed

- [README.md](README.md), fixed name of project

## [0.2.0] - 2021-02-16

### Changed

- Build process

### Added

- [Jenkinsfile](Jenkinsfile)

### Fixed

- [LICENSE.md](LICENSE.md) file text content

## [0.1.3] - 2021-02-04

### Fixed

- temporarily Application as class
- guid conunting into Application class
- initial tests
- added uninstallPluginByInstance, uninstallPluginByGUID methods
- fillDependencies and fillPlugins as separate functions
- deleted GIS_data.json

## [0.1.2] - 2021-02-02

### Added

client:

- getExtension, getSystem, getDependence public methods
- instance of the whole system in Application variable of window
- Application class as function

server:

- static serve of dependencies
- GIS_data.json, Design_objects.json
- manifest.json in dependencies

## [0.1.1] - 2020-11-27

### Removed

- axios
- serve plugin of client dev-server

### Moved

- directory plugins: from server/plugins to ./public/plugins
- Application: from libs to ./client/src

### Added

- static serve on ./public
- GIS data end-point

## [0.1.0] - 2020-10-20

### Added

- Inited Repo WebGUI
- Inited server directory
- Added gridstack to project

- Inited core systems 2 of 3:

  - Storage systems
  - Plugins system

- Configured Repo
