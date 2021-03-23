import {fillDependencies} from './utils/fill-dependencies';
import {fillPlugins} from './utils/fill-plugins';

export default class Application {
	#dependencies;
	#plugins;
	#extensions;
	#systems;
	#guids;
	#count;

	constructor() {
		this.#dependencies = {};

		this.#plugins = [];
		this.#extensions = {};

		this.#systems = {};

		this.#guids = {};
		this.#count = 0;

		window.Application = this;
	}

	async start() {
		await Promise.all([fillDependencies(this.#dependencies), fillPlugins(this.#plugins, this.#extensions)]).then(
			async () => {
				let systems = [
					'LogSystem',
					'EventSystem',
					'StorageSystem',
					'InteractionSystem',
					'StyleSystem',
					'WorkspaceSystem',
				];
				for (let i = 0; i < systems.length; i++) {
					const instance = this.installPlugin(systems[i]);
					if (instance.init) {
						await instance.init();
					}
					this.#systems[systems[i]] = instance;
				}
			}
		);
		this.#defaultSubscriptions();
	}

	#defaultSubscriptions() {
		const eventSystem = this.getSystem('EventSystem');
		eventSystem.subscribeByNames('ChangeWorkspaceEditMode', 'changeMode');
		eventSystem.subscribeByNames('DefaultAddWorkspacePanel', 'defaultAddPanel');
		eventSystem.subscribeByNames('CompactWorkspacePanel', 'compactAllPanels');
	}

	// ---- PUBLIC METHODS ----

	installPlugin(name, ...args) {
		const nextGUID = `guid${this.#count}`;
		const Plugin = this.getPlugin(name);
		const instance = new Plugin(nextGUID, ...args);
		this.#guids[nextGUID] = instance;
		this.#count++;
		return instance;
	}

	uninstallPluginByGUID(guid) {
		delete this.#guids[guid];
		return true;
	}

	uninstallPluginByInstance(instance) {
		const guid = Object.keys(this.#guids).find(key => this.#guids[key] === instance);
		delete this.#guids[guid];
		return true;
	}
	getDependence(dependenceName) {
		return this.#dependencies[dependenceName].module;
	}
	getSystem(systemName) {
		return this.#systems[systemName];
	}
	getPanels() {
		return this.#plugins.filter(plg => plg.type === 'panel');
	}
	getPlugin(name, type = false) {
		try {
			let {plugin} = this.#plugins.find(plg => {
				return type ? plg.name === name && plg.type === type : plg.name === name;
			});
			return plugin;
		} catch (err) {
			console.error(`Plugin ${name} not found!`);
			throw new Error(err);
		}
	}

	getExtensions(targetName) {
		return this.#extensions[targetName];
	}

	getInstance(guid) {
		return this.#guids[guid];
	}
}
