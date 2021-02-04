class DragAndDropPanel {
  /**
   * Create a new style panel in the given element.
   * @param {HTMLElement} div The element that will display the palette items.
   * @param {boolean} passiveSupported Whether or not the browser supports active and passive event listeners.
   */
  constructor(div, passiveSupported, yfiles) {
    this.divField = div;
    this.$maxItemWidth = 150;
    this.passiveSupported = !!passiveSupported;
    this.$copyNodeLabels = true;
    this.GraphComponent = yfiles.GraphComponent;
    this.IEdge = yfiles.IEdge;
    this.ILabel = yfiles.ILabel;
    this.IListEnumerable = yfiles.IListEnumerable;
    this.INode = yfiles.INode;
    this.Insets = yfiles.Insets;
    this.IPort = yfiles.IPort;
    this.IStripe = yfiles.IStripe;
    this.ListEnumerable = yfiles.ListEnumerable;
    this.Point = yfiles.Point;
    this.Rect = yfiles.Rect;
    this.SimpleNode = yfiles.SimpleNode;
    this.SvgExport = yfiles.SvgExport;
    this.VoidNodeStyle = yfiles.VoidNodeStyle;
  }

  /**
   * The main element of this panel.
   */
  get div() {
    return this.divField;
  }

  set div(div) {
    this.divField = div;
  }

  /**
   * The desired maximum width of each item. This value is used to decide whether or not a
   * visualization must be scaled down.
   */
  get maxItemWidth() {
    return this.$maxItemWidth;
  }

  set maxItemWidth(width) {
    this.$maxItemWidth = width;
  }

  /**
   * A callback that is called then the user presses the mouse button on an item.
   * It should start the actual drag and drop operation.
   */
  get beginDragCallback() {
    return this.$beginDragCallback;
  }

  set beginDragCallback(callback) {
    this.$beginDragCallback = callback;
  }

  /**
   * Whether the labels of the DnD node visual should be transferred to the created node or discarded.
   * @returns {Boolean}
   */
  get copyNodeLabels() {
    return this.$copyNodeLabels;
  }

  set copyNodeLabels(value) {
    this.$copyNodeLabels = value;
  }

  /**
   * Adds the items provided by the given factory to this palette.
   * This method delegates the creation of the visualization of each node
   * to createNodeVisual.
   */
  populatePanel(itemFactory, graphC) {
    if (!itemFactory) {
      return;
    }
    // Create the nodes that specify the visualizations for the panel.
    const items = itemFactory();

    // Convert the nodes into plain visualizations
    const graphComponent = new this.GraphComponent();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const modelItem =
        this.INode.isInstance(item) || this.IEdge.isInstance(item) ? item : item.element;
      const visual = this.INode.isInstance(modelItem)
        ? this.createNodeVisual(item, graphComponent)
        : this.createEdgeVisual(item, graphComponent);
      this.addPointerDownListener(modelItem, visual, this.beginDragCallback);
      this.div.appendChild(visual);
    }
  }

  /**
   * Creates an element that contains the visualization of the given node.
   * This method is used by populatePanel to create the visualization
   * for each node provided by the factory.
   * @return {HTMLDivElement}
   */
  createNodeVisual(original, graphComponent) {
    const graph = graphComponent.graph;
    graph.clear();

    const originalNode = this.INode.isInstance(original) ? original : original.element;
    const node = graph.createNode(
      originalNode.layout.toRect(),
      originalNode.style,
      originalNode.tag
    );
    originalNode.labels.forEach(label => {
      graph.addLabel(
        node,
        label.text,
        label.layoutParameter,
        label.style,
        label.preferredSize,
        label.tag
      );
    });
    originalNode.ports.forEach(port => {
      graph.addPort(node, port.locationParameter, port.style, port.tag);
    });
    this.updateViewport(graphComponent);

    return this.exportAndWrap(graphComponent, original.tooltip);
  }

  /**
   * Creates an element that contains the visualization of the given edge.
   * @return {HTMLDivElement}
   */
  createEdgeVisual(original, graphComponent) {
    const graph = graphComponent.graph;
    graph.clear();

    const originalEdge = this.IEdge.isInstance(original) ? original : original.element;

    const n1 = graph.createNode(new this.Rect(0, 10, 0, 0), this.VoidNodeStyle.INSTANCE);
    const n2 = graph.createNode(new this.Rect(50, 40, 0, 0), this.VoidNodeStyle.INSTANCE);
    const edge = graph.createEdge(n1, n2, originalEdge.style);
    graph.addBend(edge, new this.Point(25, 10));
    graph.addBend(edge, new this.Point(25, 40));

    this.updateViewport(graphComponent);

    // provide some more insets to account for the arrow heads
    graphComponent.updateContentRect(new this.Insets(5));

    return this.exportAndWrap(graphComponent, original.tooltip);
  }

  updateViewport(graphComponent) {
    const graph = graphComponent.graph;
    let viewport = this.Rect.EMPTY;
    graph.nodes.forEach(node => {
      viewport = this.Rect.add(viewport, node.layout.toRect());
      node.labels.forEach(label => {
        viewport = this.Rect.add(viewport, label.layout.bounds);
      });
    });
    graph.edges.forEach(edge => {
      viewport = viewport.add(edge.sourcePort.location);
      viewport = viewport.add(edge.targetPort.location);
      edge.bends.forEach(bend => {
        viewport = viewport.add(bend.location.toPoint());
      });
    });
    viewport = viewport.getEnlarged(5);
    graphComponent.contentRect = viewport;
    graphComponent.zoomTo(viewport);
  }

  /**
   * Exports and wraps the original visualization in an HTML element.
   * @return {HTMLDivElement}
   */
  exportAndWrap(graphComponent, tooltip) {
    const exporter = new this.SvgExport(graphComponent.contentRect);
    exporter.margins = new this.Insets(5);

    exporter.scale = exporter.calculateScaleForWidth(
      Math.min(this.maxItemWidth, graphComponent.contentRect.width)
    );
    const visual = exporter.exportSvg(graphComponent);

    // Firefox does not display the SVG correctly because of the clip - so we remove it.
    visual.removeAttribute('clip-path');

    const div = document.createElement('div');
    div.setAttribute('class', 'dndPanelItem');
    div.appendChild(visual);
    div.style.setProperty('width', visual.getAttribute('width'), '');
    div.style.setProperty('height', visual.getAttribute('height'), '');
    div.style.setProperty('touch-action', 'none');
    try {
      div.style.setProperty('cursor', 'grab', '');
    } catch (e) {
      /* IE9 doesn't support grab cursor */
    }
    if (tooltip) {
      div.title = tooltip;
    }
    return div;
  }

  /**
   * Adds a mousedown listener to the given element that starts the drag operation.
   */
  addPointerDownListener(item, element, callback) {
    if (!callback) {
      return;
    }

    // the actual drag operation
    const doDragOperation = () => {
      if (typeof this.IStripe !== 'undefined' && this.IStripe.isInstance(item.tag)) {
        // If the dummy node has a stripe as its tag, we use the stripe directly
        // This allows StripeDropInputMode to take over
        callback(element, item.tag);
      } else if (this.ILabel.isInstance(item.tag) || this.IPort.isInstance(item.tag)) {
        callback(element, item.tag);
      } else if (this.IEdge.isInstance(item)) {
        callback(element, item);
      } else {
        // Otherwise, we just use the node itself and let (hopefully) NodeDropInputMode take over
        const simpleNode = new this.SimpleNode();
        simpleNode.layout = item.layout;
        simpleNode.style = item.style.clone();
        simpleNode.tag = item.tag;
        simpleNode.labels = this.$copyNodeLabels ? item.labels : IListEnumerable.EMPTY;
        if (item.ports.size > 0) {
          simpleNode.ports = new this.ListEnumerable(item.ports);
        }
        callback(element, simpleNode);
      }
    };

    element.addEventListener(
      'mousedown',
      evt => {
        if (evt.button !== 0) {
          return;
        }
        doDragOperation();
        evt.preventDefault();
      },
      false
    );

    const touchStartListener = evt => {
      doDragOperation();
      evt.preventDefault();
    };

    if (window.PointerEvent !== undefined) {
      element.addEventListener(
        'pointerdown',
        evt => {
          if (evt.pointerType === 'touch' || evt.pointerType === 'pen') {
            touchStartListener(evt);
          }
        },
        true
      );
    } else if (window.MSPointerEvent !== undefined) {
      element.addEventListener(
        'MSPointerDown',
        evt => {
          if (
            evt.pointerType === evt.MSPOINTER_TYPE_TOUCH ||
            evt.pointerType === evt.MSPOINTER_TYPE_PEN
          ) {
            touchStartListener(evt);
          }
        },
        true
      );
    } else {
      element.addEventListener(
        'touchstart',
        touchStartListener,
        this.passiveSupported ? { passive: false } : false
      );
    }
  }
}

