const path = require('path');
const env = require('./environment');
const fs = require('fs');

//export a helper func to provide static files to views based on environment
module.exports = (app) => {
    // give a global function assetPath through locals to views to access static files
    app.locals.assetPath = function (filePath) {
        if (env.name == 'development') {
            return filePath;
        }
        // access the og_name key of the rev_name filePath value
        // / becoz we didnt put in manifest
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}