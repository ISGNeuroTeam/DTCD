module.exports = {
	presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
	plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods'],
	env: {
		test: {
			plugins: [
				[
					'babel-plugin-root-import',
					{
						paths: [
							{
								rootPathPrefix: '/',
								rootPathSuffix: './tests/samples',
							},
						],
					},
				],
			],
		},
	},
};
