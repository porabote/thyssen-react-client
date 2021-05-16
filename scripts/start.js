'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path')
const http = require('http')
const webpack = require('webpack')
const configFactory = require('../config/webpack.config.js')
const WebpackDevServer = require('webpack-dev-server')

function build() {

    console.log('Compile start...');

    const webpackConfig = configFactory('development');
    const compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {

        try {

            const devServerOptions = Object.assign({}, webpackConfig.devServer, {
                open: true,
            });

            const devServer = new WebpackDevServer(compiler, devServerOptions);

            // Launch WebpackDevServer.
            devServer.listen('3000', 'app.porabote.ru', err => {
                if (err) {
                    return console.log(err);
                }
            });

            return resolve('Compiled successfully.');

        } catch (e) {
            return reject(e)
        }

    })

}

// TODO
let checkPort = () => {
    
}

let buildPromise = build()

buildPromise.then(res => {
    console.log('Server was started!');
    console.log(res)
})

buildPromise.then(null, err => {
    console.log('Server hasn`t start');

})