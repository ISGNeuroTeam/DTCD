export class Plugin {
	static getRegistrationMeta() {
		return {
			type: 'panel',
			title: 'Панель меню',
			name: 'MenuPanel',
		};
	}

	constructor(guid, selector) {
		this.guid = guid;
		this.selector = selector;
	}
}
