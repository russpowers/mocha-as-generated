"use strict"

var path = require("path");
var Q = require("q");

var mochaPath = path.resolve(process.argv[1], "../..");
var Test = require(mochaPath).Test;

function dummyGeneratorResult() {
  return function(fn){
    fn(null, 25);
  }
}

describe('Generators', function () {
    describe('Return successfully', function () {

        it('Calls a generator function and returns with no error', function *(done) {
            var result = yield dummyGeneratorResult();
            result.should.equal(25);
            done();
        });

    });

    describe('Handle error with data', function () {

        var error;
        var test;

        beforeEach(function () {
            return test = new Test('', function *() {
                var result = yield dummyGeneratorResult();
                result.should.equal(35);
            });
        });


        it('Calls a generator function and assertion does not match', function *(done) {
            test.run(function (err) {
                err.actual.should.equal(25);
                err.expected.should.equal(35);
                done();
            });
        });

    });

    describe('Handle error with data', function () {

        var error;
        var test;

        beforeEach(function () {
            error = new TypeError('Leonidas!');
            return test = new Test('', function *() {
                throw error;
            });
        });


        it('Calls a generator function and with an error', function *(done) {
            test.run(function (err) {
                err.should.equal(error);
                done();
            });
        });

    });
});
