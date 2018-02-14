const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        main:'./src/index.js',
        hello:'./src/hello-world.js',
        jsx: './src/jsx.js',
        element: './src/element-render.js',
        component: './src/component-props.js',
        state:'./src/state-livecycle.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        compress:true,
        port:8080
    },
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         title: 'Output management'
    //     })
    // ],
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loaders:"babel-loader",
                query:{
                    presets:['es2015','react']
                }
            }
        ]
    }
}