/**
 * @typedef {Object} PluginMeta
 * @property {String} title
 * @property {String} name
 * @property {String[]} actions
 * @property {String[]} events
 * @property {String[]} requirements
 */
class AbstractPlugin {
	/**
	 * Static method of AbstractPlugin class which need to reload!
	 * @static
	 * @returns {PluginMeta}
	 * @return {String} meta.title
	 * @return {String} meta.name
	 * @return {String[]} meta.actions
	 * @return {String[]} meta.events
	 * @return {String[]} meta.dependencies
	 */
	static getRegistrationMeta() {
		throw new Error('Implement the getRegistrationMeta static method!');
	}

	/**
	 * Getting module from dependencies
	 * @method
	 * @param {String} name
	 * @returns {Object[]}
	 */
	getDependence(name) {
		return Application.getDependence(name);
	}

	/**
	 * Getting all extensions for plugin by name
	 * @method
	 * @param {String} name
	 * @return {Object[]}
	 */
	getExtensions(name) {
		return Application.getExtensions(name);
	}

	/**
	 * Getting of all awailable panels
	 * @method
	 * @return {Object[]}
	 */
	getPanels() {
		return Application.getPanels();
	}

	/**
	 * Getting panel by name
	 * @method
	 * @param {String} name
	 * @return {Object}
	 */
	getPanel(name) {
		return Application.getPanel(name);
	}

	/**
	 * Getting system by name
	 * @param {String} name
	 * @return {Object}
	 */
	getSystem(name) {
		return Application.getSystem(name);
	}

	/**
	 * Installing plugin by name
	 * @param {String} name
	 */
	installPlugin(name, ...args) {
		return Application.installPlugin(name, ...args);
	}
}

class SystemPlugin extends AbstractPlugin {}

class Plugin extends SystemPlugin {
	static getRegistrationMeta() {
		return {
			type: 'core',
			title: 'Система GUID',
			name: 'GUIDSystem',
		};
	}

	constructor() {
		super();
		this.guids = {};
		this.count = 0;
	}

	createGUID() {
		this.count++;
		return `guid${this.count}`;
	}

	setGUID(instance, guid) {
		this.guids[guid] = {instance, ...instance.constructor.getRegistrationMeta()};
		return true;
	}

	getGUID(instance) {
		return Object.keys().find(key => (this.guids[key].instance === instance ? key : false));
	}

	removeGUID(guid) {
		delete this.guids[guid];
		return true;
	}

	getGUIDByName(name) {
		const filtered = Object.keys(this.guids).filter(guid => name === this.guids[guid].name);
		if (filtered.length > 1) {
			return filtered;
		} else if (filtered.length === 1) {
			return filtered[0];
		} else {
			console.error(`No instances with name ${name} were found!`);
			return false;
		}
	}

	removeInstance(instance) {
		for (let key of Object.keys(this.guids)) {
			if (this.guids[key].instance === instance) {
				delete this.guids[key];
				break;
			}
		}
		return true;
	}

	getInstance(guid) {
		return this.guids[guid].instance;
	}

	getInstanceByName(name) {
		let filtered;
		Object.values(this.guids).forEach(record => {
			if (name === record.name) filtered.push(record.instance);
		});
		if (filtered.length > 1) ; else if (filtered.length === 1) ; else {
			console.error(`Instances with name ${name} weren't found!`);
			return false;
		}
	}
}

export { Plugin };
