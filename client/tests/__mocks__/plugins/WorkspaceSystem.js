var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "body {\n  margin: 0;\n}\n.grid-stack-item-content {\n  position: relative;\n  border: 1px solid gray;\n  transition: 0.3s;\n}\n.gridstack-content-container {\n  height: 100%;\n}\n\n.gridstack-panel-overlay:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 1500;\n  background-color: #3c1c7836;\n}\n\n.gridstack-panel-header {\n  display: none;\n  justify-content: flex-end;\n  align-items: center;\n  position: absolute;\n  z-index: 2000;\n  width: 100%;\n  height: 2em;\n  background-color: rgb(102, 102, 102);\n}\n\n.default-select-panel {\n  border: none;\n  outline: none;\n  background: transparent;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  border-radius: 0;\n  margin: 0;\n  display: block;\n  width: 100%;\n  padding: 12px 55px 15px 15px;\n  font-size: 14px;\n  background-color: hsla(212, 44%, 51%, 0.418);\n}\n.default-select-panel:after {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 50px;\n  height: 100%;\n  line-height: 38px;\n  content: '∨';\n  text-align: center;\n  color: #714bb9;\n  font-size: 24px;\n  border-left: 1px solid #3c1c78;\n  z-index: -1;\n}\n\n.close-panel-button {\n  background-color: none;\n  width: 10px;\n  margin-right: 0.5em;\n}\n\n.handle-drag-of-panel {\n  /* cursor: grab; */\n}\n.handle-drag-of-panel > * {\n  /* cursor: pointer; */\n}\n.ui-resizable-handle {\n  z-index: 15000 !important;\n}\n";
n(css,{});

