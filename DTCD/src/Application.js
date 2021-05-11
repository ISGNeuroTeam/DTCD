export default class Application {
  #dependencies;
  #plugins;
  #extensions;
  #systems;
  #guids;
  #count;
  #autocomplete;

  constructor() {
    this.#dependencies = {};

    this.#plugins = [];
    this.#extensions = {};

    this.#systems = {};

    this.#guids = {};
    this.#count = 0;
    this.#autocomplete = {};

    window.Application = this;
  }

  get autocomplete() {
    return this.#autocomplete;
  }

  async start() {
    await this.#fillPlugins();

    await this.#fillDependencies();

    let systems = this.#plugins
      .filter(plg => plg.type === 'core')
      .sort((prevPlg, nextPlg) => nextPlg.priority - prevPlg.priority)
      .map(plg => plg.name);

    for (let i = 0; i < systems.length; i++) {
      const instance = this.installPlugin(systems[i]);
      if (instance.init) {
        await instance.init();
      }
      this.#systems[systems[i]] = instance;
    }
    this.#defaultSubscriptions();
  }

  async #fillPlugins() {
    // Getting list of all plugins
    const pluginList = await (await fetch('/plugins/plugins.json')).json();

    // Getting each module from server as module
    const modules = await Promise.all(pluginList.map(pathToFile => import('/plugins/' + pathToFile)));

    // Plugin is what with the getRegistrationMeta method
    modules.forEach((module, index) => {
      let isPlugin = false;

      for (let key in module) {
        if (module[key].getRegistrationMeta) {
          // set flag isPlugin on module
          isPlugin = true;

          const plugin = module[key];
          const meta = plugin.getRegistrationMeta();
          switch (meta.type) {
            // If type of plugin is extension add it to private property #extensions of class.
            case 'extension':
              // Target property in meta of extensions may be Array for several plugins or String for single plugin.
              if (Array.isArray(meta.target)) {
                for (let target of meta.target) {
                  if (!this.#extensions[target]) this.#extensions[target] = [];
                  this.#extensions[target].push({ ...meta, plugin });
                }
              } else {
                if (!this.#extensions[meta.target]) this.#extensions[meta.target] = [];
                this.#extensions[meta.target].push({ ...meta, plugin });
              }
            default:
              // In #plugins to add all plugins regardless of type
              this.#plugins.push({ ...meta, plugin, path: pluginList[index] });
              break;
          }
        }
      }
      if (!isPlugin) console.error(`Plugin ${pluginList[index]} without static method getRegistrationMeta`);
    });
  }

  async #fillDependencies() {
    // Getting dependencies from all plugins, that with "withDependencies" flag in meta
    for (let index = 0; index < this.#plugins.length; index++) {
      let pluginObject = this.#plugins[index];
      // Check flag
      if (pluginObject.withDependencies) {
        // Gettign path to directory wit plugin
        const splittedRelativePath = pluginObject.path.split('/');
        if (splittedRelativePath[0] === '.' || '') splittedRelativePath.shift();

        // Getting splitted path with static directory of plugins
        const pathToPlgDir = ['/plugins', ...splittedRelativePath].slice(0, -1);

        // First we get manifest.json with description of dependencies
        let manifest = await (await fetch([...pathToPlgDir, 'manifest.json'].join('/'))).json();

        for (let dep of manifest) {
          /*
					Structure of #dependencies property of Application class:
					{
						<name of plugin>: {
							<type-of-module>:{
								<version>:<module>
							}
						}
					}*/

          if (!this.#dependencies[dep.name]) this.#dependencies[dep.name] = {};
          const dependence = this.#dependencies[dep.name];
          const pathToDependence = [...pathToPlgDir, 'dependencies', dep.fileName].join('/');
          if (!dependence[dep.type]) dependence[dep.type] = {};
          if (!dependence[dep.type][dep.version]) dependence[dep.type][dep.version] = await import(pathToDependence);
        }
      }
    }
  }

  #defaultSubscriptions() {
    const eventSystem = this.getSystem('EventSystem');
    eventSystem.subscribeByNames('ChangeWorkspaceEditMode', 'changeMode');
    eventSystem.subscribeByNames('DefaultAddWorkspacePanel', 'defaultAddPanel');
    eventSystem.subscribeByNames('CompactWorkspacePanel', 'compactAllPanels');
  }

  // ---- PUBLIC METHODS ----

  installPlugin(name, ...args) {
    const nextGUID = `guid${this.#count}`;
    this.#count++; // increment here because when installing the plugin, extensions with their guids can be installed
    const Plugin = this.getPlugin(name);
    const instance = new Plugin(nextGUID, ...args);
    // for autocomplete
    this.#autocomplete[`${name}_${nextGUID}`] = instance;

    this.#guids[nextGUID] = instance;
    return instance;
  }

  installExtension(target, pluginName, ...args) {
    const nextGUID = `guid${this.#count}`;
    this.#count++;
    const targetExtensionList = this.#extensions[target];
    const { plugin: Plugin } = targetExtensionList.find(extPlg => extPlg.name === pluginName);
    const instance = new Plugin(nextGUID, ...args);
    // for autocomplete
    this.#autocomplete[`${pluginName}_${nextGUID}`] = instance;
    this.#guids[nextGUID] = instance;
    return instance;
  }

  uninstallPluginByGUID(guid) {
    // for autocomplete
    const key = Object.keys(this.#autocomplete).find(instanceName => instanceName.endsWith(`_${guid}`));
    delete this.#autocomplete[key];
    delete this.#guids[guid];
    return true;
  }

  uninstallPluginByInstance(instance) {
    const guid = Object.keys(this.#guids).find(key => this.#guids[key] === instance);
    // for autocomplete
    const key = Object.keys(this.#autocomplete).find(instanceName => instanceName.endsWith(`_${guid}`));

    delete this.#autocomplete[key];
    delete this.#guids[guid];
    return true;
  }

  getDependence(name, type, version) {
    let module;
    let autoVersion;
    let autoType;
    try {
      if (version) {
        module = this.#dependencies[name][type][version];
      } else if (type) {
        autoVersion = Object.keys(this.#dependencies[name][type])[0];
        module = this.#dependencies[name][type][autoVersion];
      } else if (name) {
        autoType = 'esm';
        autoVersion = Object.keys(this.#dependencies[name][autoType])[0];
        module = this.#dependencies[name][autoType][autoVersion];
      } else {
        throw new Error('No name param in getDependence');
      }
      return module;
    } catch (e) {
      throw new Error(`Dependence ${name} not found!`);
    }
  }
  getSystem(systemName) {
    return this.#systems[systemName];
  }
  getPanels() {
    return this.#plugins.filter(plg => plg.type === 'panel');
  }
  getPlugin(name, type = false) {
    try {
      let { plugin } = this.#plugins.find(plg => {
        return type ? plg.name === name && plg.type === type : plg.name === name;
      });
      return plugin;
    } catch (err) {
      console.error(`Plugin ${name} not found!`);
      throw new Error(err);
    }
  }

  getExtensions(targetName) {
    return this.#extensions[targetName];
  }

  getInstance(guid) {
    return this.#guids[guid];
  }

  getGUID(instance) {
    return Object.keys(this.#guids).find(guid => this.#guids[guid] === instance);
  }
}
