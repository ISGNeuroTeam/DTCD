# DTCD

It's an application for creating configurable web interfaces over [OT.Platform](https://ot-platform.ru/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) LTS version 14.x.x
- [nginx](https://nginx.org) v1.21.4
- [complex_rest](https://github.com/ISGNeuroTeam/complex_rest) v0.1.0
- [dtcd_mock_server](https://github.com/ISGNeuroTeam/dtcd_mockserver_plugin) v0.1.0
- [jobmanager_transit](https://github.com/ISGNeuroTeam/jobsmanager_transit) v0.1.0
- [DTCD-LogSystem](https://github.com/ISGNeuroTeam/DTCD-LogSystem) v0.4.0
- [DTCD-EventSystem](https://github.com/ISGNeuroTeam/DTCD-EventSystem) v0.3.0
- [DTCD-InteractionSystem](https://github.com/ISGNeuroTeam/DTCD-InteractionSystem) v0.3.0
- [DTCD-StorageSystem](https://github.com/ISGNeuroTeam/DTCD-StorageSystem) v0.4.0
- [DTCD-StyleSystem](https://github.com/ISGNeuroTeam/DTCD-StyleSystem) v0.3.0
- [DTCD-DatasourceSystem](https://github.com/ISGNeuroTeam/DTCD-DatasourceSystem) v0.1.0
- [DTCD-WorkspaceSystem](https://github.com/ISGNeuroTeam/DTCD-WorkspaceSystem) v0.3.0
- [DTCD-WorkspacePanel](https://github.com/ISGNeuroTeam/DTCD-WorkspacePanel) v0.1.0
- [DTCD-MenuPanel-FGK](https://github.com/ISGNeuroTeam/DTCD-MenuPanel-FGK) v0.1.0

### Installing

In order to install DTCD firstly you need to deploy _complex_rest_ with it's plugins: _dtcd_mock_server_ and _jobmanager_transit_. How to deploy _complex_rest_ you can see in it's [repository](https://github.com/ISGNeuroTeam/complex_rest).

1. Build DTCD application:

   ```
   make build
   ```

2. Move public directory of build to complex_rest plugin dtcd_mockserver_plugin.
3. Build all DTCD plugins listed in prerequisites above and move them to _dtcd_mockserver_plugin_ plugins directory of complex_rest. This is the required minimum of plugins you need to work with DTCD.
4. Serve application with nginx web server. You can see the [template](/docs/nginx_config.conf.template) of config.

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

Use `make pack` to get a deployable tarball. Move it to public directory of complex_rest dtcd_mockserver_plugin.

## Built With

- [rollup.js](https://maven.apache.org/) - for client-side app bundle

## Contributing

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ISGNeuroTeam/DataCAD/tags).

## Authors

- Andrey Starchenkov (astarchenkov@isgneuro.com)
- Konstantin Rozov (konstantin@isgneuro.com)
- Roman Kuramshin (rkuramshin@isgneuro.com)
- Sergei Belikov (sbelikov@isgneuro.com)

See also the list of [contributors](https://github.com/ISGNeuroTeam/DataCAD/contributors) who participated in this project.

## License

This project is licensed under the [LICENSE.md](LICENSE.md)

## Acknowledgments
