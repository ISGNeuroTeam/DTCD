import {GridStack} from '../tests/__mocks__/dependencies/gridstack';
import {fillDependencies} from './utils/fill-dependencies';
import {fillPlugins} from './utils/fill-plugins';

export default function Application() {
	const _dependencies = {};

	const _plugins = [];
	const _extensions = {};

	const _systems = {};

	const _guids = {};
	let count = 0;

	window.Application = this;

	async function start() {
		window.Application = this;

		await fillDependencies(_dependencies);
		await fillPlugins(_plugins, _extensions);

		['LogSystem', 'EventSystem', 'StorageSystem', 'InteractionSystem', 'StyleSystem'].forEach(name => {
			const instance = installPlugin(name);
			_systems[name] = instance;
		});

		// _systems['WorkspaceSystem'] = installPlugin('WorkspaceSystem', _systems['StyleSystem']);

		const eventSystem = _systems['EventSystem'];
		eventSystem.subscribeByNames('ChangeWorkspaceEditMode', 'changeMode');
		eventSystem.subscribeByNames('DefaultAddWorkspacePanel', 'defaultAddPanel');
		eventSystem.subscribeByNames('CompactWorkspacePanel', 'compactAllPanels');

		// for (let systemName in _systems) {
		// 	Object.defineProperty(this, systemName, {
		// 		value: _systems[systemName],
		// 		enumerable: false,
		// 		configurable: false,
		// 		writable: false,
		// 	});
		// }
		// Object.defineProperty(window, 'Application', {
		// 	value: this,
		// 	enumerable: false,
		// 	configurable: false,
		// 	writable: false,
		// });
	}
	function installPlugin(name, ...args) {
		const nextGUID = `guid${count}`;
		const Plugin = getPlugin(name);
		const instance = new Plugin(nextGUID, ...args);
		_guids[nextGUID] = instance;
		count++;
		return instance;
	}

	function uninstallPluginByGUID(guid) {
		delete _guids[guid];
		return true;
	}

	function uninstallPluginByInstance(instance) {
		const guid = Object.keys(_guids).find(key => _guids[key] === instance);
		delete _guids[guid];
		return true;
	}
	function getDependence(dependenceName) {
		return _dependencies[dependenceName].module;
	}
	function getSystem(systemName) {
		return _systems[systemName];
	}
	function getPanels() {
		return _plugins.filter(plg => plg.type === 'panel');
	}

	function getPlugin(name) {
		try {
			let {plugin} = _plugins.find(plg => plg.name === name);
			return plugin;
		} catch (err) {
			console.error(`Plugin ${name} not found!`);
			throw new Error(err);
		}
	}

	function getExtensions(targetName) {
		return _extensions[targetName];
	}

	this.start = start;
	this.installPlugin = installPlugin;
	this.getPlugin = getPlugin;
	this.getDependence = getDependence;
	this.getSystem = getSystem;
	this.getPanels = getPanels;
	this.getExtensions = getExtensions;
}
