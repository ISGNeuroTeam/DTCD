//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'MenuPanel',
  data: () => ({
    selectedTheme: 'light',
    editMode: false,
    themes: [],
  }),
  mounted() {
    this.$root.eventSystem.createActionByCallback("updateTheme",this.$root.guid, this.updateTheme.bind(this));
    this.$root.eventSystem.subscribeByNames('ThemeUpdate', 'updateTheme');


    this.$root.styleSystem.getThemes().then(result => {
      this.themes = result;
      this.$root.styleSystem.setTheme(this.selectedTheme);
    });
  },
  methods: {
    changeTheme(name) {
      this.selectedTheme = name;
      this.$root.styleSystem.setTheme(this.selectedTheme);
      this.$root.eventSystem.createAndPublish(this.$root.guid, "ThemeUpdate");
    },
    compactWorkspacePanels() {
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'CompactWorkspacePanel');
    },
    defaultAddNewPanel() {
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'DefaultAddWorkspacePanel');
    },
    changeEditMode() {
      this.editMode = !this.editMode;
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'ChangeWorkspaceEditMode');
    },
    updateTheme() {
      const themeObj = this.$root.styleSystem.getCurrentTheme();
      this.$root.styleSystem.setVariablesToElement(this.$el, themeObj);
      console.log(123);
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "menu-panel-container" }, [
    _c("div", { staticClass: "menu-panel-button-container" }, [
      _c(
        "div",
        {
          staticClass: "btn",
          class: { pressed: _vm.editMode },
          on: { click: _vm.changeEditMode }
        },
        [
          _c("i", { staticClass: "fas fa-edit" }),
          _vm._v(
            " Режим " +
              _vm._s(_vm.editMode ? "просмотра" : "редактирования") +
              "\n    "
          )
        ]
      ),
      _vm._v(" "),
      _vm.editMode
        ? _c(
            "div",
            { staticClass: "btn", on: { click: _vm.defaultAddNewPanel } },
            [
              _c("i", { staticClass: "fas fa-plus" }),
              _vm._v(" Добавить панель\n    ")
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.editMode
        ? _c(
            "div",
            { staticClass: "btn", on: { click: _vm.compactWorkspacePanels } },
            [_vm._v("Выровнять")]
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _vm.editMode
      ? _c("div", { staticClass: "menu-panel-theme-container" }, [
          _c("p", [_vm._v("Выбрать тему:")]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "themes-container" },
            _vm._l(_vm.themes, function(theme) {
              return _c("div", {
                key: theme.name,
                staticClass: "theme-btn",
                class: { selected: theme.name === _vm.selectedTheme },
                style: { background: theme.preview },
                on: {
                  click: function($event) {
                    return _vm.changeTheme(theme.name)
                  }
                }
              })
            }),
            0
          )
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-eeb91b0a_0", { source: "\n.menu-panel-container[data-v-eeb91b0a] {\n  background-color: var(--secondary-bg-color-panel);\n  overflow-y: auto;\n  height: 100%;\n  font-size: 62.5%;\n  font-family: 'Gill Sans', sans-serif;\n  color: var(--text-color-dark);\n  padding: 10px;\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n}\n.menu-panel-button-container[data-v-eeb91b0a] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.menu-panel-theme-container[data-v-eeb91b0a] {\n  padding: 5px;\n}\n.btn[data-v-eeb91b0a] {\n  background-color: var(--button-bg-color);\n  margin: 6px;\n  font-size: 1rem;\n  color: var(--button-text-color);\n  padding: 10px 20px;\n  text-align: center;\n  border-radius: 3px;\n  border: 2px solid transparent;\n}\n.btn[data-v-eeb91b0a]:hover {\n  border-color: var(--button-hover-border);\n  color: var(--button-hover-text-color);\n  background-color: var(--button-hover-bg-color);\n}\n.btn[data-v-eeb91b0a]:active {\n  transform: scale(0.98);\n}\np[data-v-eeb91b0a] {\n  margin: 0;\n  font-size: 1.1rem;\n}\n.themes-container[data-v-eeb91b0a] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.theme-btn[data-v-eeb91b0a] {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 50%;\n  margin: 3px;\n  border: 3px solid transparent;\n  transition: 0.3s;\n}\n.selected[data-v-eeb91b0a] {\n  border-color: black;\n}\n.pressed[data-v-eeb91b0a] {\n  color: var(--button-bg-color);\n  background-color: white;\n  border-color: #2e99c4;\n}\n.pressed[data-v-eeb91b0a]:hover {\n}\n", map: {"version":3,"sources":["/home/isg-user/Repos/DTCD/DTCD-MenuPanel/src/components/MenuPanel.vue"],"names":[],"mappings":";AAuEA;EACA,iDAAA;EACA,gBAAA;EACA,YAAA;EACA,gBAAA;EACA,oCAAA;EACA,6BAAA;EACA,aAAA;EACA,sBAAA;EACA,aAAA;EACA,eAAA;EACA,uBAAA;EACA,yBAAA;AACA;AAEA;EACA,aAAA;EACA,eAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,wCAAA;EACA,WAAA;EACA,eAAA;EACA,+BAAA;EACA,kBAAA;EACA,kBAAA;EACA,kBAAA;EACA,6BAAA;AACA;AAEA;EACA,wCAAA;EACA,qCAAA;EACA,8CAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,SAAA;EACA,iBAAA;AACA;AAEA;EACA,aAAA;EACA,eAAA;AACA;AAEA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,6BAAA;EACA,gBAAA;AACA;AACA;EACA,mBAAA;AACA;AACA;EACA,6BAAA;EACA,uBAAA;EACA,qBAAA;AACA;AACA;AACA","file":"MenuPanel.vue","sourcesContent":["<template>\n  <div class=\"menu-panel-container\">\n    <div class=\"menu-panel-button-container\">\n      <div class=\"btn\" @click=\"changeEditMode\" :class=\"{ pressed: editMode }\">\n        <i class=\"fas fa-edit\"></i> Режим {{ editMode ? 'просмотра' : 'редактирования' }}\n      </div>\n      <div class=\"btn\" v-if=\"editMode\" @click=\"defaultAddNewPanel\">\n        <i class=\"fas fa-plus\"></i> Добавить панель\n      </div>\n      <div class=\"btn\" v-if=\"editMode\" @click=\"compactWorkspacePanels\">Выровнять</div>\n    </div>\n    <div v-if=\"editMode\" class=\"menu-panel-theme-container\">\n      <p>Выбрать тему:</p>\n      <div class=\"themes-container\">\n        <div\n          class=\"theme-btn\"\n          :class=\"{ selected: theme.name === selectedTheme }\"\n          v-for=\"theme in themes\"\n          :key=\"theme.name\"\n          :style=\"{ background: theme.preview }\"\n          @click=\"changeTheme(theme.name)\"\n        ></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'MenuPanel',\n  data: () => ({\n    selectedTheme: 'light',\n    editMode: false,\n    themes: [],\n  }),\n  mounted() {\n    this.$root.eventSystem.createActionByCallback(\"updateTheme\",this.$root.guid, this.updateTheme.bind(this))\n    this.$root.eventSystem.subscribeByNames('ThemeUpdate', 'updateTheme');\n\n\n    this.$root.styleSystem.getThemes().then(result => {\n      this.themes = result;\n      this.$root.styleSystem.setTheme(this.selectedTheme);\n    });\n  },\n  methods: {\n    changeTheme(name) {\n      this.selectedTheme = name;\n      this.$root.styleSystem.setTheme(this.selectedTheme);\n      this.$root.eventSystem.createAndPublish(this.$root.guid, \"ThemeUpdate\")\n    },\n    compactWorkspacePanels() {\n      this.$root.eventSystem.createAndPublish(this.$root.guid, 'CompactWorkspacePanel');\n    },\n    defaultAddNewPanel() {\n      this.$root.eventSystem.createAndPublish(this.$root.guid, 'DefaultAddWorkspacePanel');\n    },\n    changeEditMode() {\n      this.editMode = !this.editMode;\n      this.$root.eventSystem.createAndPublish(this.$root.guid, 'ChangeWorkspaceEditMode');\n    },\n    updateTheme() {\n      const themeObj = this.$root.styleSystem.getCurrentTheme();\n      this.$root.styleSystem.setVariablesToElement(this.$el, themeObj);\n      console.log(123);\n    },\n  },\n};\n</script>\n\n<style scoped>\n.menu-panel-container {\n  background-color: var(--secondary-bg-color-panel);\n  overflow-y: auto;\n  height: 100%;\n  font-size: 62.5%;\n  font-family: 'Gill Sans', sans-serif;\n  color: var(--text-color-dark);\n  padding: 10px;\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n}\n\n.menu-panel-button-container {\n  display: flex;\n  flex-wrap: wrap;\n}\n.menu-panel-theme-container {\n  padding: 5px;\n}\n.btn {\n  background-color: var(--button-bg-color);\n  margin: 6px;\n  font-size: 1rem;\n  color: var(--button-text-color);\n  padding: 10px 20px;\n  text-align: center;\n  border-radius: 3px;\n  border: 2px solid transparent;\n}\n\n.btn:hover {\n  border-color: var(--button-hover-border);\n  color: var(--button-hover-text-color);\n  background-color: var(--button-hover-bg-color);\n}\n.btn:active {\n  transform: scale(0.98);\n}\np {\n  margin: 0;\n  font-size: 1.1rem;\n}\n\n.themes-container {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.theme-btn {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 50%;\n  margin: 3px;\n  border: 3px solid transparent;\n  transition: 0.3s;\n}\n.selected {\n  border-color: black;\n}\n.pressed {\n  color: var(--button-bg-color);\n  background-color: white;\n  border-color: #2e99c4;\n}\n.pressed:hover {\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-eeb91b0a";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    browser,
    undefined,
    undefined
  );

//

var script$1 = {
  name: 'App',
  components: {
    MenuPanel: __vue_component__,
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("MenuPanel")
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

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
	 * Adding CustomEvent object to events array
	 * @param {Object} customEvent
	 */
	registerEvent(customEvent) {
		this.instance.registerEvent(customEvent);
		return true;
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

class StorageSystemAdapter extends BaseAdapter {
	/**
	 * Initialize StorageSystemAdapter instance.
	 * @constructor
	 */
	constructor() {
		super();
		this.instance = this.getSystem('StorageSystem');
	}

	/**
	 * Create a new record in storage.
	 * @method
	 * @param {string} key Record key name.
	 * @param {*} value Record stored value.
	 * @param {string} storage Storage type.
	 */
	addRecord(key, value, storage) {
		this.instance.addRecord(key, value, storage);
	}

	/**
	 * Replace record value by key or create a new record to storage.
	 * @method
	 * @param {string} key Record key name.
	 * @param {*} value Record stored value.
	 * @param {string} storage Storage type.
	 */
	putRecord(key, value, storage) {
		this.instance.putRecord(key, value, storage);
	}

	/**
	 * Check for a record in the storage.
	 * @method
	 * @param {string} key Record key name.
	 * @param {string} storage Storage type.
	 * @returns {boolean} Returns true if record exists in storage.
	 */
	hasRecord(key, storage) {
		return this.instance.hasRecord(key, storage);
	}

	/**
	 * Get record value from storage by key.
	 * @method
	 * @param {string} key Record key name.
	 * @param {string} storage Storage type.
	 * @returns {*} Storage record value.
	 */
	getRecord(key, storage) {
		return this.instance.getRecord(key, storage);
	}

	/**
	 * Delete record from storage by key.
	 * @method
	 * @param {string} key Record key name.
	 * @param {string} storage Storage type.
	 */
	removeRecord(key, storage) {
		this.instance.removeRecord(key, storage);
	}

	/**
	 * Clear the specified storage type.
	 * @method
	 * @param {string} storage Storage type.
	 */
	clearStorage(storage) {
		this.instance.clearStorage(storage);
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
	 * @param {String} name
	 * @returns {Object[]}
	 */
	getDependence(name) {
		return Application.getDependence(name);
	}

	/**
	 * Getting all extensions for plugin by name
	 * @param {String} name
	 * @return {Object[]}
	 */
	getExtensions(name) {
		return Application.getExtensions(name);
	}

	/**
	 * Getting of all awailable panels
	 * @return {Object[]}
	 */
	getPanels() {
		return Application.getPanels();
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

class PanelPlugin extends AbstractPlugin {
	/**
	 * This method will be executed after the style theme of the whole application has changed.
	 */
	updateTheme() {
		throw new Error('Implement the updateTheme method for updating style properties of this panel');
	}
}

class Plugin extends PanelPlugin {
	static getRegistrationMeta() {
		return {
			type: 'panel',
			title: 'Панель меню',
			name: 'MenuPanel',
		};
	}

	constructor(guid, selector, styleSystem) {
		super();
		console.log(selector);
		let eventSystem = new EventSystemAdapter();
		let storageSystem = new StorageSystemAdapter();

		eventSystem.registerEvent(eventSystem.createEvent(guid, 'ChangeWorkspaceEditMode'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'DefaultAddWorkspacePanel'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'CompactWorkspacePanel'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

		const VueJS = this.getDependence('Vue');

		new VueJS.default({
			render: h => h(__vue_component__$1),
			data() {
				return {
					guid,
					eventSystem,
					storageSystem,
					styleSystem,
				};
			},
		}).$mount(selector);
	}
}

export { Plugin };
