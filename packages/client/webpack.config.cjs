const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const Aliases = {
    userConfig: {
        signature: "userConfig",
        path: "/userConfig",
    },
    viewService: {
        signature: "viewService",
        path: "/src/CalculatorViewService"
    },
    calculatorService: {
        signature: "calculatorService",
        path: "/src/CalculatorService"
    },
    mvc: {
        signature: "mvc",
        path: "/src/mvc"
    },
    shared: {
        signature: "shared",
        path: "../calculator-common"
    },
}

module.exports = {
    entry: './src/index',
    mode: process.env.MODE,
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            [Aliases.userConfig.signature]: path.resolve(__dirname, Aliases.userConfig.path),
            [Aliases.viewService.signature]: path.resolve(__dirname, Aliases.viewService.path),
            [Aliases.mvc.signature]: path.resolve(__dirname, Aliases.mvc.path),
            [Aliases.shared.signature]: path.resolve(__dirname, Aliases.shared.path),
            [Aliases.calculatorService.signature]: path.resolve(__dirname, Aliases.calculatorService.path),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new Dotenv({ path: "./mocks/.env" }),
    ],
};
