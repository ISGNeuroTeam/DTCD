var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M407%2c76H105C47.103%2c76%2c0%2c123.103%2c0%2c181v150c0%2c57.897%2c47.103%2c105%2c105%2c105h302c57.897%2c0%2c105-47.103%2c105-105V181 C512%2c123.103%2c464.897%2c76%2c407%2c76z M482%2c331c0%2c41.355-33.645%2c75-75%2c75H105c-41.355%2c0-75-33.645-75-75V181c0-41.355%2c33.645-75%2c75-75 h302c41.355%2c0%2c75%2c33.645%2c75%2c75V331z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

class ObjectModelPrimitive {
  static getPrimitiveInfo() {
    return {
      title: 'Узел',
      name: 'SimpleNode',
      groups: ['Node', 'Common'],
      icon: img,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const instance = new this.yfiles.SimpleNode();
    instance.style = new this.yfiles.ShapeNodeStyle({
      shape: this.yfiles.ShapeNodeShape.ROUND_RECTANGLE,
      stroke: 'rgb(255, 140, 0)',
      fill: 'rgb(255, 140, 0)',
    });
    instance.layout = new this.yfiles.Rect(0, 0, 40, 40);
    return instance;
  }
}

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.001 512.001' style='enable-background:new 0 0 512.001 512.001%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M506.143%2c5.859c-7.811-7.811-20.475-7.811-28.285%2c0l-472%2c472c-7.811%2c7.811-7.811%2c20.474%2c0%2c28.284 c3.905%2c3.906%2c9.024%2c5.858%2c14.142%2c5.858s10.237-1.953%2c14.143-5.858l472-472C513.954%2c26.333%2c513.954%2c13.67%2c506.143%2c5.859z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

class ObjectModelPrimitive$1 {
  static getPrimitiveInfo() {
    return {
      title: 'Связь',
      name: 'SimpleEdge',
      groups: ['Common', 'Edge'],
      icon: img$1,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const instance = new this.yfiles.SimpleEdge();
    instance.style = new this.yfiles.PolylineEdgeStyle();
    return instance;
  }
}

var img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M458.667%2c0H323.349c-25.643%2c0-49.749%2c9.984-67.883%2c28.117L18.197%2c265.387C6.464%2c277.12%2c0%2c292.715%2c0%2c309.376 c0%2c16.576%2c6.464%2c32.171%2c18.197%2c43.904L158.72%2c493.803C170.453%2c505.536%2c186.048%2c512%2c202.709%2c512 c16.576%2c0%2c32.171-6.464%2c43.904-18.197l237.269-237.269C502.016%2c238.4%2c512%2c214.293%2c512%2c188.651V53.333 C512%2c23.936%2c488.064%2c0%2c458.667%2c0z M490.667%2c188.651c0%2c19.947-7.765%2c38.699-21.845%2c52.779L231.531%2c478.72 c-15.339%2c15.339-42.24%2c15.445-57.707%2c0L33.28%2c338.176c-7.701-7.68-11.947-17.92-11.947-28.885c0-10.88%2c4.245-21.12%2c11.947-28.821 L270.549%2c43.2c14.123-14.101%2c32.853-21.867%2c52.8-21.867h135.317c17.643%2c0%2c32%2c14.357%2c32%2c32V188.651z'/%3e %3c/g%3e%3c/g%3e%3cg%3e %3cg%3e %3cpath d='M394.667%2c64c-29.397%2c0-53.333%2c23.936-53.333%2c53.333c0%2c29.397%2c23.936%2c53.333%2c53.333%2c53.333S448%2c146.731%2c448%2c117.333 C448%2c87.936%2c424.064%2c64%2c394.667%2c64z M394.667%2c149.333c-17.643%2c0-32-14.357-32-32c0-17.643%2c14.357-32%2c32-32s32%2c14.357%2c32%2c32 C426.667%2c134.976%2c412.309%2c149.333%2c394.667%2c149.333z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

class ObjectModelPrimitive$2 {
  static getPrimitiveInfo() {
    return {
      title: 'Надпись',
      name: 'SimpleLabel',
      groups: ['Common', 'Label'],
      icon: img$2,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }
  create(owner) {
    const instance = new this.yfiles.SimpleLabel(owner, 'label');
    return instance;
  }
}

var img$3 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 500 500' style='enable-background:new 0 0 500 500%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M170.667%2c0C76.41%2c0%2c0%2c76.41%2c0%2c170.667s76.41%2c170.667%2c170.667%2c170.667s170.667-76.41%2c170.667-170.667S264.923%2c0%2c170.667%2c0z M170.667%2c298.667c-70.692%2c0-128-57.308-128-128s57.308-128%2c128-128s128%2c57.308%2c128%2c128S241.359%2c298.667%2c170.667%2c298.667z'/%3e %3c/g%3e%3c/g%3e%3c/svg%3e";

class ObjectModelPrimitive$3 {
  static getPrimitiveInfo() {
    return {
      title: 'Порт',
      name: 'SimplePort',
      groups: ['Common'],
      icon: img$3,
    };
  }

