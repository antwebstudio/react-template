/**
 * As our first step, we'll pull in the user's webpack.mix.js
 * file. Based on what the user requests in that file,
 * a generic config object will be constructed for us.
 */
let mix = require('webpack-mix');
//const Dotenv = require('dotenv-webpack');

let ComponentFactory = require('./node_modules/webpack-mix/src/components/ComponentFactory');


let components = [
    'JavaScript',
    'Sass',
];
let customComponents = [
    'Css',
];
let factory = new ComponentFactory();

components
	.map(name => require(`./node_modules/webpack-mix/src/components/${name}`))
	.forEach(factory.install.bind(factory));

customComponents
	.map(name => require(`./webpack-builder/components/${name}`))
	.forEach(factory.install.bind(factory));

//require(Mix.paths.mix());


let themePath = 'src';
let publishPath = 'dist';


mix
.js(themePath + '/index.js', 'js')
.setPublicPath(publishPath)
.webpackConfig({
	module: {
		loaders: [{
			test: /\.json$/,
			loader: 'json-loader'
		}]
	}
});

/*.webpackConfig({
	plugins: [
		new Dotenv({
			//path: './some.other.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false // load '.env.defaults' as the default values if empty.
		})
	]
})*/

/**
 * Just in case the user needs to hook into this point
 * in the build process, we'll make an announcement.
 */

Mix.dispatch('init', Mix);

/**
 * Now that we know which build tasks are required by the
 * user, we can dynamically create a configuration object
 * for Webpack. And that's all there is to it. Simple!
 */

let WebpackConfig = require('./node_modules/webpack-mix/src/builder/WebpackConfig');

module.exports = new WebpackConfig().build();
