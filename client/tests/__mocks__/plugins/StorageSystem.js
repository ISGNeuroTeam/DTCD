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

class EventSystemAdapter extends BaseAdapter {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.instance = this.getSystem('EventSystem');
	}

	/**
	 * Creates and publishes a new event to EventSystem
	 * @param {Number} guid identifier of plugin instance
	 * @param {String} eventName event name
	 * @param {*} args additional data in event for action
	 */
	createAndPublish(guid, eventName, args) {
		this.instance.createAndPublish(guid, eventName, args);
	}

	/**
	 * Publishes event from CustomEvent instance
	 * @param {CustomEvent} customEvent instance of CustomEvent
	 */
	publishEvent(customEvent) {
		this.publishEvent(customEvent);
	}

	/**
	 * Creates new instance of CustomEvent
	 * @param {Number} guid identifier of plugin instance
	 * @param {String} eventName event name
	 * @param {*} args additional data in event for action
	 * @returns {CustomEvent} created instance of CustomEvent
	 */
	createEvent(guid, eventName, args = null) {
		return this.instance.createEvent(guid, eventName, args);
	}

	/**
	 * Creates new instance of CustomAction
	 * @param {String} actionName action name
	 * @param {Number} guid identifier of plugin instance
	 * @param {*} args ...
	 * @returns {CustomAction} created instance of CustomAction
	 */
	createAction(actionName, guid, args = null) {
		return this.instance.createAction(actionName, guid, args);
	}

	/**
	 * Creates instance of CustomAction from the given callback and pushes it to action list
	 * @param {String} actionName action name
	 * @param {Number} guid identifier of plugin instance
	 * @param {Function} callback callback whitch invoked on event
	 * @param {*} args ...
	 * @returns {CustomAction} created instance of CustomAction
	 */
	createActionByCallback(actionName, guid, callback, args = null) {
		return this.instance.createActionByCallback(actionName, guid, callback, args);
	}

	/**
	 * Subsribes all events with the given name to action with the given actionID
	 * @param {String} eventName event name
	 * @param {String} actionID action id
	 * @returns {Boolean} true, if everything is ok
	 */
	subscribeEventsByName(eventName, actionID) {
		return this.instance.subscribeEventsByName(eventName, actionID);
	}
	/**
	 * Subsribes all events with the given eventName to all action with the given actionName
	 * @param {String} eventName event name
	 * @param {String} actionName action name
	 * @returns {Boolean} true, if everything is ok
	 */
	subscribeByNames(eventName, actionName) {
		return this.instance.subscribeByNames(eventName, actionName);
	}

	/**
	 * Subscribes the given instance of event to the given instace of action
	 * @param {CustomEvent} event instance of CustomEvent
	 * @param {CustomAction} action instance of CustomAction
	 * @returns {Boolean} true, if everything is ok
	 */
	subscribe(event, action) {
		return this.instance.subscribe(event, action);
	}

	/**
	 * Subscribes to all events with the given event name and sets the given callback
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	subscribeEventNameByCallback(eventName, callback) {
		this.instance.subscribeEventNameByCallback(eventName, callback);
	}

	/**
	 * Returns instace of action stored in EventSystem from the given actionID
	 * @param {String} actionID actionID of the action
	 * @returns {CustomAction} instance of CustomAction stored in EventSystem
	 */
	findActionById(actionID) {
		return this.instance.findAction(actionID);
	}

	/**
	 * Returns instace of event stored in EventSystem from the given eventID
	 * @param {String} eventID eventID of the event
	 * @returns {CustomEvent} instance of CustomEvent stored in EventSystem
	 */
	findEventById(eventID) {
		return this.instance.findEventById(eventID);
	}

	/**
	 * Returns instaces of events stored in EventSystem from the given event name
	 * @param {String} eventName event name
	 * @returns {Array} instaces of events stored in EventSystem
	 */
	findEventsByName(eventName) {
		return this.instance.findEventsByName(eventName);
	}

	/**
	 * Returns instaces of actions stored in EventSystem from the given action name
	 * @param {String} actionName
	 * @returns {Array} instaces of actions stored in EventSystem
	 */
	findActionsByName(actionName) {
		return this.instance.findActionsByName(actionName);
	}

	/**
	 * Return list of available event instances stored in EventSystem
	 * @returns {Array} instaces of events stored in EventSystem
	 */
	showAvailableEvents() {
		return this.instance.showAvailableEvents();
	}

	/**
	 * Return list of available action instances stored in EventSystem
	 * @returns {Array} instaces of actions stored in EventSystem
	 */
	showAvailableActions() {
		return this.instance.showAvailableActions();
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
	 *
	 * @param {String} name
	 */
	getDependence(name) {
		return Application.getDependence(name);
	}

	/**
	 *
	 * @param {String} name
	 */
	getExtensions(name) {
		return Application.getExtensions(name);
	}

	/**
	 *
	 * @param {String} name
	 */
	getSystem(name) {
		return Application.getSystem(name);
	}
}

class SystemPlugin extends AbstractPlugin {}

const TYPE_SESSION = 'session';
const TYPE_PERSIST = 'persist';

