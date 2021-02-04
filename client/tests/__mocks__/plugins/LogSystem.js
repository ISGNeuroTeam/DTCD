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

class LogSystem extends SystemPlugin {
  static getRegistrationMeta() {
    return {
      type: 'core',
      title: 'Система логирования',
      name: 'LogSystem',
    };
  }

  constructor() {
    super();
    this.logs = [];
  }

  log(guid, pluginName, message) {
    if (
      typeof guid === 'string' &&
      typeof pluginName === 'string' &&
      typeof message === 'string' &&
      guid.length > 0 &&
      pluginName.length > 0 &&
      message.length > 0
    ) {
      let time = Date.now();
      this.logs.push({
        timestamps: time,
        plugin: pluginName,
        message: message,
        guid,
      });
      return true;
    } else return false;
  }
  uploadLogs() {
    console.log('coming soon...');
  }
}

export { LogSystem };
