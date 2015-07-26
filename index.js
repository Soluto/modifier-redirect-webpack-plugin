var path = require("path");

function ModifierRedirectResolver(modifier) {
    this.modifier = modifier;
}

ModifierRedirectResolver.prototype.apply = function(resolver) {
    var modifier = this.modifier;

    if (!modifier)
        return;

    var internalResolver = resolver.resolve;

    resolver.resolve = function resolve(context, request, callback) {

        var modifiedRequest = request;

        if (shouldTryToModify({context: context})) {

            modifiedRequest = getResourceWithModifier(request, modifier);

            internalResolver.call(resolver, context, modifiedRequest, function(err, result) {
                if (!err) {
                    callback(err, result);
                }
                else {
                    internalResolver.call(resolver, context, request, callback);
                }
            });
        }
        else {
            internalResolver.call(resolver, context, request, callback);
        }
    };
};

function shouldTryToModify(result) {
    // Checks that the require didn't come from inside a node_module dependency, we'll need to enhance this later
    return result.context.indexOf("node_modules") == -1;
}

function getResourceWithModifier(resource, modifier) {
    var fileWithoutExt = resource.substring(0, resource.length - path.extname(resource).length);

    return fileWithoutExt + "-" + modifier + path.extname(resource);
}

module.exports = ModifierRedirectResolver;
