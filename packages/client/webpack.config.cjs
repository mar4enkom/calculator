const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const Aliases = {
    viewService: {
        signature: "viewService",
        path: "/src/CalculatorViewService"
    },
    api: {
        signature: "api",
        path: "/src/api"
    },
    mvc: {
        signature: "mvc",
        path: "/src/mvc"
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
            [Aliases.viewService.signature]: path.resolve(__dirname, Aliases.viewService.path),
            [Aliases.mvc.signature]: path.resolve(__dirname, Aliases.mvc.path),
            [Aliases.api.signature]: path.resolve(__dirname, Aliases.api.path),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new Dotenv({ path: "./config/env/.env" }),
    ],
};
