module.exports = {
    plugins: ["@babel/plugin-proposal-class-properties"],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        debug: false
                    },
                ],
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-regenerator',
                '@babel/plugin-transform-runtime'
            ],
        },
        production: {
            presets: [
                // WebPack handles ES6 --> Target Syntax
                ['@babel/preset-env', {modules: false}],
            ],
            ignore: ['**/*.test.jsx', '**/*.test.js', '__snapshots__', '__tests__'],
        },
        development: {
            presets: [
                // WebPack handles ES6 --> Target Syntax
                ['@babel/preset-env', {modules: false}],
            ],
            ignore: ['**/*.test.jsx', '**/*.test.js', '__snapshots__', '__tests__']
        }
    }
};
