const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const Aliases = {
    app: {
        signature: "@/app",
        path: "/src/app"
    },
    calculator: {
        signature: "@/calculator",
        path: "/src/calculator"
    },
    history: {
        signature: "@/history",
        path: "/src/history"
    },
    shared: {
        signature: "@/shared",
        path: "/src/shared"
    },
    userConfig: {
        signature: "@/userConfig",
        path: "/src/userConfig"
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
            {
                test: /\.png$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            [Aliases.app.signature]: path.resolve(__dirname, Aliases.app.path),
            [Aliases.calculator.signature]: path.resolve(__dirname, Aliases.calculator.path),
            [Aliases.history.signature]: path.resolve(__dirname, Aliases.history.path),
            [Aliases.shared.signature]: path.resolve(__dirname, Aliases.shared.path),
            [Aliases.userConfig.signature]: path.resolve(__dirname, Aliases.userConfig.path),
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
