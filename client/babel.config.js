module.exports = {
	presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
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
