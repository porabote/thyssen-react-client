'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const webpackConf = require('../config/webpack.config.js');

function build(previousFileSizes) {
    console.log('Creating an optimized production build...');

    const compiler = webpack(webpackConf);

    let buildPromise = new Promise((resolve, reject) => {

        compiler.run((err, stats) => {

            stats.compilation.errors;

            let messages;
            if (err) {
                console.log(err);
            }

           // return resolve(resolveArgs);
        });
    });

    function buildSuccess()
    {
        console.log();
    }

// onFulfilled сработает при успешном выполнении
    buildPromise.then(res => {
        console.log('ok');
    })
// onRejected сработает при ошибке
    buildPromise.then(null, err => {
        console.log('err');
        console.log(err)
    })


}

build()