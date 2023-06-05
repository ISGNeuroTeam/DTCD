# DTCD

It's an application for creating configurable web interfaces over [OT.Platform](https://ot-platform.ru/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) LTS version 14.x.x
- [nginx](https://nginx.org) v1.21.4
- [complex_rest](https://github.com/ISGNeuroTeam/complex_rest) v1.1.5
- [complex_rest_dtcd_utils](https://github.com/ISGNeuroTeam/complex_rest_dtcd_utils) v1.2.1
- [complex_rest_dtcd_jobsmanager](https://github.com/ISGNeuroTeam/complex_rest_dtcd_jobsmanager) v0.3.0
- [complex_rest_dtcd_supergraph](https://github.com/ISGNeuroTeam/complex_rest_dtcd_supergraph) v0.3.3
- [complex_rest_dtcd_workspaces](https://github.com/ISGNeuroTeam/complex_rest_dtcd_workspaces) v0.2.6
- [complex_rest_id_generator](https://github.com/ISGNeuroTeam/complex_rest_id_generator) v0.1.0
- [DTCD-LogSystem](https://github.com/ISGNeuroTeam/DTCD-LogSystem) v0.7.0
- [DTCD-AppGUISystem](https://github.com/ISGNeuroTeam/DTCD-AppGUISystem) v0.4.0
- [DTCD-AuthSystem](https://github.com/ISGNeuroTeam/DTCD-AuthSystem) v0.1.0
- [DTCD-RouteSystem](https://github.com/ISGNeuroTeam/DTCD-RouteSystem) v0.4.0
- [DTCD-EventSystem](https://github.com/ISGNeuroTeam/DTCD-EventSystem) v0.6.0
- [DTCD-InteractionSystem](https://github.com/ISGNeuroTeam/DTCD-InteractionSystem) v0.4.0
- [DTCD-StorageSystem](https://github.com/ISGNeuroTeam/DTCD-StorageSystem) v0.9.0
- [DTCD-StyleSystem](https://github.com/ISGNeuroTeam/DTCD-StyleSystem) v0.14.0
- [DTCD-DatasourceSystem](https://github.com/ISGNeuroTeam/DTCD-DatasourceSystem) v0.5.0
- [DTCD-WorkspaceSystem](https://github.com/ISGNeuroTeam/DTCD-WorkspaceSystem) v0.16.1
- [DTCD-WorkspacePanel](https://github.com/ISGNeuroTeam/DTCD-WorkspacePanel) v0.12.0
- [DTCD-AuthPanel](https://github.com/ISGNeuroTeam/DTCD-AuthPanel) v0.4.0
- [DTCD-HeaderPanel](https://github.com/ISGNeuroTeam/DTCD-HeaderPanel) v0.8.0
- [DTCD-FooterPanel](https://github.com/ISGNeuroTeam/DTCD-FooterPanel) v0.2.0
- [DTCD-ConfigEditorPanel](https://github.com/ISGNeuroTeam/DTCD-ConfigEditorPanel) v0.10.0
- [DTCD-ProfilePanel](https://github.com/ISGNeuroTeam/DTCD-ProfilePanel) v0.4.0

### Installing

In order to install DTCD firstly you need to deploy _complex_rest_ with it's plugins: _complex_rest_dtcd_utils_, _complex_rest_dtcd_jobsmanager_, _complex_rest_dtcd_supergraph_, _complex_rest_dtcd_workspaces_. How to deploy _complex_rest_ and plugins you can see in these repositories listed above in prerequisites section.

1. Build DTCD application:

   ```
   make build
   ```

2. Move public directory of build to _complex_rest_ plugin _dtcd_utils_.
3. Build all DTCD plugins listed in prerequisites above and move them to _dtcd_utils_ plugins directory of complex_rest. This is the required minimum of plugins you need to work with DTCD.
4. Put [pages](/docs/pages/) folder into _dtcd_utils_ plugin of _complex_rest_.
5. Put [Design_objects.json](/docs/Design_objects.json) file into _dtcd_utils_ plugin root directory.
6. Serve application with nginx web server. You can see the [template](/docs/nginx_config.conf.template) of config.

## Running the tests

```
make test
```

## Create build package

```
make pack
```

## Clear dependencies

```
make clear
```

## Deployment

Use `make pack` to get a deployable tarball.

## Built With

- [rollup.js](https://maven.apache.org/)

## Contributing

- Andrey Starchenkov (astarchenkov@isgneuro.com)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ISGNeuroTeam/DataCAD/tags).

## Authors

- Konstantin Rozov (konstantin@isgneuro.com)
- Roman Kuramshin (rkuramshin@isgneuro.com)
- Sergei Belikov (sbelikov@isgneuro.com)
- Julia Ginkul (jginkul@isgneuro.com)
- Alexander Bragin (abragin@isgneuro.com)

See also the list of [contributors](https://github.com/ISGNeuroTeam/DataCAD/contributors) who participated in this project.

## License

This project is licensed under the [LICENSE.md](LICENSE.md)

## Acknowledgments
