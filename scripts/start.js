'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

function build() {

    console.log('Creating an optimized production build...');

    const config = configFactory('development');
    const compiler = webpack(config);

    return new Promise((resolve, reject) => {

        compiler.run((err, stats) => {

            if (stats.hasErrors()) {

                console.log(stats.toString({
                    chunks: false,  // Makes the build much quieter
                    colors: true    // Shows colors in the console
                }));

                return reject(stats.compilation.errors)
            }
            if (err) {
                return reject(err)
            }


            const devServer = new WebpackDevServer(compiler, {
                https: true,
                host: 'app.porabote.ru',
                cert: './.cert/cert.crt',
                key: './.cert/key.key'
            });
            // Launch WebpackDevServer.
            devServer.listen('3000', 'app.porabote.ru', err => {
                if (err) {
                    return console.log(err);
                }
            });

            compiler.close((closeErr) => {
                console.log(closeErr)
            });

        })


        return resolve('ok');
    })

}


let buildPromise = build()
//
// buildPromise.then(res => {
//     console.log('ok');
// })
// // onRejected сработает при ошибке
// buildPromise.then(null, err => {
//     console.log('err');
//     // console.log(err)
// })