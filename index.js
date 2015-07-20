var path = require("path");
var fs = require('fs');

function ModifierRedirectPlugin(modifier) {
    this.modifier = modifier;
}

ModifierRedirectPlugin.prototype.apply = function(compiler) {
    var modifier = this.modifier;

    if (!modifier)
        return;

    var tryToModify = function (result, callback) {
        if (shouldTryToModify(result)) {
            var modifiedResource = getResourceWithModifier(result.request, modifier);

            if (fs.existsSync(modifiedResource)) {
                result.request = modifiedResource;
            }
        }

        return callback(null, result);
    };

    // Attach the behavior to the resolve hooks in webpack
    compiler.plugin("normal-module-factory", function (nmf) {
        nmf.plugin("before-resolve", tryToModify);
        nmf.plugin("after-resolve", tryToModify);
    });
};

function shouldTryToModify(result) {
    // Checks that the require didn't come from inside a node_module dependency, we'll need to enhance this later
    return result.context.indexOf("node_modules") == -1;
}

function getResourceWithModifier(resource, modifier) {
    var fileWithoutExt = resource.substring(0, resource.length - path.extname(resource).length);

    return fileWithoutExt + "-" + modifier + path.extname(resource);
}

module.exports = ModifierRedirectPlugin;
