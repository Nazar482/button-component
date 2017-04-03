# Button component, test task for Attendify

# How to set up locally

Before get started you need to have locally installed `npm`, `bower` and `gulp` executables.

install nodejs - https://nodejs.org/en/ and then write commands in console
```shell
npm install
npm install -g bower
npm install --global gulp-cli
```
# How to build

To build ready to-use static html, minified js and css files you need to execute the following command:
```shell
gulp build
```
To run project on localhost you need to execute the following command:
```shell
gulp default
```
# Structure

* *src/* - source files
* *build/* - compiled files
* *bower_components* - components we use in our project

* *src/scss/base/ - base styles for page
* *src/scss/components/ - our button component
* *src/scss/mixins/ - our mixin for button component
* *src/scss/partials/ - base styles for header, footer
* *src/scss/main.scss - our main file with includes

* *src/templates/index.pug - our main file with markup