  constructor(yFiles) {
    const { SimplePort, Rect } = yFiles.default;
    Object.assign(this, new SimplePort());
  }
}

var img$4 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 18.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 160.607 160.607' style='enable-background:new 0 0 160.607 160.607%3b' xml:space='preserve'%3e%3cpath fill='gray' d='M60.669%2c89.331l35.592-35.592l10.606%2c10.608L71.276%2c99.938L60.669%2c89.331z M131.944%2c39.27l28.663-28.662L150.001%2c0 l-28.663%2c28.662L131.944%2c39.27z M35.593%2c114.407L0.001%2c150l10.606%2c10.607l35.592-35.593L35.593%2c114.407z'/%3e%3c/svg%3e";

class ObjectModelPrimitive$4 {
  static getPrimitiveInfo() {
    return {
      title: 'Связь',
      name: 'DashedEdge',
      groups: ['Edge'],
      icon: img$4,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const instance = new this.yfiles.SimpleEdge();
    instance.style = new this.yfiles.PolylineEdgeStyle({
      stroke: '2px dashed gray',
    });
    return instance;
  }
}

var primitives = [ObjectModelPrimitive, ObjectModelPrimitive$1, ObjectModelPrimitive$2, ObjectModelPrimitive$3, ObjectModelPrimitive$4];

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

/**
 * @typedef {Object} ExtensionInfo
 * @property {String} plugin
 * @property {*} data
 */
class ExtensionPlugin extends AbstractPlugin {
	/**
	 * @static
	 * @return {ExtensionInfo} information about extension
	 */
	static getExtensionInfo() {
		throw new Error('Implement the getExtensionInfo static method!');
	}
}

class DataCADPlugin extends ExtensionPlugin {
  static getRegistrationMeta() {
    return {
      type: 'extension',
      target: ['PrimitiveLibraryPanel', 'LiveDashPanel'],
      title: 'Расширение библиотеки примитивов Test',
      name: 'ExtensionCommonPrimitives',
    };
  }

  static getExtensionInfo() {
    const result = [];
    primitives.forEach(primitive => {
      const primitiveInfo = primitive.getPrimitiveInfo();
      primitiveInfo.extensionName = this.getRegistrationMeta().name;
      primitiveInfo.primitiveName = primitiveInfo.name;
      result.push(primitiveInfo);
    });
    return result;
  }

  constructor() {
    super();

    const { default: yFiles } = this.getDependence('yFiles');

    this.primitives = {};
    primitives.forEach(PrimitiveClass => {
      const { name } = PrimitiveClass.getPrimitiveInfo();
      this.primitives[name] = PrimitiveClass.bind(null, yFiles);
    });
  }
}

export { DataCADPlugin };
