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

class StyleSystemAdapter extends BaseAdapter {
	/**
	 * Initialize StyleSystemAdapter instance.
	 * @constructor
	 */
	constructor() {
		super();
		this.instance = this.getSystem('StyleSystem');
	}

	/**
	 * Get object design system.
	 * @method
	 * @returns {object} current object design system.
	 */
	getCurrentTheme() {
		return this.instance.getCurrentTheme();
	}

	/**
	 * Set CSS variable for DOM element
	 * @method
	 * @param {string} element DOM element.
	 * @param {object} obj Design object.
	 * @param {string} startPrefix Prefix for CSS variable.
	 */
	setVariablesToElement(element, obj, startPrefix = '-') {
		this.instance.setVariablesToElement(element, obj, startPrefix);
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

class PanelPlugin extends AbstractPlugin {
	/**
	 * This method will be executed after the style theme of the whole application has changed.
	 */
	updateTheme() {
		throw new Error('Implement the updateTheme method for updating style properties of this panel');
	}
}

class ExtensionInterface {
	constructor(graphComponent, instance, workspacePrimitives, yFiles) {
		this.graph = graphComponent.graph;
		this.graphComponent = graphComponent;
		this.instance = instance;
		this.workspacePrimitives = workspacePrimitives;
		this.yFiles = yFiles;

		this.extensionName = instance.constructor.getRegistrationMeta().name;
	}

	addNode(nodeName, x = 0, y = 0) {
		const PrimitiveClass = this.instance.primitives[nodeName];
		const primitive = new PrimitiveClass();
		const primitiveVisual = primitive.create();
		//? where to get primitive.tag by interfaceCreate?
		primitive.tag = {extensionName: this.extensionName, primitiveName: nodeName};

		const createdNode = this.graph.createNode(primitiveVisual.layout, primitiveVisual.style, primitive.tag);
		this.graph.setNodeCenter(createdNode, new this.yFiles.Point(x, y));

		const byName = this.graph.nodes.filter(node => node.tag.primitiveName === nodeName);

		const nodeID = `${nodeName}-${byName.indexOf(createdNode) + 1}`;
		this.workspacePrimitives[nodeID] = primitive;
		this.graph.addLabel(createdNode, nodeID, this.yFiles.ExteriorLabelModel.SOUTH);
	}

	addEdge(edgeName, sourceNodeID, targetNodeID) {
		const PrimitiveClass = this.instance.primitives[edgeName];
		const primitive = new PrimitiveClass();
		const primitiveVisual = primitive.create();
		//? where to get primitive.tag by interfaceCreate?
		primitive.tag = {extensionName: this.extensionName, primitiveName: edgeName};

		const sourceNode = this.findNode(sourceNodeID);
		const targetNode = this.findNode(targetNodeID);
		this.graph.createEdge(sourceNode, targetNode, primitiveVisual.style, primitive.tag);
	}

	removeNode(nodeID) {
		const node = this.findNode(nodeID);
		this.graph.removeNode(node);
	}

	removeEdge(firstNodeID, secondNodeID) {
		const firstNode = this.findNode(firstNodeID);
		const secondNode = this.findNode(secondNodeID);
		const edge = this.graph.getEdge(firstNode, secondNode);
		this.graph.remove(edge);
	}

	findNode(nodeID) {
		let [srcName, srcNumber] = nodeID.split('-');
		srcNumber--;
		const byName = this.graph.nodes.filter(node => node.tag.primitiveName === srcName);
		//! it's suboptimal
		return byName.toArray()[srcNumber];
	}
}

//

var script = {
  name: 'LiveDashWorkspace',
  data() {
    return {
      extensions:{},
      primitives:{}
    }
  },
  computed: {
    graphID () {
      return `panel-${this.panelID}-graph`;
    },
    graphOverview () {
      return `${this.graphID}-overview`;
    },
  },
  mounted () {
    const {
      GraphComponent,
      ShapeNodeStyle,
      Rect,
      MouseWheelBehaviors,
    } = this.$root.yFiles;

    let graphElement = this.$refs[this.graphID];
    this.$graphComponent = new GraphComponent(graphElement);

    const graph = this.$graphComponent.graph;

    this.$graphComponent.inputMode = this.configureInputModes();

    graph.undoEngineEnabled = true;
    graph.nodeDefaults.style = new ShapeNodeStyle({
      fill: 'orange',
      stroke: 'orange',
      shape: 'rectangle',
    });

    this.$graphComponent.fitGraphBounds();
    this.$graphComponent.mouseWheelBehavior = MouseWheelBehaviors.ZOOM | MouseWheelBehaviors.ONLY_WHEN_FOCUSED;

    const extensions = this.$root.pluginInstance.getExtensions("LiveDashPanel");
    // Installing of extensions
    extensions.forEach(({name})=>{
      const extensionInstance = this.$root.pluginInstance.installPlugin(name);
      const extensionInterfaceName = name[0].toLowerCase() + name.slice(1); // adding in panel by camelCase
      this.$root.pluginInstance[extensionInterfaceName]= new ExtensionInterface(this.$graphComponent, extensionInstance, this.$root.pluginInstance.primitives, this.$root.yFiles);
      this.extensions[name] = extensionInstance;
    });

    this.createGraphOverview();

    // Value/methods transfer in root of plugin (set public)
    this.$root.pluginInstance.findNode = this.findNode;
  },
  methods: {
    configureInputModes () {
      const {
        GraphEditorInputMode,
        GraphSnapContext,
        GridSnapTypes,
        NodeDropInputMode,
        LabelDropInputMode,
        INode,
        IEdge,
        IPort,
        PortDropInputMode,
        MouseEventRecognizers,
      } = this.$root.yFiles;
      // configure the snapping context
      const mode = new GraphEditorInputMode({
        allowGroupingOperations: true,
        allowAddLabel: false,
        allowCreateNode: false,
        allowCreateEdge: true,
        snapContext: new GraphSnapContext({
          nodeToNodeDistance: 30,
          nodeToEdgeDistance: 20,
          snapOrthogonalMovement: false,
          snapDistance: 10,
          snapSegmentsToSnapLines: true,
          snapBendsToSnapLines: true,
          gridSnapType: GridSnapTypes.ALL,
        }),
      });
      mode.moveViewportInputMode.pressedRecognizer = MouseEventRecognizers.MIDDLE_IS_DOWN;
      // mode.marqueeSelectionInputMode.enabled = false;

      // create a new NodeDropInputMode to configure the drag and drop operation
      const nodeDropInputMode = new NodeDropInputMode();
      // enables the display of the dragged element during the drag
      nodeDropInputMode.showPreview = true;
      // initially disables snapping fo the dragged element to existing elements
      nodeDropInputMode.snappingEnabled = true;
      // by default the mode available in GraphEditorInputMode is disabled, so first enable it
      nodeDropInputMode.enabled = true;

      nodeDropInputMode.itemCreator = this.dropItemCreator;

      const labelDropInputMode = new LabelDropInputMode();
      labelDropInputMode.showPreview = true;
      labelDropInputMode.snappingEnabled = false;
      labelDropInputMode.enabled = true;
      labelDropInputMode.useBestMatchingParameter = true;
      // allow for nodes and edges to be the new label owner
      labelDropInputMode.isValidLabelOwnerPredicate = labelOwner => INode.isInstance(labelOwner) || IEdge.isInstance(labelOwner) || IPort.isInstance(labelOwner);

      const portDropInputMode = new PortDropInputMode();
      portDropInputMode.showPreview = true;
      portDropInputMode.snappingEnabled = false;
      portDropInputMode.enabled = true;
      portDropInputMode.useBestMatchingParameter = true;
      // allow only for nodes to be the new port owner
      portDropInputMode.isValidPortOwnerPredicate = portOwner => INode.isInstance(portOwner);

      Object.assign(mode, { portDropInputMode, nodeDropInputMode, labelDropInputMode });
      return mode;
    },

    createGraphOverview () {
      const { GraphOverviewComponent } = this.$root.yFiles;
      new GraphOverviewComponent(
        this.$refs[this.graphOverview],
        this.$graphComponent,
      );
    },

    dropItemCreator (ctx, graph, draggedItem, dropTarget, dropLocation) {
      // To save default style and tag before drop
      let originalEdgeDefaultStyle = null;
      let originalEdgeDefaultTag = null;


      const canvasInputMode = ctx.canvasComponent.inputMode;
      const {
        IEdge,
        INode,
        Point,
        DefaultPortCandidate,
        GraphItemTypes,
        GraphEditorInputMode,
        ExteriorLabelModel
      } = this.$root.yFiles;
      const hitItems = canvasInputMode.findItems(dropLocation, [GraphItemTypes.NODE, GraphItemTypes.EDGE]);
      if(hitItems.size>0){
        dropTarget=hitItems.first();
      }

      if (!draggedItem.tag.extensionName) {
        graph.createNodeAt(dropLocation, draggedItem.style, draggedItem.tag);
      } else {
        const {extensionName, primitiveName} = draggedItem.tag;
        if(!this.extensions[extensionName]){
          this.extensions[extensionName] = this.$root.pluginInstaller(extensionName);
        } 
        const extension = this.extensions[extensionName];

        const primitiveInstance = new extension.primitives[primitiveName]();
        const primitiveVisual = primitiveInstance.create();

        if(INode.isInstance(primitiveVisual)){
          const createdNode = graph.createNode(primitiveVisual.layout, primitiveVisual.style, draggedItem.tag);
          graph.setNodeCenter(createdNode, dropLocation);

          // Filtered nodes on graph by name, to text in label.
          const filteredNodesByName = graph.nodes.filter(node=>node.tag.primitiveName===primitiveName);
          const nodeID = `${primitiveName}-${filteredNodesByName.indexOf(createdNode)+1}`;
          graph.addLabel(createdNode, nodeID, ExteriorLabelModel.SOUTH);

        } else if (IEdge.isInstance(primitiveVisual)) {
          const style = primitiveVisual.style;

          if (IEdge.isInstance(dropTarget)) {
            // Set the style of the edge at the drop location to the dropped style.
            graph.setStyle(dropTarget, style);
          } else {
            // Look for a node at the drop location.
            if (!INode.isInstance(dropTarget)) {
              return;
            }
            // Start the creation of an edge from e node at a suitable porthcaedidate
            // for the dr p node at a suitable port candidate
            // for the drop location with the dropped edge style.
            const candidateLocation = graph.nodeDefaults.ports.getLocationParameterInstance(
              dropTarget
            );
            const candidate = new DefaultPortCandidate(dropTarget, candidateLocation);
            const createEdgeInputMode = canvasInputMode.createEdgeInputMode;

            // store the previous edge style
            originalEdgeDefaultStyle = createEdgeInputMode.edgeDefaults.style;
            originalEdgeDefaultTag = createEdgeInputMode.edgeDefaults.tag;
            // change the edge style and tag only for the one dropped onto the canvas
            createEdgeInputMode.edgeDefaults.style = style;
            createEdgeInputMode.edgeDefaults.tag = draggedItem.tag;

            // change the edge style only for the one dropped onto the canvas
            createEdgeInputMode.dummyEdgeGraph.setStyle(
              createEdgeInputMode.dummyEdge,
              style
            );
            createEdgeInputMode.doStartEdgeCreation(candidate);
          }
          ctx.canvasComponent.focus();
        }
      }
      canvasInputMode.createEdgeInputMode.addEdgeCreatedListener(() => {
        if (originalEdgeDefaultStyle || originalEdgeDefaultTag) {
          canvasInputMode.createEdgeInputMode.edgeDefaults.style = originalEdgeDefaultStyle;
          canvasInputMode.createEdgeInputMode.edgeDefaults.tag = originalEdgeDefaultTag;
          originalEdgeDefaultStyle = null;
        }
      });
    },

    findNode(nodeID) {
      let [srcName, srcNumber] = nodeID.split('-');
      srcNumber--;
      const byName = this.$graphComponent.graph.nodes.filter(node => node.tag.primitiveName === srcName);
      //! it's suboptimal
      return byName.toArray()[srcNumber];
    },
    
    createNodeAction(event){
      const {Point} = this.$root.yFiles;
      const {x, y, extensionName, primitiveName} = event.args;
      const point = new Point(x, y);
      // const extensionInstance = this.systemGUID.getInstanceByName(extensionName);
      const primitiveInstance = new extensionInstance.primitives[primitiveName]();
      const node = primitiveInstance.create();
      this.$graphComponent.graph.createNodeAt(point, node.style, node);
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
  return _c("div", { staticClass: "workspace" }, [
    _c("div", { ref: _vm.graphID, staticClass: "graph" }),
    _vm._v(" "),
    _c("div", { ref: _vm.graphOverview, staticClass: "overview" })
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1ef560a5_0", { source: "*[data-v-1ef560a5] {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n.workspace[data-v-1ef560a5] {\n  height: 100%;\n  position: relative;\n  background-color: var(--main-bg-color-panel);\n}\n.workspace .graph[data-v-1ef560a5] {\n  height: 100%;\n}\n.workspace .overview[data-v-1ef560a5] {\n  width: 250px;\n  height: 250px;\n  position: absolute;\n  left: 20px;\n  bottom: 20px;\n  background-color: var(--secondary-bg-color-panel);\n  border: thin solid grey;\n}\n\n/*# sourceMappingURL=LiveDashWorkspace.vue.map */", map: {"version":3,"sources":["LiveDashWorkspace.vue","/home/isg-user/Repos/DTCD/DTCD-LiveDashPanel/src/components/LiveDashWorkspace.vue"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;EACV,wIAAwI;AAC1I;ACoPA;EACA,YAAA;EACA,kBAAA;EACA,4CAAA;ADjPA;ACmPA;EACA,YAAA;ADjPA;ACoPA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,UAAA;EACA,YAAA;EACA,iDAAA;EACA,uBAAA;ADlPA;;AAEA,gDAAgD","file":"LiveDashWorkspace.vue","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n\n.workspace {\n  height: 100%;\n  position: relative;\n  background-color: var(--main-bg-color-panel);\n}\n.workspace .graph {\n  height: 100%;\n}\n.workspace .overview {\n  width: 250px;\n  height: 250px;\n  position: absolute;\n  left: 20px;\n  bottom: 20px;\n  background-color: var(--secondary-bg-color-panel);\n  border: thin solid grey;\n}\n\n/*# sourceMappingURL=LiveDashWorkspace.vue.map */","<template>\n  <div class=\"workspace\">\n    <div class=\"graph\" :ref=\"graphID\"/>\n    <div class=\"overview\" :ref=\"graphOverview\"/>\n  </div>\n</template>\n\n<script>\nimport {ExtensionInterface} from \"./utils/ExtensionInterface\"\n\nexport default {\n  name: 'LiveDashWorkspace',\n  data() {\n    return {\n      extensions:{},\n      primitives:{}\n    }\n  },\n  computed: {\n    graphID () {\n      return `panel-${this.panelID}-graph`;\n    },\n    graphOverview () {\n      return `${this.graphID}-overview`;\n    },\n  },\n  mounted () {\n    const {\n      GraphComponent,\n      ShapeNodeStyle,\n      Rect,\n      MouseWheelBehaviors,\n    } = this.$root.yFiles;\n\n    let graphElement = this.$refs[this.graphID];\n    this.$graphComponent = new GraphComponent(graphElement);\n\n    const graph = this.$graphComponent.graph;\n\n    this.$graphComponent.inputMode = this.configureInputModes();\n\n    graph.undoEngineEnabled = true;\n    graph.nodeDefaults.style = new ShapeNodeStyle({\n      fill: 'orange',\n      stroke: 'orange',\n      shape: 'rectangle',\n    });\n\n    this.$graphComponent.fitGraphBounds();\n    this.$graphComponent.mouseWheelBehavior = MouseWheelBehaviors.ZOOM | MouseWheelBehaviors.ONLY_WHEN_FOCUSED;\n\n    const extensions = this.$root.pluginInstance.getExtensions(\"LiveDashPanel\");\n    // Installing of extensions\n    extensions.forEach(({name})=>{\n      const extensionInstance = this.$root.pluginInstance.installPlugin(name)\n      const extensionInterfaceName = name[0].toLowerCase() + name.slice(1); // adding in panel by camelCase\n      this.$root.pluginInstance[extensionInterfaceName]= new ExtensionInterface(this.$graphComponent, extensionInstance, this.$root.pluginInstance.primitives, this.$root.yFiles);\n      this.extensions[name] = extensionInstance;\n    });\n\n    this.createGraphOverview();\n\n    // Value/methods transfer in root of plugin (set public)\n    this.$root.pluginInstance.findNode = this.findNode\n  },\n  methods: {\n    configureInputModes () {\n      const {\n        GraphEditorInputMode,\n        GraphSnapContext,\n        GridSnapTypes,\n        NodeDropInputMode,\n        LabelDropInputMode,\n        INode,\n        IEdge,\n        IPort,\n        PortDropInputMode,\n        MouseEventRecognizers,\n      } = this.$root.yFiles;\n      // configure the snapping context\n      const mode = new GraphEditorInputMode({\n        allowGroupingOperations: true,\n        allowAddLabel: false,\n        allowCreateNode: false,\n        allowCreateEdge: true,\n        snapContext: new GraphSnapContext({\n          nodeToNodeDistance: 30,\n          nodeToEdgeDistance: 20,\n          snapOrthogonalMovement: false,\n          snapDistance: 10,\n          snapSegmentsToSnapLines: true,\n          snapBendsToSnapLines: true,\n          gridSnapType: GridSnapTypes.ALL,\n        }),\n      });\n      mode.moveViewportInputMode.pressedRecognizer = MouseEventRecognizers.MIDDLE_IS_DOWN;\n      // mode.marqueeSelectionInputMode.enabled = false;\n\n      // create a new NodeDropInputMode to configure the drag and drop operation\n      const nodeDropInputMode = new NodeDropInputMode();\n      // enables the display of the dragged element during the drag\n      nodeDropInputMode.showPreview = true;\n      // initially disables snapping fo the dragged element to existing elements\n      nodeDropInputMode.snappingEnabled = true;\n      // by default the mode available in GraphEditorInputMode is disabled, so first enable it\n      nodeDropInputMode.enabled = true;\n\n      nodeDropInputMode.itemCreator = this.dropItemCreator;\n\n      const labelDropInputMode = new LabelDropInputMode();\n      labelDropInputMode.showPreview = true;\n      labelDropInputMode.snappingEnabled = false;\n      labelDropInputMode.enabled = true;\n      labelDropInputMode.useBestMatchingParameter = true;\n      // allow for nodes and edges to be the new label owner\n      labelDropInputMode.isValidLabelOwnerPredicate = labelOwner => INode.isInstance(labelOwner) || IEdge.isInstance(labelOwner) || IPort.isInstance(labelOwner);\n\n      const portDropInputMode = new PortDropInputMode();\n      portDropInputMode.showPreview = true;\n      portDropInputMode.snappingEnabled = false;\n      portDropInputMode.enabled = true;\n      portDropInputMode.useBestMatchingParameter = true;\n      // allow only for nodes to be the new port owner\n      portDropInputMode.isValidPortOwnerPredicate = portOwner => INode.isInstance(portOwner);\n\n      Object.assign(mode, { portDropInputMode, nodeDropInputMode, labelDropInputMode });\n      return mode;\n    },\n\n    createGraphOverview () {\n      const { GraphOverviewComponent } = this.$root.yFiles;\n      const overviewComponent = new GraphOverviewComponent(\n        this.$refs[this.graphOverview],\n        this.$graphComponent,\n      );\n    },\n\n    dropItemCreator (ctx, graph, draggedItem, dropTarget, dropLocation) {\n      // To save default style and tag before drop\n      let originalEdgeDefaultStyle = null;\n      let originalEdgeDefaultTag = null;\n\n\n      const canvasInputMode = ctx.canvasComponent.inputMode\n      const {\n        IEdge,\n        INode,\n        Point,\n        DefaultPortCandidate,\n        GraphItemTypes,\n        GraphEditorInputMode,\n        ExteriorLabelModel\n      } = this.$root.yFiles;\n      const hitItems = canvasInputMode.findItems(dropLocation, [GraphItemTypes.NODE, GraphItemTypes.EDGE])\n      if(hitItems.size>0){\n        dropTarget=hitItems.first()\n      }\n\n      if (!draggedItem.tag.extensionName) {\n        graph.createNodeAt(dropLocation, draggedItem.style, draggedItem.tag);\n      } else {\n        const {extensionName, primitiveName} = draggedItem.tag;\n        if(!this.extensions[extensionName]){\n          this.extensions[extensionName] = this.$root.pluginInstaller(extensionName);\n        } \n        const extension = this.extensions[extensionName]\n\n        const primitiveInstance = new extension.primitives[primitiveName]();\n        const primitiveVisual = primitiveInstance.create();\n\n        if(INode.isInstance(primitiveVisual)){\n          const createdNode = graph.createNode(primitiveVisual.layout, primitiveVisual.style, draggedItem.tag);\n          graph.setNodeCenter(createdNode, dropLocation);\n\n          // Filtered nodes on graph by name, to text in label.\n          const filteredNodesByName = graph.nodes.filter(node=>node.tag.primitiveName===primitiveName);\n          const nodeID = `${primitiveName}-${filteredNodesByName.indexOf(createdNode)+1}`;\n          graph.addLabel(createdNode, nodeID, ExteriorLabelModel.SOUTH)\n\n        } else if (IEdge.isInstance(primitiveVisual)) {\n          const style = primitiveVisual.style;\n\n          if (IEdge.isInstance(dropTarget)) {\n            // Set the style of the edge at the drop location to the dropped style.\n            graph.setStyle(dropTarget, style);\n          } else {\n            // Look for a node at the drop location.\n            if (!INode.isInstance(dropTarget)) {\n              return;\n            }\n            // Start the creation of an edge from e node at a suitable porthcaedidate\n            // for the dr p node at a suitable port candidate\n            // for the drop location with the dropped edge style.\n            const candidateLocation = graph.nodeDefaults.ports.getLocationParameterInstance(\n              dropTarget\n            );\n            const candidate = new DefaultPortCandidate(dropTarget, candidateLocation);\n            const createEdgeInputMode = canvasInputMode.createEdgeInputMode;\n\n            // store the previous edge style\n            originalEdgeDefaultStyle = createEdgeInputMode.edgeDefaults.style;\n            originalEdgeDefaultTag = createEdgeInputMode.edgeDefaults.tag;\n            // change the edge style and tag only for the one dropped onto the canvas\n            createEdgeInputMode.edgeDefaults.style = style;\n            createEdgeInputMode.edgeDefaults.tag = draggedItem.tag\n\n            // change the edge style only for the one dropped onto the canvas\n            createEdgeInputMode.dummyEdgeGraph.setStyle(\n              createEdgeInputMode.dummyEdge,\n              style\n            );\n            createEdgeInputMode.doStartEdgeCreation(candidate);\n          }\n          ctx.canvasComponent.focus();\n        }\n      }\n      canvasInputMode.createEdgeInputMode.addEdgeCreatedListener(() => {\n        if (originalEdgeDefaultStyle || originalEdgeDefaultTag) {\n          canvasInputMode.createEdgeInputMode.edgeDefaults.style = originalEdgeDefaultStyle\n          canvasInputMode.createEdgeInputMode.edgeDefaults.tag = originalEdgeDefaultTag\n          originalEdgeDefaultStyle = null\n        }\n      })\n    },\n\n    findNode(nodeID) {\n      let [srcName, srcNumber] = nodeID.split('-');\n      srcNumber--;\n      const byName = this.$graphComponent.graph.nodes.filter(node => node.tag.primitiveName === srcName);\n      //! it's suboptimal\n      return byName.toArray()[srcNumber];\n    },\n    \n    createNodeAction(event){\n      const {Point} = this.$root.yFiles;\n      const {x, y, extensionName, primitiveName} = event.args;\n      const point = new Point(x, y);\n      // const extensionInstance = this.systemGUID.getInstanceByName(extensionName);\n      const primitiveInstance = new extensionInstance.primitives[primitiveName]();\n      const node = primitiveInstance.create();\n      this.$graphComponent.graph.createNodeAt(point, node.style, node);\n    },\n\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import './../styles/base';\n.workspace {\n  height: 100%;\n  position: relative;\n  background-color: var(--main-bg-color-panel);\n\n  .graph {\n    height: 100%;\n  }\n\n  .overview {\n    width: 250px;\n    height: 250px;\n    position: absolute;\n    left: 20px;\n    bottom: 20px;\n    background-color: var(--secondary-bg-color-panel);\n    border: thin solid grey;\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-1ef560a5";
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
  name: 'LiveDashPanel',
  components: { LiveDashWorkspace: __vue_component__ }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "graph-container" },
    [_c("LiveDashWorkspace")],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-76f37d20_0", { source: "*[data-v-76f37d20] {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n.graph-container[data-v-76f37d20] {\n  height: 100%;\n}\n\n/*# sourceMappingURL=App.vue.map */", map: {"version":3,"sources":["App.vue","/home/isg-user/Repos/DTCD/DTCD-LiveDashPanel/src/App.vue"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;EACV,wIAAwI;AAC1I;ACYA;EACA,YAAA;ADTA;;AAEA,kCAAkC","file":"App.vue","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n\n.graph-container {\n  height: 100%;\n}\n\n/*# sourceMappingURL=App.vue.map */","<template>\n  <div class=\"graph-container\">\n    <LiveDashWorkspace/>\n  </div>\n</template>\n\n<script>\nimport LiveDashWorkspace from './components/LiveDashWorkspace.vue';\n\nexport default {\n  name: 'LiveDashPanel',\n  components: { LiveDashWorkspace }\n}\n</script>\n\n<style lang=\"scss\" scoped>\n@import './styles/base';\n.graph-container {\n  height: 100%;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-76f37d20";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
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
    browser,
    undefined,
    undefined
  );

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "/****************************************************************************\r\n ** @license\r\n ** This file is part of yFiles for HTML 2.3.0.3.\r\n **\r\n ** yWorks proprietary/confidential. Use is subject to license terms.\r\n **\r\n ** Copyright (c) 2020 by yWorks GmbH, Vor dem Kreuzberg 28,\r\n ** 72070 Tuebingen, Germany. All rights reserved.\r\n **\r\n ***************************************************************************/\r\n/* The main divs that make up the component's contents */\r\n\r\n.yfiles-canvascomponent:before {\r\n  content: '__yfiles-stylesheet-loaded-2.3.0.3';\r\n  display: none;\r\n}\r\n\r\n.yfiles-canvascomponent,\r\n.yfiles-svgpanel {\r\n  position: relative;\r\n}\r\n\r\n.yfiles-svgpanel {\r\n  /*\r\n    For exact label size measurement, use the below property\r\n    to emphasize geometric precision over legibility and rendering speed.\r\n  */\r\n  /* text-rendering: geometricPrecision; */\r\n}\r\n\r\n/* Layout the components of a CanvasComponent in a grid */\r\n\r\n.yfiles-canvascomponent {\r\n  position: relative;\r\n  overflow: hidden;\r\n  -ms-touch-action: none;\r\n  touch-action: none;\r\n  /* prevent selecting text by double click */\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-svgpanel {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n/* this is a dummy animation that is used for detecting element insertion into the DOM */\r\n.yfiles-resize-sensor .yfiles-resize-sensor-expand {\r\n  animation-duration: 0.001s;\r\n  animation-name: yfiles-dom-sensor-inserted;\r\n}\r\n\r\n@keyframes yfiles-dom-sensor-inserted {\r\n  from {\r\n    opacity: 0.99;\r\n  }\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n/* Style the scrollbars */\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar.yfiles-scrollbar-vertical {\r\n  background: #eee;\r\n  width: 15px;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar.yfiles-scrollbar-horizontal {\r\n  background: #eee;\r\n  height: 15px;\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar.yfiles-scrollbar-vertical div {\r\n  /* set the size to all inner elements as well to ensure that none accidentally enlarges the scrollbar */\r\n  width: 15px;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar.yfiles-scrollbar-horizontal div {\r\n  /* set the size to all inner elements as well to ensure that none accidentally enlarges the scrollbar */\r\n  height: 15px;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button.yfiles-button-left {\r\n  background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2215%22%20height%3D%2215%22%3E%3Cpath%20d%3D%22M5%207.5%20L10%204%20L10%2011%20Z%22/%3E%3C/svg%3E');\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button.yfiles-button-right {\r\n  background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2215%22%20height%3D%2215%22%3E%3Cpath%20d%3D%22M5%204%20L10%207.5%20L5%2011%20Z%22/%3E%3C/svg%3E');\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button.yfiles-button-up {\r\n  background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2215%22%20height%3D%2215%22%3E%3Cpath%20d%3D%22M4%2010%20L7.5%205%20L11%2010%20Z%22/%3E%3C/svg%3E');\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button.yfiles-button-down {\r\n  background: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2215%22%20height%3D%2215%22%3E%3Cpath%20d%3D%22M4%205%20L11%205%20L7.5%2010%20Z%22/%3E%3C/svg%3E');\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button:not(.yfiles-button-disabled):hover {\r\n  background-color: #bbb;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button.yfiles-button-disabled {\r\n  opacity: 0.3;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar,\r\n.yfiles-canvascomponent .yfiles-scrollbar-range,\r\n.yfiles-canvascomponent .yfiles-scrollbar-range-content {\r\n  background-color: transparent;\r\n}\r\n\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-vertical\r\n  .yfiles-scrollbar-slider {\r\n  border: none;\r\n  background: #cccccc;\r\n  border-radius: 0;\r\n  width: 15px;\r\n}\r\n\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-horizontal\r\n  .yfiles-scrollbar-slider {\r\n  border: none;\r\n  background: #cccccc;\r\n  border-radius: 0;\r\n  height: 15px;\r\n}\r\n\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-horizontal\r\n  .yfiles-scrollbar-slider:hover,\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-vertical\r\n  .yfiles-scrollbar-slider:hover {\r\n  background: #bbb;\r\n}\r\n\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-horizontal\r\n  .yfiles-scrollbar-slider\r\n  .yfiles-scrollbar-slider-dragging,\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-vertical\r\n  .yfiles-scrollbar-slider\r\n  .yfiles-scrollbar-slider-dragging {\r\n  background: #9b9b9b;\r\n}\r\n\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar\r\n  .yfiles-button:not(.yfiles-button-disabled).yfiles-scrollbar-button-down {\r\n  background-color: #9b9b9b;\r\n}\r\n\r\n/* Layout the scrollbars */\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar div {\r\n  overflow: hidden;\r\n  -webkit-box-sizing: border-box;\r\n  -moz-box-sizing: border-box;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar-content {\r\n  cursor: default;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar > div {\r\n  position: absolute;\r\n}\r\n\r\n.yfiles-canvascomponent\r\n  .yfiles-scrollbar\r\n  .yfiles-scrollbar-range.yfiles-scrollbar-range-horizontal {\r\n  left: 15px;\r\n  right: 15px;\r\n  top: 0;\r\n  bottom: 0;\r\n  height: 15px;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-scrollbar-range.yfiles-scrollbar-range-vertical {\r\n  width: 15px;\r\n  left: 0;\r\n  right: 0;\r\n  top: 15px;\r\n  bottom: 15px;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-scrollbar-range-content,\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-scrollbar-slider-content {\r\n  /* set maximum size in both dimension and override for specific elements if required */\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button {\r\n  color: #000;\r\n  width: 15px;\r\n  height: 15px;\r\n  font-size: 10px;\r\n  line-height: 15px;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  position: absolute;\r\n  border: none;\r\n  border-radius: 0;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button-left {\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button-right {\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button-up {\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-scrollbar .yfiles-button-down {\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n}\r\n\r\n/* Tooltip styling and transition */\r\n.yfiles-tooltip {\r\n  font-size: 10pt;\r\n  background-color: #ffffd0;\r\n  border: 1px solid black;\r\n  padding: 2px;\r\n  position: absolute;\r\n  overflow: visible;\r\n  z-index: 1070;\r\n}\r\n.yfiles-tooltip-entering {\r\n  transition: opacity 0.2s ease-in;\r\n}\r\n.yfiles-tooltip-enter {\r\n  opacity: 0;\r\n}\r\n.yfiles-tooltip-enter-to {\r\n  opacity: 1;\r\n}\r\n.yfiles-tooltip-leaving {\r\n  transition: opacity 0.2s ease-out;\r\n}\r\n.yfiles-tooltip-leave {\r\n  opacity: 1;\r\n}\r\n.yfiles-tooltip-leave-to {\r\n  opacity: 0;\r\n}\r\n\r\n/* Misc styling */\r\n.yfiles-canvascomponent,\r\n.yfiles-canvascomponent-svg {\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n\r\n.yfiles-canvascomponent-svg {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: block;\r\n}\r\n\r\n.yfiles-dropshadow-image {\r\n  pointer-events: none;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-labeleditbox-container {\r\n  border: 1px solid black;\r\n  background-color: white;\r\n  padding: 2px;\r\n}\r\n.yfiles-labeleditbox-container-enter {\r\n  opacity: 0;\r\n}\r\n.yfiles-labeleditbox-container-enter-to {\r\n  opacity: 1;\r\n}\r\n.yfiles-labeleditbox-container-entering {\r\n  transition: opacity 0.1s ease-in;\r\n}\r\n.yfiles-labeleditbox-container-leave {\r\n  opacity: 1;\r\n}\r\n.yfiles-labeleditbox-container-leave-to {\r\n  opacity: 0;\r\n}\r\n.yfiles-labeleditbox-container-leaving {\r\n  transition: opacity 0.1s ease-out;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-labeleditbox-container:focus {\r\n  outline: none;\r\n}\r\n\r\n.yfiles-canvascomponent .yfiles-labeleditbox {\r\n  box-sizing: border-box; /* box model is crucial for measuring */\r\n  resize: none;\r\n  overflow: hidden;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: transparent;\r\n  border: 0 none;\r\n  padding: 0;\r\n  line-height: normal;\r\n  font-family: sans-serif;\r\n  font-size: 10pt;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  font-variant: normal;\r\n  font-weight: 400;\r\n  text-decoration: none;\r\n  text-transform: none;\r\n  letter-spacing: normal;\r\n  word-spacing: 0;\r\n  outline: none;\r\n  white-space: pre;\r\n}\r\n\r\n.yfiles-collapsebutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.yfiles-overlaypanel {\r\n  -webkit-user-select: text;\r\n  -moz-user-select: text;\r\n  -ms-user-select: text;\r\n  user-select: text;\r\n}\r\n\r\n.yfiles-canvascomponent ::-webkit-scrollbar,\r\n.yfiles-resize-sensor ::-webkit-scrollbar {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/* Prevent global styles from negatively affecting yFiles components */\r\n.yfiles-canvascomponent,\r\n.yfiles-tooltip,\r\n.yfiles-canvascomponent .yfiles-labeleditbox-container {\r\n  box-sizing: content-box;\r\n  line-height: 1;\r\n}\r\n\r\n/* Accessibility: Hide live region */\r\n.yfiles-sr-only {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  padding: 0;\r\n  margin: -1px;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n  border: 0;\r\n}\r\n";
n(css,{});

class Plugin extends PanelPlugin {
	static getRegistrationMeta() {
		return {
			type: 'panel',
			title: 'Панель полотна примитивов',
			name: 'LiveDashPanel',
		};
	}

	constructor(guid, selector) {
		super();
		this.styleSystem = new StyleSystemAdapter();
		const eventSystem = new EventSystemAdapter();
		eventSystem.subscribeEventNameByCallback('ThemeUpdate', this.updateTheme.bind(this));

		this.primitives = {};
		const {default: Vue} = this.getDependence('Vue');
		const {default: yFiles} = this.getDependence('yFiles');
		const pluginInstance = this;

		const requirements = {
			guid,
			eventSystem,
			yFiles,
			pluginInstance,
		};

		this.instance = new Vue({
			render: h => h(__vue_component__$1),
			data() {
				return requirements;
			},
		}).$mount(selector);
	}

	updatePrimitiveData(primtiveName, data) {
		this.primitives[primtiveName].updateData(data);
	}

	updateTheme() {
		this.styleSystem.setVariablesToElement(this.instance.$el, this.styleSystem.getCurrentTheme());
	}
}

export { Plugin };
