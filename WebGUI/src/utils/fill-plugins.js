export async function fillPlugins(plugins, extensions) {
	let pluginList;
	return await fetch('/get-plugin-list')
		.then(async plugins => {
			pluginList = await plugins.json();
			return Promise.all(pluginList.map(fileName => import(`/plugins/${fileName}`)));
		})
		.then(modules => {
			modules.forEach((module, index) => {
				for (let key in module) {
					if (module[key].getRegistrationMeta) {
						const plugin = module[key];
						const meta = plugin.getRegistrationMeta();
						switch (meta.type) {
							case 'extension':
								if (Array.isArray(meta.target)) {
									for (let target of meta.target) {
										if (!extensions[target]) extensions[target] = [];
										extensions[target].push({...meta, plugin});
									}
								} else {
									if (!extensions[meta.target]) extensions[meta.target] = [];
									extensions[meta.target].push({...meta, plugin});
								}
								plugins.push({...meta, plugin, fileName: pluginList[index]});
								break;
							default:
								plugins.push({...meta, plugin, fileName: pluginList[index]});
								break;
						}
					} else {
						console.error(`Plugin ${pluginList[index]} without static method getRegistrationMeta`);
					}
				}
			});
		});
}
