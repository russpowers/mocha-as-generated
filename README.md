# Generator & Promise-Returning Tests for Mocha

So you really like [Mocha][]. But you also really like [generators][] & [promises][]. And you'd like to see
[support in Mocha][mocha-issue] for the promise-returning test style found in [Buster][] and others, i.e. stuff like

```js

it("should be fulfilled with 5", function *() {
    var num = yield getNum(5);
    result.should.equal(5);
});

it("should be fulfilled with 5", function () {
    return promise.then(function (result) {
        return result.should.equal(5);
    });
});
```

## Origin Note

This is a fork of the [mocha-as-promised][https://github.com/domenic/mocha-as-promised] repo, but extended to also allow the use of generator functions as well.

## How to Use

Once you install and set up Mocha as Generated, you now have another way of creating asynchronous tests, besides Mocha's
usual `done`-callback style or Mocha-As-generated's promise style. Just return a generator and use yields like you would expect.


Moch as Generated works with all Mocha interfaces: BDD, TDD, QUnit, whatever. It hooks in at such a low level, the
interfaces don't even get involved.

## Installation and Usage

### Node

Do an `npm install mocha-as-generated --save-dev` to get up and running. Then:

```javascript
require("mocha-as-generated")();
```

You can of course put this code in a common test fixture file.

### AMD

Mocha as Generated supports being used as an AMD module, registering itself anonymously. So, assuming you have
configured your loader to map the Mocha and Mocha as Generated files to the respective module IDs `"mocha"` and
`"mocha-as-generated"`, you can use them as follows:

```javascript
define(function (require, exports, module) {
    var mocha = require("mocha");
    var mochaAsGenerated = require("mocha-as-generated");

    mochaAsGenerated([mocha]);
});
```

### `<script>` tag

If you include Mocha as Generated directly with a `<script>` tag, after the one for Mocha itself, then it will
automatically plug in to Mocha and be ready for use:

```html
<script src="mocha.js"></script>
<script src="mocha-as-generated.js"></script>
```

### Node, the Advanced Version

The `require("mocha-as-generated")()` above tries to detect which instance of Mocha is being used automatically. This
way, Mocha as Generated can plug into either the local Mocha instance installed into your project, or into the global
Mocha instance if you're running your tests using the globally-installed command-line runner.

In some cases, if you're doing something weird, this can fall down. In these cases, you can pass an array of Mocha
instances into the Mocha as Generated function. For example, if you somehow had your Mocha module as a property of the
`foo` module, instead of it being found in the usual npm directory structures, you would do

```javascript
require("mocha-as-generated")([require("foo").MyMocha]);
```

