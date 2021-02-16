export async function fillDependencies(dependencies) {
	let manifest;
	return await fetch('/get-dependence-list')
		.then(async depList => {
			manifest = await depList.json();
			return Promise.all(manifest.map(({fileName}) => import(`/dependencies/${fileName}`)));
		})
		.then(modules => {
			manifest.forEach(({name}, index) => {
				dependencies[name] = {...manifest[index], module: modules[index]};
			});
		});
}
