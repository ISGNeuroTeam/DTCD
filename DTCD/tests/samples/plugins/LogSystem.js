export class LogSystem {
	static getRegistrationMeta() {
		return {
			type: 'core',
			title: 'Система логирования',
			name: 'LogSystem',
		};
	}

	constructor(guid) {
		this.guid = guid;
		this.logs = [];
	}
}
