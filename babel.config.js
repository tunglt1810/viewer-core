module.exports = {
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-regenerator',
        '@babel/plugin-transform-runtime'
    ],
    presets: [
        // WebPack handles ES6 --> Target Syntax
        ['@babel/preset-env', {modules: false, useBuiltIns: 'entry', corejs: 3}],
    ],
};
