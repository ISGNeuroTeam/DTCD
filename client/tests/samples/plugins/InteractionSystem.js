export class InteractionSystem {
	static getRegistrationMeta() {
		return {
			type: 'core',
			title: 'Система взаимодействия',
			name: 'InteractionSystem',
		};
	}

	constructor(guid) {
		this.guid = guid;
	}
}
