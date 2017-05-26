const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'ui', 'index.js'),

    output: {
        path: path.join(__dirname, 'lib'),
        // target: 'node',
        publicPath: '/lib/',
        filename: '[name].module.js',
        sourceMapFilename: '[name].map',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|lib)/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            options: () => [ require('autoprefixer') ],
                        }
                    },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    { loader: 'base64-font-loader' },
                ],
            }
        ]
    },

    plugins: [
        new webpack.ExternalsPlugin('commonjs', ['electron']),

        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
};
