export class Plugin {
	static getRegistrationMeta() {
		return {
			type: 'core',
			name: 'StorageSystem',
			title: 'Storage System',
		};
	}

	constructor(guid) {
		this.guid = guid;
	}
}
