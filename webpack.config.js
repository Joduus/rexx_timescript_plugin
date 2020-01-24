/*
 * @copyright Copyright (c) rexx systems GmbH
 *
 * @link https://www.rexx-systems.com
 *
 * This software is protected by copyright.
 *
 * It is not permitted to copy, present, send, lease and / or lend the website
 * or individual parts thereof without the consent of the copyright holder.
 *
 * Contravention of this law will result in proceedings under criminal
 * or civil law.
 *
 * All rights reserved.
 */

const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { optimize } = require('webpack');
const { join } = require('path');
let prodPlugins = [];
if (process.env.NODE_ENV === 'production') {
    prodPlugins.push(
        new optimize.AggressiveMergingPlugin(),
        new optimize.OccurrenceOrderPlugin()
    );
}
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    entry: {
        contentscript: join(__dirname, 'src/ts/chrome/contentScript.ts'),
        background: join(__dirname, 'src/ts/chrome/background.ts'),
    },
    output: {
        path: join(__dirname, 'script/src/js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts?$/,
                use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CheckerPlugin(),
        ...prodPlugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};