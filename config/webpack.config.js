const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
            path: isEnvProduction ? path.join(__dirname, '../dist') : undefined,
            filename: '[name].[fullhash].bundle.js'
        },
        resolve: {

        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'webpack Boilerplate',
                template: path.resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
            }),
            // применять изменения только при горячей перезагрузке
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[fullhash].bundle.css'
            }),
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
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
                {
                    test: /\.less$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                //hmr: isEnvProduction,
                               // reloadAll: isEnvDevelopment
                            },
                        },
                        //"style-loader",
                        'css-loader',
                        "less-loader",
                    ],
                },
            ],
        },
        devServer: {
            stats: 'errors-only',
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, '../dist/build'),
            open: true,
            compress: true,
            hot: isEnvDevelopment,
            allowedHosts: [
                'app.porabote.ru',
            ],
            https: true,
            host: 'app.porabote.ru',
            cert: './.cert/cert.crt',
            key: './.cert/key.key',
            writeToDisk: false,
        },
    }
}