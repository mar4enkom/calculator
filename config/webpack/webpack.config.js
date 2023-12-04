import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from "dotenv-webpack"
import { fileURLToPath } from 'url';
import {Aliases} from "../constants/aliases.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/index.js',
    mode: process.env.MODE,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        port: 3000,
        hot: true,
    },
    module: {
        rules: [
            // {
            //     tests: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: [
        //    '.ts',
            '.js'
        ],
        alias: {
            [Aliases.userConfig.signature]: path.resolve(__dirname, Aliases.userConfig.path),
            [Aliases.calculator.signature]: path.resolve(__dirname, Aliases.calculator.path),
            [Aliases.shared.signature]: path.resolve(__dirname, Aliases.shared.path),
            [Aliases.calculatorService.signature]: path.resolve(__dirname, Aliases.calculatorService.path),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new Dotenv({ path: "./mocks/.env" }),
    ],
};