const initializeVuexModule = (moduleName, Vue) => ({
  [moduleName]: {

    namespaced: true,

    state: {},

    getters: {
      getRecord: state => key => state[key],
    },

    mutations: {
      ADD_RECORD(state, { key, value }) {
        state[key] = value;
      },

      PUT_RECORD(state, { key, value }) {
        state[key] = value;
      },

      REMOVE_RECORD(state, key) {
        Vue.delete(state, key);
      },

      CLEAR(state) {
        for (const key in state) {
          Vue.delete(state, key);
        }
      },
    },

    actions: {
      addRecord({ commit }, { key, value }) {
        commit('ADD_RECORD', { key, value });
      },

      putRecord({ commit }, { key, value }) {
        commit('PUT_RECORD', { key, value });
      },

      removeRecord({ commit }, key) {
        commit('REMOVE_RECORD', key);
      },

      clear({ commit }) {
        commit('CLEAR');
      },
    },

  }
});

var pluginRegistrationMeta = {
  type: 'core',
  name: 'StorageSystem',
  title: 'Storage System',
  events: ['StorageSystemUpdateData'],
  actions: [],
  requirements: ['vue.js', 'vuex.js'],
};

const vuexModuleName = 'UserDataStorage';

const throwError = (message) => {
  throw new Error(message);
};

/**
 * StorageSystem core plugin.
 * @extends SystemPlugin
 */
class Plugin extends SystemPlugin {

  static getRegistrationMeta () {
    return pluginRegistrationMeta;
  }

  constructor (guid) {
    super();
    this.guid = guid;
    const VueJS = this.getDependence("Vue");
    const Vuex = this.getDependence("Vuex");

    this.eventSystem = new EventSystemAdapter();
    this.logSystem = new LogSystemAdapter(guid, vuexModuleName);
    this.validStorageTypes = [TYPE_SESSION, TYPE_PERSIST];

    const vue = VueJS.default;
    vue.use(Vuex);

    this._store = new Vuex.Store({
      state: {},
      getters: {},
      mutations: {},
      actions: {},
      modules: { ...initializeVuexModule(vuexModuleName, vue) },
    });

    this._dispatch = this._store.dispatch;
    this._sessionStorage = this._store.state[vuexModuleName];
  }

  _checkStorageType (type) {
    if (typeof type !== 'string') {
      throwError('Invalid storage type');
    } else if (!this.validStorageTypes.includes(type)) {
      throwError('Storage type must be "session" or "persist"');
    }
  }

  _checkRecordKey (key) {
    if (typeof key !== 'string') {
      throwError('Record key must be a string');
    } else if (key === '' || key.startsWith(' ')) {
      throwError('Record key cannot be empty or start with a space');
    }
  }

  _isKeyExistInStorage (key, storage) {
    this._checkStorageType(storage);
    this._checkRecordKey(key);
    return storage === TYPE_PERSIST ? false : key in this._sessionStorage;
  }

  _createRecord (createType, { key, value, storage }) {
    this._checkStorageType(storage);
    this._checkRecordKey(key);

    if (createType === 'add') {
      if (this._isKeyExistInStorage(key, storage)) {
        throwError(`Record with key "${key}" already exists`);
      }
    }

    if (typeof value === 'function') {
      throwError('Record value cannot be a function');
    }

    if (storage === TYPE_PERSIST) {
      return console.warn('Будет добавлено в IndexedDB');
    }

    this._dispatch(`${vuexModuleName}/addRecord`, { key, value });
  }

  /**
   * Create a new record in storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   * @param {string} storage Storage type.
   */
  addRecord (key, value, storage = TYPE_SESSION) {
    this.logSystem.log(`Add record ${key}`);
    this._createRecord('add', { key, value, storage });
  }

  /**
   * Replace record value by key or create a new record to storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   * @param {string} storage Storage type.
   */
  putRecord (key, value, storage = TYPE_SESSION) {
    this._createRecord('put', { key, value, storage });
  }

  /**
   * Check for a record in the storage.
   * @method
   * @param {string} key Record key name.
   * @param {string} storage Storage type.
   * @returns {boolean} Returns true if record exists in storage.
   */
  hasRecord (key, storage = TYPE_SESSION) {
    return this._isKeyExistInStorage(key, storage);
  }

  /**
   * Get record value from storage by key.
   * @method
   * @param {string} key Record key name.
   * @param {string} storage Storage type.
   * @returns {*} Storage record value.
   */
  getRecord (key, storage = TYPE_SESSION) {
    this._checkStorageType(storage);

    if (storage === TYPE_PERSIST) {
      console.warn(`Запись с ключом "${key}" из IndexedDB`);
      return 'record';
    }

    return this._store.getters['UserDataStorage/getRecord'](key);
  }

  /**
   * Delete record from storage by key.
   * @method
   * @param {string} key Record key name.
   * @param {string} storage Storage type.
   */
  removeRecord (key, storage = TYPE_SESSION) {
    this._checkStorageType(storage);

    if (storage === TYPE_PERSIST) {
      console.warn('Будет удалено из IndexedDB');
      return 'success';
    }

    this._dispatch(`${vuexModuleName}/removeRecord`, key);
    return 'success';
  }

  /**
   * Clear the specified storage type.
   * @method
   * @param {string} storage Storage type.
   */
  clearStorage (storage = TYPE_SESSION) {
    this._checkStorageType(storage);

    if (storage === TYPE_PERSIST) {
      console.warn('Будет очищено хранилище IndexedDB');
      return 'success';
    }

    this._dispatch(`${vuexModuleName}/clear`);
    return 'success';
  }

}

export { Plugin };
