The first thing you’ll need to do for any modern JavaScript application is create a *package.json* file in the top level of your project.  This fulfils a similar purpose to a POM file, gradle.properties file, requirements.txt, etc.  You can either create one by hand or get npm to do this for you by running `npm init`.  For now I would suggest doing it by hand as you won’t need a lot of the fields `npm init` creates.

```javascript
{
 "name": "back-end-intro-to-js-part-one",
 "version": "1.0.0",
 "description": "An introduction to JS for back-end programmers."
}
```

Having created a package.json you can start using npm to install packages.  To use ES6 syntax you will need a transpiler like Babel, so we will install the Babel CLI.  This is pretty straight forward:

`npm install babel-cli`

This will install the Babel CLI.  You should be able to see it in the *node_modules* folder that npm has created.  However, this has only installed it locally.  If someone checks your project out from Git, they will have to run the same command.  The solution to this is to record babel as a dependency in your *package.json* file.  The easiest way to do this is via the *--save* and *--save-dev* flags of the `npm install` command.  As Babel is a development dependency (i.e. it is a tool used at development time and isn’t actually included in your final code), we will use the *--save-dev* flag.

`npm install babel-cli --save-dev`

Your package.json file should now look like this:
```javascript
{
 "name": "back-end-intro-to-js-part-one",
 "version": "1.0.0",
 "description": "An introduction to JS for back-end programmers.",
 "devDependencies": {
   "babel-cli": "^6.7.7"
 }
}
```
A devDependences section has been created, and Babel CLI plus a version number has been specified.  Running `npm install`, which installs all dependencies in the *package.json* file, will now install that version of Babel CLI.  The caret (^) in the version number means that only the major version number is fixed, i.e. the latest 6.x.x version will be installed.

Okay, great, we’ve got Babel installed, and anyone who checks out our project will be able to install the same version by running `npm install`.  How do we use it?  First, we’ll need some JavaScript to transpile.  Create a JavaScript file.  This can be named whatever you like, but for this example we’ll call it *index.js*.  We’ll also place it in a folder called *src*, to better organise our project.  We’ll create a class in this file (*src/index.js*).
```javascript
class Example {

}
```
Now let’s run Babel on this file.

`babel src/index.js`

This will output the transpiled code to the console.  You may notice that nothing has actually changed.  This is because we need to configure Babel with some plugins to handle our specific transpilation requirements.  We’ll need to create a *.babelrc* file in the top level of the project to specify these.
```javascript
{
  "presets": [
    "es2015",
  ],
  "plugins": []
}
```
As well as being able to specify an array of plugins individually, Babel also has the concept of presets, which are bundles of plugins.  Here we specify the ES2015 (a.k.a. ES6) preset. We’ll also have to actually install the ES6 preset like so:

`npm install babel-preset-es2015 --save-dev`

Running the *babel src/index.js* command from earlier should now produce different output: valid ES5.  It’s not much use on the console though, so we’ll want to modify our Babel command to output to a file instead.  Again, this output file can be wherever you want, but for this example we’ll output to file called *index.js* in a folder called *build*.  These will be created by Babel so you don’t have to worry about creating them beforehand.

`babel src/index.js --out-file build/index.js`

Now let’s say we create another file, *hello.js*, and place this in the *src* folder.
```javascript
const hello = () => console.log('hello');
```
We don’t want to have to individually transpile each file, so instead we can ask Babel to run on the whole source folder.

`babel src --out-dir build`

Notice we now use the *--out-dir* flag to specify an output directory.  Files from the *src* folder will now be transpiled and outputted to the *build* folder with the same name.  After running this, you should therefore see both *index.js* and *hello.js* in the *build* folder.  Wouldn’t it be great if this automatically happened any time we changed a file in the *src* folder?  We can use the *--watch* flag to achieve this behaviour:

`babel --watch src --out-dir build`

We’re pretty much sorted with Babel now.  There’s one more thing we can do to make our lives easier.  Rather than having to remember/copy paste/type out our Babel command every time, it would be nice if we could just tell npm to build our project.  We can add a "scripts" property to our *package.json* file, and add a command like so:
```javascript
{
  "name": "back-end-intro-to-js-part-one",
  "version": "1.0.0",
  "scripts": {
    "build": "babel src --out-dir build",
  },
  "devDependencies": {
    "babel-cli": "^6.7.7",
    "babel-preset-es2015": "^6.6.0"
  }
}
```
The key is the script name (*build*) and the value is the command to execute (*babel src --out-dir build*).  You can run the script via `npm run [script_name_here]`, so in this case, `npm run build`.  You could also add the watch script from earlier in the same way:
```javascript
{
  "name": "back-end-intro-to-js-part-one",
  "version": "1.0.0",
  "scripts": {
    "build": "babel src --out-dir build",
    "watch": "babel --watch src --out-dir build"
  },
  "devDependencies": {
    "babel-cli": "^6.7.7",
    "babel-preset-es2015": "^6.6.0"
  }
}
```
This tutorial has hopefully shown a good starting point for your JavaScript toolchain.  With Babel set up, you can now write up to date JS without worrying about browser compatibility.  For simple projects this might be enough, but when things start getting more complex you'll find yourself reaching for modularisation and testing.  Further articles and tutorials in this series will cover those topics.    
