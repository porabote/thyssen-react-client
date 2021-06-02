'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// const envConfig = require('./.env')
// for(let alias in envConfig) {
//     process.env[alias] = envConfig[alias]
// }


const path = require('path')
const http = require('http')

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const configFactory = require('../config/webpack.config.js')

function build() {

    const webpackConfig = configFactory('development');
    const compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {

        const devServerOptions = Object.assign({}, webpackConfig.devServer, {
            open: true,
        });

        webpackDevServer.addDevServerEntrypoints(configFactory, devServerOptions);

        const devServer = new webpackDevServer(compiler, devServerOptions)

        // Launch webpackDevServer.
        devServer.listen('3000', 'app.porabote.ru', err => {
            console.log('dev server listening on port 3000');

            if (err) {
              //  console.log(err)
                //return console.log(err);
            }
        });

        return resolve('Compiled successfully.');

    }).catch(err => {
        console.log('Error !!!!')
    })

}

// TODO
let checkPort = () => {
    
}

let buildPromise = build()

buildPromise.then(res => {
    console.log(res);
})

buildPromise.catch((error) => {

    console.log('Server wasn`t started!');
    return

})