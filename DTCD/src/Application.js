import { version } from './../package.json';

const splitVersion = v => v.split('.').map(octet => +octet);

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

  get version() {
    return version;
  }

  get autocomplete() {
    return this.#autocomplete;
  }

  get systems() {
    return this.#systems;
  }

  async start() {
    try {
      await this.#fillPlugins();

      await this.#fillDependencies();

      let systems = this.#plugins.filter(plg => plg.type === 'core' && plg.name !== 'WorkspaceSystem');

      systems.push(
        this.#plugins.filter(plg => plg.name === 'WorkspaceSystem').reduce((a, b) => (a.version > b.version ? a : b))
      );

      systems = systems.sort((prevPlg, nextPlg) => nextPlg.priority - prevPlg.priority);

      for (let i = 0; i < systems.length; i++) {
        const { name, version } = systems[i];
        await this.#installSystem({ name, version });
      }

      document.getElementById('loader').remove();
    } catch (error) {
      document.getElementsByClassName('Loader_Text')[0].innerHTML =
        'Что-то пошло не так, попробуйте обновить страницу или обратитесь к администратору...';
      console.error(error);
    }
  }

  async #fillPlugins() {
    // Getting list of all plugins
    // const loader = document.getElementById('loader');

    const pluginList = await (await fetch('/dtcd_utils/v1/plugins/plugins.json')).json();

    // Getting each module from server as module
    let modules = pluginList.map(pathToFile => import('/plugins/' + pathToFile));
    // const modulesCount = modules.length;
    // let progress = 0;

    // let func = promise => {
    //   promise.then(() => {
    //     progress++;
    //     loader.innerHTML = `Loaded ${progress} of ${modulesCount}`;
    //   });
    //   return promise;
    // };

    modules = await Promise.all(modules);
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

  async #installSystem({ name, version }) {
    if (!name || !version) {
      return console.error(`Name and version should be specified in order to install system!`);
    }

    if (typeof name !== 'string') return console.error('Name should be string');
    if (typeof version !== 'string') return console.error('Version should be string');

    try {
      const Plugin = this.getPlugin(name, version);
      const guid = `${name}_${version.replaceAll('.', '_')}`;
      const instance = new Plugin(guid);
      // for autocomplete
      this.#autocomplete[guid] = instance;
      this.#autocomplete[name] = instance;

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
      return console.error(`Name, version and selector should be specified in order to install panel!`);
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
    this.#autocomplete[guid] = instance;

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
    const { instance } = this.#guids[guid];
    this.uninstallPluginByInstance(instance);
  }

  uninstallPluginByInstance(instance) {
    const guid = Object.keys(this.#guids).find(key => this.#guids[key].instance === instance);

    if (typeof instance.beforeUninstall === 'function') {
      instance.beforeUninstall();
    }

    delete this.#autocomplete[guid];
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

  getSystem(systemName, version) {
    if (!systemName || !version) {
      throw new Error('You should specify name and version of system');
    }

    if (typeof systemName !== 'string') return console.error('Name should be string');
    if (typeof version !== 'string') return console.error('Version should be string');

    if (this.#systems.hasOwnProperty(`${systemName.trim()}${version.trim()}`))
      return this.#systems[`${systemName.trim()}${version.trim()}`];

    const highestVersionSystem = Object.keys(this.#systems)
      .filter(system => {
        if (!system.includes(systemName)) return false;

        const systemVersion = system.split(systemName)[1];
        const [major, minor, micro] = splitVersion(systemVersion);
        const [majorRequested, minorRequested, microRequested] = splitVersion(version);
        // exists -  0.9.0
        // request - 0.8.1
        if (major !== majorRequested) return false;

        if (minor < minorRequested) return false;

        if (micro < microRequested && minor === minorRequested) return false;

        return true;
      })
      .sort()
      .pop();

    if (highestVersionSystem) return this.#systems[highestVersionSystem];
    else throw new Error(`Plugin ${systemName} ${version} not found!`);
  }

  getPanels() {
    return this.#plugins.filter(plg => plg.type === 'panel');
  }

  getPlugin(name = '', version = '', octetCount = 0) {
    if (!name || !version) {
      throw new Error(`Name and version should be specified in order to get plugin!`);
    }

    if (typeof name !== 'string') throw new Error('Name should be string');

    if (typeof version !== 'string') throw new Error('Version should be string');

    if (typeof octetCount !== 'number') throw new Error('OctetCount should be number');

    let requestPlugin = this.#plugins.find(plg => plg.name === name && plg.version === version);

    if (octetCount <= 0) {
      if (requestPlugin) {
        return requestPlugin?.plugin;
      } else {
        throw new Error(`Plugin ${name} ${version} not found`);
      }
    }

    if (requestPlugin) return requestPlugin?.plugin;

    const [major, minor, micro] = splitVersion(version);

    const similarPlugins = this.#plugins.filter(plugin => {
      if (plugin.name === name) {
        const [pMajor, pMinor, pMicro] = splitVersion(plugin.version);

        if (pMajor !== major) return false;

        const checkMicro = pMinor === minor && pMicro > micro;
        const checkMinor = pMinor > minor && pMinor <= minor + octetCount;

        if (checkMicro || checkMinor) return true;

        return false;
      }

      return false;
    });

    similarPlugins.sort((a, b) => {
      const [, aMinor, aMicro] = splitVersion(a.version);
      const [, bMinor, bMicro] = splitVersion(b.version);

      if (aMinor > bMinor) return 1;
      if (aMinor < bMinor) return -1;

      if (aMinor === bMinor) {
        if (aMicro > bMicro) return 1;
        if (aMicro < bMicro) return -1;
        return 0;
      }
    });

    requestPlugin = similarPlugins.pop();

    if (requestPlugin) {
      return requestPlugin?.plugin;
    } else {
      throw new Error(`Plugin ${name} ${version} not found`);
    }
  }

  getExtensions(targetName) {
    return this.#extensions[targetName];
  }

  resetSystems() {
    Object.keys(this.#systems).forEach(system => {
      if (typeof this.#systems[system].resetSystem === 'function') {
        this.#systems[system].resetSystem();
      }
    });
  }

  getInstance(guid) {
    return this.#guids[guid]?.instance;
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
