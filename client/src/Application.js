export default function Application() {
	const _plugins = [];
	const _extensions = {};
	const _dependencies = {};
	const _systems = {};

	this.installPlugin = function (name, ...args) {
		const GUIDSystem = _systems.GUIDSystem;
		if (!GUIDSystem) throw new Error('GUIDSystem Not found!');
		else {
			const Plugin = _getPluginByName(name);
			const guid = GUIDSystem.createGUID();
			const instance = new Plugin(guid, ...args);
			GUIDSystem.setGUID(instance, guid);
			return instance;
		}
	};

	this.start = async function () {
		console.log('Start installing of Application...');
		await _getDependencies();
		console.log('Dependencies:');
		console.log(_dependencies);
		await _getPlugins();
		console.log('Plugins:');
		console.log(_plugins);

		const GUIDSystemPlugin = _getPluginByName('GUIDSystem');
		const GUIDSystem = new GUIDSystemPlugin();
		_systems.GUIDSystem = GUIDSystem;
		let guid = GUIDSystem.createGUID();
		GUIDSystem.setGUID(GUIDSystem, guid);

		['LogSystem', 'EventSystem', 'StorageSystem', 'InteractionSystem', 'StyleSystem'].forEach(name => {
			const instance = this.installPlugin(name);
			_systems[name] = instance;
		});

		_systems['WorkspaceSystem'] = this.installPlugin('WorkspaceSystem', _systems['StyleSystem']);

		const eventSystem = _systems['EventSystem'];
		eventSystem.subscribeByNames('ChangeWorkspaceEditMode', 'changeMode');
		eventSystem.subscribeByNames('DefaultAddWorkspacePanel', 'defaultAddPanel');
		eventSystem.subscribeByNames('CompactWorkspacePanel', 'compactAllPanels');

		// public<-window.Application<-this<-this._systems
		for (let systemName in _systems) {
			Object.defineProperty(this, systemName, {
				value: _systems[systemName],
				enumerable: false,
				configurable: false,
				writable: false,
			});
		}
		Object.defineProperty(window, 'Application', {
			value: this,
			enumerable: false,
			configurable: false,
			writable: false,
		});
	};

	function _getPluginByName(name) {
		try {
			let {plugin} = _plugins.find(plg => plg.name === name);
			return plugin;
		} catch (err) {
			console.error(`Plugin ${name} not found!`);
			console.error(err);
		}
	}

	async function _getDependencies() {
		let manifest;
		return await fetch('/get-dependence-list')
			.then(async depList => {
				manifest = await depList.json();
				return Promise.all(manifest.map(({fileName}) => import(`/dependencies/${fileName}`)));
			})
			.then(modules => {
				manifest.forEach(({name}, index) => {
					_dependencies[name] = {...manifest[index], module: modules[index]};
				});
			});
	}

	async function _getPlugins() {
		let pluginList;
		return await fetch('/get-plugin-list')
			.then(async plugins => {
				pluginList = await plugins.json();
				return Promise.all(pluginList.map(fileName => import(`/plugins/${fileName}`)));
			})
			.then(modules => {
				modules.forEach((module, index) => {
					for (let key in module) {
						if (module[key].getRegistrationMeta) {
							const plugin = module[key];
							const meta = plugin.getRegistrationMeta();
							switch (meta.type) {
								case 'extension':
									if (Array.isArray(meta.target)) {
										for (let target of meta.target) {
											if (!_extensions[target]) _extensions[target] = [];
											_extensions[target].push({...meta, plugin});
										}
									} else {
										if (!_extensions[meta.target]) _extensions[meta.target] = [];
										_extensions[meta.target].push({...meta, plugin});
									}
									break;
								default:
									_plugins.push({...meta, plugin});
									break;
							}
						} else {
							console.error(`Plugin ${pluginList[index]} without static method getRegistrationMeta`);
						}
					}
				});
			});
	}

	this.getDependence = function (dependenceName) {
		return _dependencies[dependenceName].module;
	};

	this.getExtensions = function (targetName) {
		return _extensions[targetName];
	};

	this.getSystem = function (systemName) {
		return _systems[systemName];
	};

	this.getPanels = function () {
		return _plugins.filter(plg => plg.type === 'panel');
	};
}
