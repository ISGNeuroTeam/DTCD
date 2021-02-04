jest.mock('./../src/utils/fill-dependencies');
jest.mock('./../src/utils/fill-plugins');

import Application from '../src/Application';

import {mockResponse} from './utils/mockResponse';

import {fillDependencies} from './../src/utils/fill-dependencies';
import {fillPlugins} from './../src/utils/fill-plugins';

import {dependenceList} from './samples/dependence-list';
import {pluginList} from './samples/plugin-list';

describe('Application tests...', () => {
	beforeAll(() => {
		global.fetch = jest.fn().mockImplementation(mockResponse);
	});

	it('Properties of Application', () => {
		const app = new Application();
		expect(app).toEqual({
			_dependencies: expect.any(Object),
			_extensions: expect.any(Object),
			_plugins: expect.any(Object),
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
		// describe('Executing getting plugins/dependence method', () => {
		// it('Execute "start" method', () => {
		// 	expect().toThrow();
		// });
		let app;
		beforeEach(() => {
			delete window.Application;
			app = new Application();
			app.start();
		});
		test('Execute "fillDependencies" function', () => {
			expect(fillDependencies).toHaveBeenCalled();
		});

		test('Execute "fillPlugins" function', () => {
			jest.unmock('./../src/utils/fill-dependencies');
			expect(fillPlugins).toHaveBeenCalled();
		});
		// });
	});

	describe('fillDependencies/fillPlugins functions', () => {
		beforeAll(() => {
			jest.unmock('./../src/utils/fill-dependencies');
			jest.unmock('./../src/utils/fill-plugins');
			jest.resetModules();
		});

		it('fillDependencies function', async () => {
			const {fillDependencies} = require('./../src/utils/fill-dependencies');
			const dependencies = {};
			await fillDependencies(dependencies);
			expect(Object.keys(dependencies)).toEqual(dependenceList.map(dep => dep.name));
		});

		it('fillPlugins function', async () => {
			const {fillPlugins} = require('./../src/utils/fill-plugins');
			const plugins = [];
			await fillPlugins(plugins);
			expect(plugins.map(plg => plg.fileName)).toEqual(pluginList);
		});
	});
	describe('public methods of Application', () => {
		let app = new Application();
		beforeAll(async () => {
			jest.unmock('./../src/utils/fill-dependencies');
			jest.unmock('./../src/utils/fill-plugins');
			jest.resetModules();
			await app.start.call(app);
		});

		test("app.getDependence('Vue')", async () => {
			expect(app.getDependence('Vue')).toBeDefined();
		});
	});
});
