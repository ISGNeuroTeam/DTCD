export default class Application {
  #dependencies;
  #plugins;
  #extensions;
  #systems;
  #guids;
  #count;
  #autocomplete;

  constructor() {
    // TODO: Add docstrings.

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
    // TODO: Add docstrings.

    return this.#autocomplete;
  }

  async start() {
    // TODO: Add docstrings.

    // TODO: It seems that you use asynchronous functions in a synchronous way. Do we really need asynchronous functions here?
    await this.#fillPlugins();

    await this.#fillDependencies();

    let systems = this.#plugins
      .filter(plg => plg.type === 'core' && plg.name !== 'WorkspaceSystem')
      .sort((prevPlg, nextPlg) => nextPlg.priority - prevPlg.priority);

    systems.push(
      this.#plugins
        .filter(plg => plg.name === 'WorkspaceSystem')
        .reduce((a, b) => (a.version > b.version ? a : b))
    );

    for (let i = 0; i < systems.length; i++) {
      const { name, version } = systems[i];
      await this.#installSystem({ name, version });
    }
  }

  async #fillPlugins() {
    // TODO: Add docstrings.

    // Getting list of all plugins
    // TODO: There is a query to an external system. You need to catch connection exceptions.
    const pluginList = await (await fetch('/mock_server/v1/plugins/plugins.json')).json();

    // Getting each module from server as module
    const modules = await Promise.all(
        // TODO: There is a query to an external system. You need to catch connection exceptions.
        pluginList.map(pathToFile => import('/plugins/' + pathToFile))
    );

    // TODO: Fix the comment bellow.
    // Plugin is what with the getRegistrationMeta method
    modules.forEach((module, index) => {
      let isPlugin = false;

      // TODO: The way bellow seems to be more productive.
      //  Object.keys(obj).filter((key) => typeof obj[key] === 'function');
      for (let key in module) {
        if (module[key].getRegistrationMeta) {
          // set flag isPlugin on module
          isPlugin = true;

          const plugin = module[key];
          const meta = plugin.getRegistrationMeta();
          switch (meta.type) {
            // TODO: Describe all types of plugins.
            // If type of plugin is extension add it to private property #extensions of class.
            case 'extension':
              // Target property in meta of extensions may be Array for several plugins or String for single plugin.
              // TODO: JS is not strongly typed language but that doesn't mean we should not use this pattern.
              //  I think using different types for the same var is not a good idea. We can simplify the code bellow if
              //  it will be an Array in both ways.
              if (Array.isArray(meta.target)) {
                for (let target of meta.target) {
                  if (!this.#extensions[target]) this.#extensions[target] = [];
                  // TODO: Why do we need "transform" a meta data from a plugin? Why doesn't it provide us the meta in
                  //  the acceptable format?
                  this.#extensions[target].push({ ...meta, plugin });
                }
              } else {
                if (!this.#extensions[meta.target]) this.#extensions[meta.target] = [];
                // TODO: Why do we need "transform" a meta data from a plugin? Why doesn't it provide us the meta in
                //  the acceptable format?
                this.#extensions[meta.target].push({ ...meta, plugin });
              }
            default:
              // In #plugins to add all plugins regardless of type
              this.#plugins.push({ ...meta, plugin, path: pluginList[index] });
              break;
          }
        }
      }
      if (!isPlugin)
        // TODO: Replace by LogSystem.
        console.error(`Plugin ${pluginList[index]} without static method getRegistrationMeta`);
    });
  }

  async #fillDependencies() {
    // Getting dependencies from all plugins, that with "withDependencies" flag in meta
    // TODO: Really? We're in the 2022nd year. Use methods of an iteration.
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
        // TODO: There is a query to an external system. You need to catch connection exceptions.
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
          if (!dependence[dep.type][dep.version])
            dependence[dep.type][dep.version] = await import(pathToDependence);
        }
      }
    }
  }

  async #installSystem({ name, version, guid }) {
    if (!name || !version) {
      return console.error(`Name and version should be specified in order to install system!`);
    }

    if (typeof name !== 'string') return console.error('Name should be string');
    if (typeof version !== 'string') return console.error('Version should be string');

    if (!guid) {
      guid = `guid${this.#count}`;
      this.#count++;
    }

    try {
      const Plugin = this.getPlugin(name, version);
      const instance = new Plugin(guid);
      // for autocomplete
      this.#autocomplete[`${name}_${guid}`] = instance;

      this.#guids[guid] = { ...Plugin.getRegistrationMeta(), instance };

      this.#systems[`${name}${version}`] = instance;

      if (instance.init) await instance.init();

      return instance;
    } catch (error) {
      console.log(error);
    }
  }

  installPanel({ name, version, guid, selector }) {
    if (!name || !version || !selector) {
      return console.error(
        `Name, version and selector should be specified in order to install panel!`
      );
    }

    if (typeof name !== 'string') return console.error('Name should be string');
    if (typeof version !== 'string') return console.error('Version should be string');
    if (typeof selector !== 'string') return console.error('Selector should be string');

    if (!guid) {
      guid = `guid${this.#count}`;
      this.#count++;
    }
    const Plugin = this.getPlugin(name, version);
    const instance = new Plugin(guid, selector);
    // for autocomplete
    this.#autocomplete[`${name}_${guid}`] = instance;

    this.#guids[guid] = { ...Plugin.getRegistrationMeta(), instance };
    return instance;
  }

  installExtension(target, pluginName, ...args) {
    const nextGUID = `guid${this.#count}`;
    this.#count++;
    const targetExtensionList = this.#extensions[target];
    const extension = targetExtensionList.find(extPlg => extPlg.name === pluginName);
    const instance = new extension.plugin(nextGUID, ...args);
    // for autocomplete
    this.#autocomplete[`${pluginName}_${nextGUID}`] = instance;
    this.#guids[nextGUID] = { ...extension.getRegistrationMeta(), instance };
    return instance;
  }

  uninstallPluginByGUID(guid) {
    // for autocomplete
    const key = Object.keys(this.#autocomplete).find(instanceName =>
      instanceName.endsWith(`_${guid}`)
    );
    delete this.#autocomplete[key];
    delete this.#guids[guid];
    return true;
  }

  uninstallPluginByInstance(instance) {
    const guid = Object.keys(this.#guids).find(key => this.#guids[key].instance === instance);
    // for autocomplete
    const key = Object.keys(this.#autocomplete).find(instanceName =>
      instanceName.endsWith(`_${guid}`)
    );

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

  getSystem(name, version) {
    if (!name || !version) {
      throw new Error('You should specify name and version of system');
    }

    if (typeof name !== 'string') return console.error('Name should be string');
    if (typeof version !== 'string') return console.error('Version should be string');

    const system = this.#systems[`${name.trim()}${version.trim()}`];
    if (system) return system;
    else throw new Error(`Plugin ${name} ${version} not found!`);
  }

  getPanels() {
    return this.#plugins.filter(plg => plg.type === 'panel');
  }

  getPlugin(name, version) {
    if (!name || !version) {
      throw new Error(`Name and version should be specified in order to get plugin!`);
    }

    if (typeof name !== 'string') return console.error('Name should be string');
    if (typeof version !== 'string') return console.error('Version should be string');

    let { plugin } = this.#plugins.find(plg => plg.name === name && plg.version === version);
    if (plugin) {
      return plugin;
    } else {
      throw new Error(`Plugin ${name} ${version} not found!`);
    }
  }

  getExtensions(targetName) {
    return this.#extensions[targetName];
  }

  getInstance(guid) {
    return this.#guids[guid].instance;
  }

  findInstances(name, version) {
    return Object.keys(this.#guids)
      .filter(guid =>
        version
          ? this.#guids[guid].name === name && this.#guids[guid].version === version
          : this.#guids[guid].name === name
      )
      .map(guid => this.#guids[guid].instance);
  }

  getGUID(instance) {
    return Object.keys(this.#guids).find(guid => this.#guids[guid].instance === instance);
  }

  getGUIDList() {
    return Object.keys(this.#guids);
  }
}