var css$1 = "/*!\n * gridstack 3.1.2 required CSS for default 12 and 1 column Mode size. Use gridstack-extra.css for column [2-11], else see https://github.com/gridstack/gridstack.js#custom-columns-css\n * https://gridstackjs.com/\n * (c) 2014-2020 Alain Dumesny, Dylan Weiss, Pavel Reznikov\n * gridstack.js may be freely distributed under the MIT license.\n*/:root .grid-stack-item>.ui-resizable-handle{filter:none}.grid-stack{position:relative}.grid-stack.grid-stack-rtl{direction:ltr}.grid-stack.grid-stack-rtl>.grid-stack-item{direction:rtl}.grid-stack .grid-stack-placeholder>.placeholder-content{border:1px dashed #d3d3d3;margin:0;position:absolute;width:auto;z-index:0!important;text-align:center}.grid-stack>.grid-stack-item{min-width:8.3333333333%;position:absolute;padding:0}.grid-stack>.grid-stack-item>.grid-stack-item-content{margin:0;position:absolute;width:auto;overflow-x:hidden;overflow-y:auto}.grid-stack>.grid-stack-item>.ui-resizable-handle{position:absolute;font-size:.1px;display:block;-ms-touch-action:none;touch-action:none}.grid-stack>.grid-stack-item.ui-resizable-autohide>.ui-resizable-handle,.grid-stack>.grid-stack-item.ui-resizable-disabled>.ui-resizable-handle{display:none}.grid-stack>.grid-stack-item.ui-draggable-dragging,.grid-stack>.grid-stack-item.ui-resizable-resizing{z-index:100}.grid-stack>.grid-stack-item.ui-draggable-dragging>.grid-stack-item-content,.grid-stack>.grid-stack-item.ui-resizable-resizing>.grid-stack-item-content{box-shadow:1px 4px 6px rgba(0,0,0,.2);opacity:.8}.grid-stack>.grid-stack-item>.ui-resizable-se,.grid-stack>.grid-stack-item>.ui-resizable-sw{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMS42MjYgNTExLjYyNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjYyNiA1MTEuNjI3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTMyOC45MDYsNDAxLjk5NGgtMzYuNTUzVjEwOS42MzZoMzYuNTUzYzQuOTQ4LDAsOS4yMzYtMS44MDksMTIuODQ3LTUuNDI2YzMuNjEzLTMuNjE1LDUuNDIxLTcuODk4LDUuNDIxLTEyLjg0NSAgIGMwLTQuOTQ5LTEuODAxLTkuMjMxLTUuNDI4LTEyLjg1MWwtNzMuMDg3LTczLjA5QzI2NS4wNDQsMS44MDksMjYwLjc2LDAsMjU1LjgxMywwYy00Ljk0OCwwLTkuMjI5LDEuODA5LTEyLjg0Nyw1LjQyNCAgIGwtNzMuMDg4LDczLjA5Yy0zLjYxOCwzLjYxOS01LjQyNCw3LjkwMi01LjQyNCwxMi44NTFjMCw0Ljk0NiwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDVjMy42MTksMy42MTcsNy45MDEsNS40MjYsMTIuODUsNS40MjYgICBoMzYuNTQ1djI5Mi4zNThoLTM2LjU0MmMtNC45NTIsMC05LjIzNSwxLjgwOC0xMi44NSw1LjQyMWMtMy42MTcsMy42MjEtNS40MjQsNy45MDUtNS40MjQsMTIuODU0ICAgYzAsNC45NDUsMS44MDcsOS4yMjcsNS40MjQsMTIuODQ3bDczLjA4OSw3My4wODhjMy42MTcsMy42MTcsNy44OTgsNS40MjQsMTIuODQ3LDUuNDI0YzQuOTUsMCw5LjIzNC0xLjgwNywxMi44NDktNS40MjQgICBsNzMuMDg3LTczLjA4OGMzLjYxMy0zLjYyLDUuNDIxLTcuOTAxLDUuNDIxLTEyLjg0N2MwLTQuOTQ4LTEuODA4LTkuMjMyLTUuNDIxLTEyLjg1NCAgIEMzMzguMTQyLDQwMy44MDIsMzMzLjg1Nyw0MDEuOTk0LDMyOC45MDYsNDAxLjk5NHoiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);background-repeat:no-repeat;background-position:center;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.grid-stack>.grid-stack-item>.ui-resizable-se{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.grid-stack>.grid-stack-item>.ui-resizable-nw{cursor:nw-resize;width:20px;height:20px;top:0}.grid-stack>.grid-stack-item>.ui-resizable-n{cursor:n-resize;height:10px;top:0;left:25px;right:25px}.grid-stack>.grid-stack-item>.ui-resizable-ne{cursor:ne-resize;width:20px;height:20px;top:0}.grid-stack>.grid-stack-item>.ui-resizable-e{cursor:e-resize;width:10px;top:15px;bottom:15px}.grid-stack>.grid-stack-item>.ui-resizable-se{cursor:se-resize;width:20px;height:20px}.grid-stack>.grid-stack-item>.ui-resizable-s{cursor:s-resize;height:10px;left:25px;bottom:0;right:25px}.grid-stack>.grid-stack-item>.ui-resizable-sw{cursor:sw-resize;width:20px;height:20px;bottom:0}.grid-stack>.grid-stack-item>.ui-resizable-w{cursor:w-resize;width:10px;top:15px;bottom:15px}.grid-stack>.grid-stack-item.ui-draggable-dragging>.ui-resizable-handle{display:none!important}.grid-stack>.grid-stack-item[gs-w='1']{width:8.3333333333%}.grid-stack>.grid-stack-item[gs-x='1']{left:8.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='1']{min-width:8.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='1']{max-width:8.3333333333%}.grid-stack>.grid-stack-item[gs-w='2']{width:16.6666666667%}.grid-stack>.grid-stack-item[gs-x='2']{left:16.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='2']{min-width:16.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='2']{max-width:16.6666666667%}.grid-stack>.grid-stack-item[gs-w='3']{width:25%}.grid-stack>.grid-stack-item[gs-x='3']{left:25%}.grid-stack>.grid-stack-item[gs-min-w='3']{min-width:25%}.grid-stack>.grid-stack-item[gs-max-w='3']{max-width:25%}.grid-stack>.grid-stack-item[gs-w='4']{width:33.3333333333%}.grid-stack>.grid-stack-item[gs-x='4']{left:33.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='4']{min-width:33.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='4']{max-width:33.3333333333%}.grid-stack>.grid-stack-item[gs-w='5']{width:41.6666666667%}.grid-stack>.grid-stack-item[gs-x='5']{left:41.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='5']{min-width:41.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='5']{max-width:41.6666666667%}.grid-stack>.grid-stack-item[gs-w='6']{width:50%}.grid-stack>.grid-stack-item[gs-x='6']{left:50%}.grid-stack>.grid-stack-item[gs-min-w='6']{min-width:50%}.grid-stack>.grid-stack-item[gs-max-w='6']{max-width:50%}.grid-stack>.grid-stack-item[gs-w='7']{width:58.3333333333%}.grid-stack>.grid-stack-item[gs-x='7']{left:58.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='7']{min-width:58.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='7']{max-width:58.3333333333%}.grid-stack>.grid-stack-item[gs-w='8']{width:66.6666666667%}.grid-stack>.grid-stack-item[gs-x='8']{left:66.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='8']{min-width:66.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='8']{max-width:66.6666666667%}.grid-stack>.grid-stack-item[gs-w='9']{width:75%}.grid-stack>.grid-stack-item[gs-x='9']{left:75%}.grid-stack>.grid-stack-item[gs-min-w='9']{min-width:75%}.grid-stack>.grid-stack-item[gs-max-w='9']{max-width:75%}.grid-stack>.grid-stack-item[gs-w='10']{width:83.3333333333%}.grid-stack>.grid-stack-item[gs-x='10']{left:83.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='10']{min-width:83.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='10']{max-width:83.3333333333%}.grid-stack>.grid-stack-item[gs-w='11']{width:91.6666666667%}.grid-stack>.grid-stack-item[gs-x='11']{left:91.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='11']{min-width:91.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='11']{max-width:91.6666666667%}.grid-stack>.grid-stack-item[gs-w='12']{width:100%}.grid-stack>.grid-stack-item[gs-x='12']{left:100%}.grid-stack>.grid-stack-item[gs-min-w='12']{min-width:100%}.grid-stack>.grid-stack-item[gs-max-w='12']{max-width:100%}.grid-stack.grid-stack-1>.grid-stack-item{min-width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-w='1']{width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-x='1']{left:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-min-w='1']{min-width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-max-w='1']{max-width:100%}.grid-stack.grid-stack-animate,.grid-stack.grid-stack-animate .grid-stack-item{-webkit-transition:left .3s,top .3s,height .3s,width .3s;-moz-transition:left .3s,top .3s,height .3s,width .3s;-ms-transition:left .3s,top .3s,height .3s,width .3s;-o-transition:left .3s,top .3s,height .3s,width .3s;transition:left .3s,top .3s,height .3s,width .3s}.grid-stack.grid-stack-animate .grid-stack-item.grid-stack-placeholder,.grid-stack.grid-stack-animate .grid-stack-item.ui-draggable-dragging,.grid-stack.grid-stack-animate .grid-stack-item.ui-resizable-resizing{-webkit-transition:left 0s,top 0s,height 0s,width 0s;-moz-transition:left 0s,top 0s,height 0s,width 0s;-ms-transition:left 0s,top 0s,height 0s,width 0s;-o-transition:left 0s,top 0s,height 0s,width 0s;transition:left 0s,top 0s,height 0s,width 0s}.grid-stack.ui-droppable.ui-droppable-over>:not(.ui-droppable){pointer-events:none}";
n(css$1,{});

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
			name: 'WorkspaceSystem',
			type: 'core',
			title: 'Система рабочего стола',
		};
	}

	constructor(guid, styleSystem) {
		super();
		this.guid = guid;
		this.editMode = false;
		this.eventSystem = new EventSystemAdapter();
		this.GUIDSystem = new GUIDSystemAdapter();

		const el = document.createElement('div');
		el.setAttribute('class', 'grid-stack');
		el.style = 'width:100%;height:100%';
		document.body.appendChild(el);

		// GRIDSTACK INSTANCE OPTIONS
		this.grid = GridStack.init({
			float: false,
			draggable: {
				handle: '.handle-drag-of-panel',
			},
			resizable: {
				handles: 'e, se, s, sw, w, nw, n, ne',
			},
			margin: 0,
			staticGrid: true,
		});

		this.addingOptions = {
			autoPosition: true,
			w: 3,
			h: 3,
		};

		// MenuPanel
		this.grid.addWidget(
			`	<div class="grid-stack-item">
					<div class="grid-stack-item-content handle-drag-of-panel">
						<div id="panel-MenuPanel">
						</div>
					</div>
				</div> `,
			{
				x: 0,
				y: 0,
				w: 2,
				h: 2,
			}
		);

		this.installPlugin('MenuPanel', `#panel-MenuPanel`, styleSystem);

		this.numberPanelIncrement = 0;
		this.eventSystem.createActionByCallback('changeMode', guid, this.changeMode.bind(this));
		this.eventSystem.createActionByCallback('defaultAddPanel', guid, this.defaultAddPanel.bind(this));
		this.eventSystem.createActionByCallback('compactAllPanels', guid, this.compactAllPanels.bind(this));
	}

	createWorkspaceCell(autoPosition = true, w = null, h = null, x = null, y = null) {
		//TODO: Prettify next assignments
		w = Number.isInteger(w) ? w : this.addingOptions.w;
		h = Number.isInteger(h) ? h : this.addingOptions.h;
		x = Number.isInteger(x) ? x : this.addingOptions.x;
		y = Number.isInteger(y) ? y : this.addingOptions.y;

		const currentNumberPanel = new Number(this.numberPanelIncrement);

		// TODO: Replace on WEB-COMPONENT with style!
		this.grid.addWidget(
			`
			<div class="grid-stack-item">
        <div class="grid-stack-item-content">
          <div class="handle-drag-of-panel gridstack-panel-header" style="display:${this.editMode ? 'flex' : 'hide'}">
            <div id="closePanelBtn-${currentNumberPanel}" class="close-panel-button">
              <i  class="fas fa-lg fa-times"></i>
            </div>
          </div>
          <div class="gridstack-content-container${this.editMode ? ' gridstack-panel-overlay' : ''}">
            <div id="panel-${currentNumberPanel}">
            </div>
          <div>
				</div>
			</div>
		`,
			{autoPosition, x, y, w, h, id: currentNumberPanel}
		);

		const selectEl = document.createElement('select');
		selectEl.classList = 'default-select-panel';
		selectEl.options[0] = new Option('Выбрать панель ↓');
		let nextOptionIndex = 1;
		this.getPanels().forEach(plug => {
			const {type, title, name} = plug;
			if (type === 'panel' && name !== 'MenuPanel') {
				selectEl.options[nextOptionIndex] = new Option(title, name);
				nextOptionIndex++;
			}
		});

		let instanceOfPanel;
		selectEl.onchange = evt => {
			const idCell = evt.target.parentElement.getAttribute('id');
			const workspaceCellID = idCell.split('-').pop();

			// The next line is needed to delete an instance
			instanceOfPanel = this.installPlugin(selectEl.value, `#panel-${workspaceCellID}`);
		};

		document.getElementById(`panel-${currentNumberPanel}`).appendChild(selectEl);

		// closePanelBtn
		document.getElementById(`closePanelBtn-${currentNumberPanel}`).addEventListener('click', evt => {
			const el = document.querySelector(`[gs-id="${currentNumberPanel}"]`);
			this.grid.removeWidget(el);
			this.GUIDSystem.removeInstance(instanceOfPanel);
		});

		this.numberPanelIncrement++;

		return currentNumberPanel;
	}

	// Public actions

	defaultAddPanel(msg) {
		this.createWorkspaceCell();
	}

	_mountPanelForDevelop(name, w = null, h = null, x = null, y = null) {
		this.createWorkspaceCell(false, w, h, x, y);
	}

	compactAllPanels() {
		this.grid.compact();
	}
	changeMode() {
		const panelHeaders = document.querySelectorAll('.gridstack-panel-header');
		panelHeaders.forEach(header => {
			header.style.display = this.editMode ? 'none' : 'flex';
		});
		const panelContents = document.querySelectorAll('.gridstack-content-container');

		const overlayClass = 'gridstack-panel-overlay';
		panelContents.forEach(content => {
			this.editMode ? content.classList.remove(overlayClass) : content.classList.add(overlayClass);
		});

		const margin = this.editMode ? '0px' : '10px';
		this.grid.batchUpdate();
		this.grid.margin(margin);
		this.grid.commit();
		this.grid.setStatic(this.editMode);
		this.editMode = !this.editMode;
	}
}

export { Plugin };
