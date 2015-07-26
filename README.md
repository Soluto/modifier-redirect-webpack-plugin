# Modifier Redirect Resolver Webpack plugin

A resolver plugin for webpack that tries to get the resource with a modifier before getting the requested resource.

## Purpose 

This plugin is meant for systems where you want multiple bundles from the same entry point, but for them to take different files for different configurations. 
Whether it's for HTML templates, images or changes in CSS. 

This can be used for localization, for customer branding changes and more.


## Example 

In the following project structure: 

    app/
        templates/
            myComponent.html
            myComponent-fr.html
            myComponent-he.html

Without the plugin, `require('app/templates/myComponent.html')` will return `myComponent.html`. 
 
But if in `webpack.config.js` we can use the plugin like so:
           
    var ModifierRedirectPlugin = require('modifier-redirect-webpack-plugin');
    
    module.exports = {
        ...
        plugins: [
            new webpack.ResolverPlugin([
                new ModifierRedirectPlugin("fr")
            ])
        ]
        ...
    }

This will make `require('app/templates/myComponent.html')` return the content of `myComponent-fr.html`.