function addClass(e, className) {
  const classes = e.getAttribute('class');
  if (classes === null || classes === '') {
    e.setAttribute('class', className);
  } else if (!hasClass(e, className)) {
    e.setAttribute('class', `${classes} ${className}`);
  }
  return e;
}

/**
 * @param {Element} e
 * @param {string} className
 * @returns {Element}
 */
function removeClass(e, className) {
  const classes = e.getAttribute('class');
  if (classes !== null && classes !== '') {
    if (classes === className) {
      e.setAttribute('class', '');
    } else {
      const result = classes
        .split(' ')
        .filter(s => s !== className)
        .join(' ');
      e.setAttribute('class', result);
    }
  }
  return e;
}

/**
 * @param {Element} e
 * @param {string} className
 * @returns {boolean}
 */
function hasClass(e, className) {
  const classes = e.getAttribute('class') || '';
  const r = new RegExp(`\\b${className}\\b`, '');
  return r.test(classes);
}

//

var script = {
  name: 'PrimitiveLibrary',
  computed: {
    groups() {
      let groups = [];
      this.primitives.forEach(primitive => groups.push(...primitive.groups));
      return [...new Set(groups)];
    },
  },
  data() {
    return {
      dndPanel: null,
      primitives: [],
    };
  },
  mounted() {
    const primitives = [];
    this.$root.extensions.forEach(extension =>
      primitives.push(...extension.plugin.getExtensionInfo())
    );

    this.primitives = primitives;

    const {
      SimpleNode,
      ImageNodeStyle,
      Rect,
      ILabel,
      LabelDropInputMode,
      DragDropEffects,
      IPort,
      PortDropInputMode,
      IEdge,
      DragSource,
      DragDropItem,
      NodeDropInputMode,
    } = this.$root.yFiles;

    // // TODO: Remove $nextTick()
    this.$nextTick(() =>
      this.groups.forEach(group => {
        let dndPanel = new DragAndDropPanel(
          this.$refs[`dnd-panel-${group}`][0],
          null,
          this.$root.yFiles
        );
        let createDnDPanelItems = () => {
          const itemContainer = [];
          this.primitives.forEach(prim => {
            if (prim.groups.includes(group)) {
              const imageStyleNode = new SimpleNode();
              imageStyleNode.layout = new Rect(0, 0, 35, 35);
              imageStyleNode.style = new ImageNodeStyle(prim.icon);
              imageStyleNode.tag = { extensionName: prim.extensionName, primitiveName: prim.name };
              itemContainer.push({ element: imageStyleNode, tooltip: prim.name });
            }
          });
          return itemContainer;
        };

        dndPanel.beginDragCallback = (element, data) => {
          const dragPreview = element.cloneNode(true);
          dragPreview.style.margin = '0';
          let dragSource;
          if (ILabel.isInstance(data)) {
            dragSource = LabelDropInputMode.startDrag(
              element,
              data,
              DragDropEffects.ALL,
              true,
              dragPreview
            );
          } else if (IPort.isInstance(data)) {
            dragSource = PortDropInputMode.startDrag(
              element,
              data,
              DragDropEffects.ALL,
              true,
              dragPreview
            );
          } else if (IEdge.isInstance(data)) {
            new DragSource(element).startDrag(
              new DragDropItem(IEdge.$class.name, data),
              DragDropEffects.ALL
            );
          } else {
            dragSource = NodeDropInputMode.startDrag(
              element,
              data,
              DragDropEffects.ALL,
              true,
              dragPreview
            );
          }

          // let the GraphComponent handle the preview rendering if possible
          if (dragSource) {
            dragSource.addQueryContinueDragListener((src, args) => {
              if (args.dropTarget === null) {
                removeClass(dragPreview, 'hidden');
              } else {
                addClass(dragPreview, 'hidden');
              }
            });
          }
        };
        dndPanel.populatePanel(createDnDPanelItems, '123');
      })
    );
  },
  methods: {},
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
  return _c(
    "div",
    { staticClass: "primitive-library-container" },
    _vm._l(_vm.groups, function(group) {
      return _c("details", { key: group }, [
        _c("summary", [
          _c("p", [_vm._v(_vm._s(group))]),
          _vm._v(" "),
          _c("i", { staticClass: "fas fa-arrow-down arrow-icon" })
        ]),
        _vm._v(" "),
        _c("div", {
          ref: "dnd-panel-" + group,
          refInFor: true,
          staticClass: "dnd-panel"
        })
      ])
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-20283966_0", { source: "\n*[data-v-20283966],[data-v-20283966]::after,[data-v-20283966]::before {\n  -webkit-box-sizing: inherit;\n  box-sizing: inherit;\n  font-family: 'Gill Sans', sans-serif;\n}\nhtml[data-v-20283966],\nbody[data-v-20283966],\nul[data-v-20283966],\nol[data-v-20283966] {\n  margin: 0;\n  padding: 0;\n}\n.primitive-library-container[data-v-20283966] {\n  height: 100%;\n  width: 100%;\n  background-color: var(--main-bg-color-panel);\n}\ndiv.panel[data-v-20283966] {\n  max-width: 65%;\n  margin: auto;\n  margin-top: calc(5% - 0px);\n}\ndetails[data-v-20283966] {\n  background: var(--secondary-bg-color-panel);\n  font-size: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);\n  display: flex;\n}\ndetails[open] summary ~ *[data-v-20283966] {\n  animation: sweep-data-v-20283966 0.5s ease-in-out;\n}\n@keyframes sweep-data-v-20283966 {\n0% {\n    opacity: 0;\n    margin-left: -10px;\n}\n100% {\n    opacity: 1;\n    margin-left: 0px;\n}\n}\ndetails div.content[data-v-20283966] {\n  padding: 0px 24px 24px 24px;\n}\n.primitive-icon[data-v-20283966] {\n  text-align: center;\n  margin: 5px;\n  border: 2px solid #000;\n  border-radius: 5px;\n}\n.primitive-icon > img[data-v-20283966] {\n  margin-top: 3px;\n}\n.primitive-icon > p[data-v-20283966] {\n  margin: 3px;\n}\ndetails[open][data-v-20283966] {\n  border: none;\n  border-radius: 2px;\n}\ndetails[open] .arrow-icon[data-v-20283966] {\n  transform: rotate(180deg);\n}\ndetails[open][data-v-20283966]:first-child {\n  border: none;\n}\ndetails[open][data-v-20283966]:last-child {\n  border: none;\n}\n.arrow-icon[data-v-20283966] {\n  transition: transform 0.3s;\n  transform: rotate(0deg);\n}\nsummary[data-v-20283966] {\n  outline: none;\n  cursor: pointer;\n  padding: 10px 20px;\n  background-color: var(--secondary-bg-color-panel);\n  color: var(--text-color-light);\n  position: relative;\n  font-size: 15px;\n  display: flex;\n  justify-content: space-between;\n}\nsummary[data-v-20283966]:hover {\n  background: var(--detail-hover);\n}\nsummary[data-v-20283966]::-webkit-details-marker {\n  display: none;\n}\nsummary > p[data-v-20283966] {\n  font-size: 1rem;\n  margin: 0;\n}\n.dnd-panel[data-v-20283966] {\n  padding: 10px;\n  display: flex;\n  flex-wrap: wrap;\n  background-color: var(--secondary-bg-color-panel);\n}\n", map: {"version":3,"sources":["/home/isg-user/Repos/DTCD/DTCD-PrimitiveLibraryPanel/src/components/PrimitivePanel.vue"],"names":[],"mappings":";AAkIA;EAGA,2BAAA;EACA,mBAAA;EACA,oCAAA;AACA;AACA;;;;EAIA,SAAA;EACA,UAAA;AACA;AACA;EACA,YAAA;EACA,WAAA;EACA,4CAAA;AACA;AACA;EACA,cAAA;EACA,YAAA;EACA,0BAAA;AACA;AACA;EACA,2CAAA;EACA,eAAA;EACA,gCAAA;EACA,sEAAA;EACA,aAAA;AACA;AACA;EACA,iDAAA;AACA;AACA;AACA;IACA,UAAA;IACA,kBAAA;AACA;AACA;IACA,UAAA;IACA,gBAAA;AACA;AACA;AACA;EACA,2BAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,sBAAA;EACA,kBAAA;AACA;AACA;EACA,eAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,YAAA;EACA,kBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,0BAAA;EACA,uBAAA;AACA;AACA;EACA,aAAA;EACA,eAAA;EACA,kBAAA;EACA,iDAAA;EACA,8BAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;EACA,8BAAA;AACA;AACA;EACA,+BAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,eAAA;EACA,SAAA;AACA;AACA;EACA,aAAA;EACA,aAAA;EACA,eAAA;EACA,iDAAA;AACA","file":"PrimitivePanel.vue","sourcesContent":["<template>\n  <div class=\"primitive-library-container\">\n    <details v-for=\"group in groups\" :key=\"group\">\n      <summary>\n        <p>{{ group }}</p>\n        <i class=\"fas fa-arrow-down arrow-icon\"></i>\n      </summary>\n      <div :ref=\"`dnd-panel-${group}`\" class=\"dnd-panel\"></div>\n    </details>\n  </div>\n</template>\n\n<script>\nimport { DragAndDropPanel, addClass, removeClass } from '../libs/dndPanel';\n\nexport default {\n  name: 'PrimitiveLibrary',\n  computed: {\n    groups() {\n      let groups = [];\n      this.primitives.forEach(primitive => groups.push(...primitive.groups));\n      return [...new Set(groups)];\n    },\n  },\n  data() {\n    return {\n      dndPanel: null,\n      primitives: [],\n    };\n  },\n  mounted() {\n    const primitives = [];\n    this.$root.extensions.forEach(extension =>\n      primitives.push(...extension.plugin.getExtensionInfo())\n    );\n\n    this.primitives = primitives;\n\n    const {\n      SimpleNode,\n      ImageNodeStyle,\n      Rect,\n      ILabel,\n      LabelDropInputMode,\n      DragDropEffects,\n      IPort,\n      PortDropInputMode,\n      IEdge,\n      DragSource,\n      DragDropItem,\n      NodeDropInputMode,\n    } = this.$root.yFiles;\n\n    // // TODO: Remove $nextTick()\n    this.$nextTick(() =>\n      this.groups.forEach(group => {\n        let dndPanel = new DragAndDropPanel(\n          this.$refs[`dnd-panel-${group}`][0],\n          null,\n          this.$root.yFiles\n        );\n        let createDnDPanelItems = () => {\n          const itemContainer = [];\n          this.primitives.forEach(prim => {\n            if (prim.groups.includes(group)) {\n              const imageStyleNode = new SimpleNode();\n              imageStyleNode.layout = new Rect(0, 0, 35, 35);\n              imageStyleNode.style = new ImageNodeStyle(prim.icon);\n              imageStyleNode.tag = { extensionName: prim.extensionName, primitiveName: prim.name };\n              itemContainer.push({ element: imageStyleNode, tooltip: prim.name });\n            }\n          });\n          return itemContainer;\n        };\n\n        dndPanel.beginDragCallback = (element, data) => {\n          const dragPreview = element.cloneNode(true);\n          dragPreview.style.margin = '0';\n          let dragSource;\n          if (ILabel.isInstance(data)) {\n            dragSource = LabelDropInputMode.startDrag(\n              element,\n              data,\n              DragDropEffects.ALL,\n              true,\n              dragPreview\n            );\n          } else if (IPort.isInstance(data)) {\n            dragSource = PortDropInputMode.startDrag(\n              element,\n              data,\n              DragDropEffects.ALL,\n              true,\n              dragPreview\n            );\n          } else if (IEdge.isInstance(data)) {\n            new DragSource(element).startDrag(\n              new DragDropItem(IEdge.$class.name, data),\n              DragDropEffects.ALL\n            );\n          } else {\n            dragSource = NodeDropInputMode.startDrag(\n              element,\n              data,\n              DragDropEffects.ALL,\n              true,\n              dragPreview\n            );\n          }\n\n          // let the GraphComponent handle the preview rendering if possible\n          if (dragSource) {\n            dragSource.addQueryContinueDragListener((src, args) => {\n              if (args.dropTarget === null) {\n                removeClass(dragPreview, 'hidden');\n              } else {\n                addClass(dragPreview, 'hidden');\n              }\n            });\n          }\n        };\n        dndPanel.populatePanel(createDnDPanelItems, '123');\n      })\n    );\n  },\n  methods: {},\n};\n</script>\n\n<style scoped>\n*,\n::after,\n::before {\n  -webkit-box-sizing: inherit;\n  box-sizing: inherit;\n  font-family: 'Gill Sans', sans-serif;\n}\nhtml,\nbody,\nul,\nol {\n  margin: 0;\n  padding: 0;\n}\n.primitive-library-container {\n  height: 100%;\n  width: 100%;\n  background-color: var(--main-bg-color-panel);\n}\ndiv.panel {\n  max-width: 65%;\n  margin: auto;\n  margin-top: calc(5% - 0px);\n}\ndetails {\n  background: var(--secondary-bg-color-panel);\n  font-size: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);\n  display: flex;\n}\ndetails[open] summary ~ * {\n  animation: sweep 0.5s ease-in-out;\n}\n@keyframes sweep {\n  0% {\n    opacity: 0;\n    margin-left: -10px;\n  }\n  100% {\n    opacity: 1;\n    margin-left: 0px;\n  }\n}\ndetails div.content {\n  padding: 0px 24px 24px 24px;\n}\n.primitive-icon {\n  text-align: center;\n  margin: 5px;\n  border: 2px solid #000;\n  border-radius: 5px;\n}\n.primitive-icon > img {\n  margin-top: 3px;\n}\n.primitive-icon > p {\n  margin: 3px;\n}\ndetails[open] {\n  border: none;\n  border-radius: 2px;\n}\ndetails[open] .arrow-icon {\n  transform: rotate(180deg);\n}\ndetails[open]:first-child {\n  border: none;\n}\ndetails[open]:last-child {\n  border: none;\n}\n.arrow-icon {\n  transition: transform 0.3s;\n  transform: rotate(0deg);\n}\nsummary {\n  outline: none;\n  cursor: pointer;\n  padding: 10px 20px;\n  background-color: var(--secondary-bg-color-panel);\n  color: var(--text-color-light);\n  position: relative;\n  font-size: 15px;\n  display: flex;\n  justify-content: space-between;\n}\nsummary:hover {\n  background: var(--detail-hover);\n}\nsummary::-webkit-details-marker {\n  display: none;\n}\nsummary > p {\n  font-size: 1rem;\n  margin: 0;\n}\n.dnd-panel {\n  padding: 10px;\n  display: flex;\n  flex-wrap: wrap;\n  background-color: var(--secondary-bg-color-panel);\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-20283966";
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
  name: 'PrimitiveLibraryPanel',
  components: { PrimitivePanel: __vue_component__ },
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
    { staticClass: "primitve-library-panel" },
    [_c("PrimitivePanel")],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-36207b46_0", { source: "\n.primitve-library-panel[data-v-36207b46] {\n  height: 100%;\n}\n", map: {"version":3,"sources":["/home/isg-user/Repos/DTCD/DTCD-PrimitiveLibraryPanel/src/App.vue"],"names":[],"mappings":";AAgBA;EACA,YAAA;AACA","file":"App.vue","sourcesContent":["<template>\n  <div class=\"primitve-library-panel\">\n    <PrimitivePanel />\n  </div>\n</template>\n\n<script>\nimport PrimitivePanel from './components/PrimitivePanel.vue';\n\nexport default {\n  name: 'PrimitiveLibraryPanel',\n  components: { PrimitivePanel },\n};\n</script>\n\n<style scoped>\n.primitve-library-panel {\n  height: 100%;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-36207b46";
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

class DataCADPlugin extends PanelPlugin {
  static getRegistrationMeta() {
    return {
      type: 'panel',
      title: 'Панель библиотеки примитивов',
      name: 'PrimitiveLibraryPanel',
    };
  }

  constructor(guid, selector) {
    super();
    const { default: Vue } = this.getDependence('Vue');
    const { default: yFiles } = this.getDependence('yFiles');
    const extensions = this.getExtensions('PrimitiveLibraryPanel');

    this.styleSystem = new StyleSystemAdapter();
    this.eventSystem = new EventSystemAdapter();

    this.eventSystem.subscribeEventNameByCallback('ThemeUpdate', this.updateTheme.bind(this));

    this.instance = new Vue({
      render: h => h(__vue_component__$1),
      data() {
        return {
          guid,
          yFiles,
          extensions,
        };
      },
    }).$mount(selector);
  }

  updateTheme() {
    this.styleSystem.setVariablesToElement(this.instance.$el, this.styleSystem.getCurrentTheme());
  }
}

export { DataCADPlugin };
