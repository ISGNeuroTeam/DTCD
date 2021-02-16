export class Plugin {
	static getRegistrationMeta() {
		return {
			name: 'StyleSystem',
			type: 'core',
			title: 'Дизайн система',
		};
	}

	constructor(guid) {
		this.guid = guid;
	}
}
