'use strict';

// Do this as the first thing so that any code reading it knows the right env.
//process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

function build() {

    console.log('Creating an optimized production build...');

    const config = configFactory('development');

    const compiler = webpack(config);

    compiler.run((err, stats) => {


        if(stats.hasErrors()) {
            console.log(stats.compilation.errors)
        }

        if (err) {
            console.error(err);
            return;
        }


        compiler.close((closeErr) => {
            console.log(closeErr)
        });


    })
console.log('!!!!!!!!!!!!!')


    //return new Promise((resolve, reject) => {

    // compiler.run((err, stats) => {
    //
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }

            // console.log(stats.toString({
            //     chunks: false,  // Makes the build much quieter
            //     colors: true    // Shows colors in the console
            // }));


            
            // const devServer = new WebpackDevServer(compiler, {
            //     https: true,
            //     host: 'app.porabote.ru',
            //     cert: './.cert/cert.crt',
            //     key: './.cert/key.key'
            // });
            // // Launch WebpackDevServer.
            // devServer.listen('3000', 'app.porabote.ru', err => {
            //     if (err) {
            //         return console.log(err);
            //     }
            //     // if (isInteractive) {
            //     //     clearConsole();
            //     // }
            //
            //     // if (env.raw.FAST_REFRESH && semver.lt(react.version, '16.10.0')) {
            //     //     console.log(
            //     //         chalk.yellow(
            //     //             `Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`
            //     //         )
            //     //     );
            //     // }
            //
            //     // console.log(chalk.cyan('Starting the development server...\n'));
            //     // console.log(port);
            //     // console.log(urls.localUrlForBrowser);
            //     // openBrowser(urls.localUrlForBrowser);
            // });

             //return resolve('okk');
       // });

   // });

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