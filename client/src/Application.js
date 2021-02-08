import {fillDependencies} from './utils/fill-dependencies';
import {fillPlugins} from './utils/fill-plugins';

export default class Application {
	constructor() {
		this._dependencies = {};

		this._plugins = [];
		this._extensions = {};

		this._systems = {};

		this._guids = {};
		this._count = 0;

		window.Application = this;
	}

	async start() {
		await Promise.all([fillDependencies(this._dependencies), fillPlugins(this._plugins, this._extensions)]).then(() => {
			['LogSystem', 'EventSystem', 'StorageSystem', 'InteractionSystem', 'StyleSystem', 'WorkspaceSystem'].forEach(
				name => {
					const instance = this.installPlugin(name);
					this._systems[name] = instance;
				}
			);
		});
		this._defaultSubscriptions();
	}

	_defaultSubscriptions() {
		const eventSystem = this.getSystem('EventSystem');
		eventSystem.subscribeByNames('ChangeWorkspaceEditMode', 'changeMode');
		eventSystem.subscribeByNames('DefaultAddWorkspacePanel', 'defaultAddPanel');
		eventSystem.subscribeByNames('CompactWorkspacePanel', 'compactAllPanels');
	}

	installPlugin(name, ...args) {
		const nextGUID = `guid${this._count}`;
		const Plugin = this.getPlugin(name);
		const instance = new Plugin(nextGUID, ...args);
		this._guids[nextGUID] = instance;
		this._count++;
		return instance;
	}

	uninstallPluginByGUID(guid) {
		delete this._guids[guid];
		return true;
	}

	uninstallPluginByInstance(instance) {
		const guid = Object.keys(this._guids).find(key => this._guids[key] === instance);
		delete this._guids[guid];
		return true;
	}
	getDependence(dependenceName) {
		return this._dependencies[dependenceName].module;
	}
	getSystem(systemName) {
		return this._systems[systemName];
	}
	getPanels() {
		return this._plugins.filter(plg => plg.type === 'panel');
	}
	getPlugin(name, type = false) {
		try {
			let {plugin} = this._plugins.find(plg => {
				return type ? plg.name === name && plg.type === type : plg.name === name;
			});
			return plugin;
		} catch (err) {
			console.error(`Plugin ${name} not found!`);
			throw new Error(err);
		}
	}

	getExtensions(targetName) {
		return this._extensions[targetName];
	}

	getInstance(guid) {
		return this._guids[guid];
	}

	// this.start = start;
	// this.installPlugin = installPlugin;
	// this.getPlugin = getPlugin;
	// this.getDependence = getDependence;
	// this.getSystem = getSystem;
	// this.getPanels = getPanels;
	// this.getExtensions = getExtensions;
}
