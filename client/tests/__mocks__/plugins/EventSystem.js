class CustomEvent {
  constructor(guid, eventName, args = null) {
    this.guid = guid;
    this.name = eventName;
    this.args = args;
    this.id = `${this.name}[${this.guid}]`;
  }

  toString() {
    return this.id;
  }
}

class CustomAction {
  constructor(actionName, guid, callback, args = null) {
    this.guid = guid;
    this.name = actionName;
    this.args = args;
    this.id = `${guid}[${actionName}]`;
    this.callback = callback;
  }
  toString() {
    return this.id;
  }
}

class BaseAdapter {
	/**
	 * Getting instances of systems in the constructor
	 * @constructor
	 */
	constructor() {
		this.app = Application;
	}
	/**
	 * This method returns an instance of the required system
	 * @param {String} name Name of getting system
	 * @returns {Object} Instance of system
	 */
	getSystem(name) {
		return this.app.getSystem(name);
	}
}

class GUIDSystemAdapter extends BaseAdapter {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.instance = this.getSystem('GUIDSystem');
	}

	/**
	 * Create and return string unique identifier
	 * @method
	 * @return {String}
	 */
	createGUID() {
		return this.instance.createGUID();
	}

	/**
	 * Set guid for object in GUIDSystem
	 * @method
	 * @param {Object} instance
	 * @param {String} guid
	 * @return {Boolean}
	 */
	setGUID(instance, guid) {
		return this.instance.setGUID(instance, guid);
	}

	/**
	 * Getting GUID by instance
	 * @method
	 * @param {String} instance
	 * @returns {String}
	 */
	getGUID(instance) {
		return this.instance.getGUID(instance);
	}

	/**
	 * Delete record about instance from GUIDSystem
	 * @method
	 * @param {String} guid
	 * @return {Boolean}
	 */
	removeGUID(guid) {
		return this.instance.removeGUID(guid);
	}

	/**
	 * Getting GUID's/GUID of instances with name in params
	 * @method
	 * @param {String} name
	 * @return {String[]|String|Boolean}
	 */
	getGUIDByName(name) {
		return this.instance.getGUIDByName(name);
	}

	/**
	 * Remove instance from GUIDSystem
	 * @method
	 * @param {Object} instance
	 * @return {Boolean}
	 */
	removeInstance(instance) {
		return this.instance.removeInstance(instance);
	}

	/**
	 * Getting instance by guid
	 * @method
	 * @param {String} guid
	 * @returns {Object}
	 */
	getInstance(guid) {
		return this.instance.getInstance(guid);
	}

	/**
	 * Get first instance of plugin with name in params
	 * @method
	 * @param {String} name
	 * @return {String[]|String|Boolean}
	 */
	getInstanceByName(name) {
		return this.instance.getInstanceByName(name);
	}
}

class LogSystemAdapter extends BaseAdapter {
	/**
	 * @constructor
	 * @param {String} guid guid of plugin instance
	 * @param {String} pluginName name of plugin
	 */
	constructor(guid, pluginName) {
		super();
		this.instance = this.getSystem('LogSystem');
		this.guid = guid;
		this.pluginName = pluginName;
	}
	/**
	 * Adds new log record to the system
	 * @param {String} message - log message to record
	 */
	log(message) {
		this.instance.log(this.guid, this.pluginName, message);
	}
}

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
	 * Getting list of all awailable panels
	 * @method
	 * @return {Object[]}
	 */
	getPanels() {
		return Application.getPanels();
	}

	/**
	 * Getting system by name
	 * @method
	 * @param {String} name
	 * @return {Object}
	 */
	getSystem(name) {
		return Application.getSystem(name);
	}

	/**
	 * Installing plugin by name
	 * @method
	 * @param {String} name
	 */
	installPlugin(name, ...args) {
		return Application.installPlugin(name, ...args);
	}

	/**
	 * Delete instance of plugin
	 * @method
	 * @param {Object} plugin
	 * @returns {Boolean}
	 */
	uninstallPlugin(plugin) {
		return Application.uninstallPlugin(plugin);
	}
}

class SystemPlugin extends AbstractPlugin {}

class Plugin extends SystemPlugin {
	static getRegistrationMeta() {
		return {
			type: 'core',
			title: 'Система Событий',
			name: 'EventSystem',
		};
	}

	constructor(guid) {
		super();
		// systemGUID needed for getting callback (function) of instances by guid
		this.guid = guid;
		this.systemGUID = new GUIDSystemAdapter();
		this.logSystem = new LogSystemAdapter(this.guid, 'EventSystem');
		this.actions = [];
		this.events = [];
	}

	registerEvent(customEvent) {
		this.events.push(customEvent);
		return true;
	}

	registerAction(action) {
		this.actions.push(action);
		return true;
	}

	// Events methods
	createAndPublish(guid, eventName, args) {
		const customEvent = this.createEvent(guid, eventName, args);
		this.publishEvent(customEvent);
	}

	publishEvent(customEvent) {
		this.logSystem.log(`Publish event ${customEvent.id}`);
		PubSub.publish(customEvent, customEvent.id);
	}

	createEvent(guid, eventName, args = null) {
		return new CustomEvent(guid, eventName, args);
	}

	// Actions methods

	// createAction(actionName, guid, args = null) {
	// 	const instance = this.systemGUID.guids[guid];
	// 	// Warning!: nextline is very important. It's getting method of DataCADPlugin by actionName
	// 	const callback = instance[actionName].bind(instance);
	// 	return new CustomAction(actionName, guid, callback, args);
	// }

	// Some API for comfortable action publishing
	createActionByCallback(actionName, guid, callback, args = null) {
		const customAction = new CustomAction(actionName, guid, callback, args);
		this.actions.push(customAction);
		return customAction;
	}

	// Subscribing
	subscribeEventsByName(eventName, actionID) {
		const events = this.findEventsByName(eventName);
		const action = this.findActionById(actionID);
		events.forEach(evt => this.subscribe(evt, action));
		return true;
	}

	subscribeByNames(eventName, actionName) {
		const events = this.findEventsByName(eventName);
		const actions = this.findActionsByName(actionName);
		for (let evt of events) {
			for (let action of actions) {
				this.subscribe(evt.id, action.id);
			}
		}
		return true;
	}

	subscribe(eventID, actionID) {
		const customAction = this.findActionById(actionID);
		PubSub.subscribe(eventID, customAction.callback);
		return true;
	}

	subscribeEventNameByCallback(eventName, callback) {
		const events = this.findEventsByName(eventName);
		for (let evt of events) {
			PubSub.subscribe(evt, callback);
		}
	}

	// Searching in actions/events
	findActionById(actionID) {
		return this.actions.find(action => action.id == actionID);
	}

	findEventById(eventID) {
		return this.events.find(evt => evt.id == eventID);
	}

	findEventsByName(eventName) {
		return this.events.filter(evt => evt.name == eventName);
	}

	findActionsByName(actionName) {
		return this.actions.filter(action => action.name == actionName);
	}

	showAvailableEvents() {
		//TODO: prettify returned object (grouping etc)
		return this.events;
	}

	showAvailableActions() {
		//TODO: prettify returned object (grouping etc)
		return this.actions;
	}
}

export { Plugin };
