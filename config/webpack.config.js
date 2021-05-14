const path = require('path')
//const paths = require('./paths')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackEnv => {

    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        context: path.join(__dirname, '../'),
        stats: 'errors-only',
        entry: {
            main: './src/index.js',
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: '[name].bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'webpack Boilerplate',
                template: path.resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
            }),
            // применять изменения только при горячей перезагрузке
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
        //         {
        //             test: /\.js$/,
        //             exclude: /node_modules/,
        //             use: ['babel-loader'],
        //         },
        //         {
        //             test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        //             type: 'asset/resource',
        //         },
        //         {
        //             test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        //             type: 'asset/inline',
        //         },
                {
                    test: /\.less$/i,
                    //importLoaders: 3,
                    //loader: require.resolve('less-loader'),
                    use: [
                        // compiles Less to CSS
                        "style-loader",
                        "css-loader",
                        "less-loader",
                    ],
                },
            ],
        },
        // devServer: {
        //     stats: 'errors-only',
        //     historyApiFallback: true,
        //     contentBase: path.resolve(__dirname, '../dist'),
        //     open: true,
        //     compress: true,
        //     hot: true,
        //     https: true,
        //     allowedHosts: [
        //         'app.porabote.ru',
        //     ],
        //     port: 3000,
        // },
    }
}