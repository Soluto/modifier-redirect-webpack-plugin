# Modifier Redirect Webpack plugin

A plugin for webpack that redirects requires to the same resource but with a modifier, if it exists.

## Purpose 

This plugin is meant for systems where you want multiple bundles from the same entry point, but for them to take different files. 
Whether it's for HTML templates, images or changes in CSS. 

## Usage

The usage is a simple addition to `webpack.config.js`:

    var ModifierRedirectPlugin = require('modifier-redirect-webpack-plugin');

    module.exports = {
      ...
      plugins: [
        new ModifierRedirectPlugin("myModifier")
      ]
    }


## Example 

Assuming we have the following file structure in the project: 

    app/
        templates/
            myComponent.html
            myComponent-customer1.html
            myComponent-customer2.html
        index.js

And in the `main.js`: 

    var template = require('templates/myComponent.html');
    
    document.findElementsByName("body")[0].append(template);
    
then in the `webpack.config.js` we can use it like so:
           
    const VARIATION = "customer1"
    
    var ModifierRedirectPlugin = require('modifier-redirect-webpack-plugin');
    
    module.exports = {
     ...
     plugins: [
       new ModifierRedirectPlugin(VARIATION)
     ]

Now, if you change VARIATION to different values, the bundle will take the matching file or `myComponent.html` as a fallback
