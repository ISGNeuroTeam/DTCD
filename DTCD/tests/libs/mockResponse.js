import {dependenceList} from '../samples/dependence-list';
import {pluginList} from '../samples/plugin-list';

export function mockResponse(url) {
	if (url === '/get-dependence-list') {
		return Promise.resolve({
			json: () => dependenceList,
		});
	} else if (url === '/get-plugin-list') {
		return Promise.resolve({
			json: () => pluginList,
		});
	} else {
		return Promise.resolve(null);
	}
}
