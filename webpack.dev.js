const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require("glob");

module.exports = {
    mode: "development",
    optimization: {
        usedExports: true,
    },
    entry: ["./src/js/index.js", "./src/scss/main.scss"],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "cheap-module-eval-source-map",
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
    })],
    externals: {
        "jquery": "$"
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    failOnError: false,
                    configFile: '.eslintrc.json'
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: [path.resolve('__dirname', "src", "scss")],
                            },
                        },
                    }
                ],
            },
        ]
    }
};