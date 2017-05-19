module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^(?!app)/,
                'app.js': /^app/
            }
        },
        stylesheets: {
            joinTo: {
                'app.css': /^app/,
                'vendor.css': /^(?!app)/,
            }
        }
    },
    plugins: {
        babel: {
            presets: ['es2015', 'stage-0']
        },
        postcss: {
            processors: [
                require('postcss-import')(),
                require('postcss-cssnext')(),
            ]
        }
    }
};
