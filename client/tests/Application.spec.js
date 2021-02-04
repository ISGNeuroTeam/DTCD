import Application from '../src/Application';

import {mockResponse} from './libs/mockResponse';

import {dependenceList} from './samples/dependence-list';
import {pluginList} from './samples/plugin-list';

jest.mock('./../src/utils/fill-dependencies');
jest.mock('./../src/utils/fill-plugins');
import {fillDependencies} from './../src/utils/fill-dependencies';
import {fillPlugins} from './../src/utils/fill-plugins';

describe('Application tests...', () => {
	beforeAll(() => {
		global.fetch = jest.fn().mockImplementation(mockResponse);
	});

	it('Properties of Application', () => {
		const app = new Application();
		expect(app).toMatchObject({
			_dependencies: expect.any(Object),
			_extensions: expect.any(Object),
			_plugins: expect.any(Object),
			_guids: expect.any(Object),
			_systems: expect.any(Object),
			_count: expect.any(Number),
			installPlugin: expect.any(Function),
			getDependence: expect.any(Function),
			getExtensions: expect.any(Function),
			getSystem: expect.any(Function),
			getPanels: expect.any(Function),
			getPlugin: expect.any(Function),
			start: expect.any(Function),
		});
	});

	describe('"start" method of Application...', () => {
		beforeAll(() => {
			delete window.Application;
			const app = new Application();
			try {
				app.start();
			} catch (err) {
				return;
			}
		});

		test('Execute "fillDependencies" function', () => {
			expect(fillDependencies).toHaveBeenCalled();
		});

		test('Execute "fillPlugins" function', () => {
			jest.unmock('./../src/utils/fill-dependencies');
			expect(fillPlugins).toHaveBeenCalled();
		});
	});

	describe('fillDependencies/fillPlugins functions', () => {
		it('fillDependencies function', async () => {
			jest.unmock('./../src/utils/fill-dependencies');
			const {fillDependencies} = require('../src/utils/fill-dependencies');
			const dependencies = {};
			await fillDependencies(dependencies);
			expect(Object.keys(dependencies)).toEqual(dependenceList.map(dep => dep.name));
		});

		it('fillPlugins function', async () => {
			jest.unmock('./../src/utils/fill-plugins');
			const {fillPlugins} = require('../src/utils/fill-plugins');
			const plugins = [];
			await fillPlugins(plugins);
			expect(plugins.map(plg => plg.fileName)).toEqual(pluginList);
		});
	});

	// describe('public methods of Application', () => {
	// 	let app = new Application();
	// 	beforeAll(() => {
	// 		app.start(app);
	// 	});

	// 	test("app.getDependence('Vue')", () => {
	// 		expect(app.getDependence.call(app, 'Vue')).toBeDefined();
	// 	});
	// });
});
