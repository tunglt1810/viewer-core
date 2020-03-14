module.exports = {
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        production: {
            presets: [
                // WebPack handles ES6 --> Target Syntax
                ['@babel/preset-env', { modules: false }]
            ],
            ignore: ['**/*.test.jsx', '**/*.test.js', '__snapshots__', '__tests__'],
        },
        development: {
            presets: [
                // WebPack handles ES6 --> Target Syntax
                ['@babel/preset-env', { modules: false }]
            ],
            plugins: ['react-hot-loader/babel'],
            ignore: ['**/*.test.jsx', '**/*.test.js', '__snapshots__', '__tests__'],
        },
    },
};
