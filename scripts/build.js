'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
    throw err;
});

const path = require('path');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

function build() {

    console.log('Compile start...');

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

            ['SIGINT', 'SIGTERM'].forEach(function (sig) {
                process.on(sig, function () {
                    devServer.close();
                    process.exit();
                });
            });

            compiler.close((closeErr) => {
                if(closeErr) {
                    reject(closeErr)
                }
            });

        })

        return resolve('ok');
    })

}


let buildPromise = build()

buildPromise.then(res => {
    console.log('Compiling done!');
})

buildPromise.then(null, err => {
    console.log('Compiling error');

})