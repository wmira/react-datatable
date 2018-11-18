
module.exports = {
    entry: './src/playground/index.tsx',
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
          {
            test: [/\.jsx?$/, /\.tsx?$/],
            use: 'babel-loader',
            exclude: /node_modules/
          }
        ]
    },
    
    devtool: 'source-map',
    
    devServer: {
        inline: true        
    }
};