export class Plugin {
	static getRegistrationMeta() {
		return {
			name: 'WorkspaceSystem',
			type: 'core',
			title: 'Система рабочего стола',
		};
	}
	constructor(guid) {
		this.guid = guid;
	}
}
