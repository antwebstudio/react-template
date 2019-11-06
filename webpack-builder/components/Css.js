let AutomaticComponent = require('../../node_modules/webpack-mix/src/components/AutomaticComponent');

class Css extends AutomaticComponent {
    /**
     * webpack rules to be appended to the master config.
     */
    webpackRules() {
        return [
            {
                test: /\.module.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							localIdentName: "[name]__use-bootstrap__[local]___[hash:base64:5]",
							modules: true
						}
					}
				]
            },

            {
                test: /\.module.s[ac]ss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							localIdentName: "[name]__use-bootstrap__[local]___[hash:base64:5]",
							modules: true
						}
					},
					{
						loader: 'sass-loader',
					}
				]
            },

            {
                test: /\.module.less$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							localIdentName: "[name]__use-bootstrap__[local]___[hash:base64:5]",
							modules: true
						}
					},
					{
						loader: 'less-loader',
					}
				]
            },
            {
                test: /\.css$/,
                exclude: /\.module.css$/,
                loaders: ['style-loader', 'css-loader']
            },

            {
                test: /\.s[ac]ss$/,
                exclude: /\.module.s[ac]ss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.less$/,
                exclude: /\.module.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ];
    }

    /**
     * Paths to be excluded from the loader.
     *
     * @param {string} preprocessor
     */
    excludePathsFor(preprocessor) {
        let exclusions = Mix.components.get(preprocessor);

        return exclusions
            ? exclusions.details.map(preprocessor => preprocessor.src.path())
            : [];
    }
}

module.exports = Css;
