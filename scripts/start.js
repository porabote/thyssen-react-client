'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const http = require('http')
//const process = require('process');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

function build() {

    console.log('Compile start...');

    const webpackConfig = configFactory('development');
    const compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {
        // checkPort()
        // compiler.run((err, stats) => {
        //
        //     if (stats.hasErrors()) {
        //
        //         console.log(stats.toString({
        //             chunks: false,  // Makes the build much quieter
        //             colors: true    // Shows colors in the console
        //         }));
        //
        //         return reject(stats.compilation.errors)
        //     }
        //     if (err) {
        //         return reject(err)
        //     }

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
                // devServer.listen('SIGTERM', (err) => {
                //     console.log(77)
                //     console.log(err)
                // })
                // devServer.listen('uncaughtException', (err) => {
                //     console.log(177)
                //     console.log(err)
                // })

                return resolve('Compiled successfully.');

            } catch (e) {
                return reject(e)

            }

        //})


    })

}

let checkPort = () => {
    //console.log(process)
}

let buildPromise = build()

buildPromise.then(res => {
    console.log('Server was started!');
    console.log(res)
    // compiler.close((closeErr) => {
    //     if(closeErr) {
    //         reject(closeErr)
    //     }
    // });
})

buildPromise.then(null, err => {
    console.log('Server hasn`t start');

})