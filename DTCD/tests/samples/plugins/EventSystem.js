export class Plugin {
	static getRegistrationMeta() {
		return {
			type: 'core',
			title: 'Система Событий',
			name: 'EventSystem',
		};
	}

	constructor(guid) {
		this.guid = guid;
	}

	subscribeByNames(name1, name2) {
		return true;
	}
}
