"use strict";

/**
 * Tests generator.
 *
 * @module
 */

var self = exports;

self.__U = require("glace-utils");

self.__loadSteps = require("./loader").loadSteps;
var Test = require("./test");

/**
 * Generates test cases.
 *
 * @function
 * @arg {object} opts - Options.
 * @arg {string} [opts.filter] - Chunk of step name to choose tests which
 *  contain this step.
 * @return {object[]} - List of generated tests and unused steps.
 */
exports.generate = opts => {

    opts = self.__U.defVal(opts, {});
    var filter = self.__U.defVal(opts.filter);

    var steps = self.__loadSteps();

    var tests = self.__generateTests(steps);
    var unusedSteps = self.__getUnusedSteps(steps);
    tests = self.__filterTests(tests, filter);
    return [tests, unusedSteps];
};

/**
 * Generates tests.
 *
 * @ignore
 * @function
 * @arg {Step[]} steps
 * @return {Test[]}
 */
exports.__generateTests = steps => {
    var tests = [new Test()];

    var isStarted = false;

    while (!isStarted || self.__changes(tests)) {
        isStarted = true;

        var tmp = tests;
        tests = [];

        for (var t of tmp) {
  
            var sameTest = true;

            for (var s of steps) {
                if (!t.mayAdd(s)) continue;

                var clone = t.clone();
                clone.add(s.clone());
                tests.push(clone);

                s.isUsed = true;
                sameTest = false;
            };

            if (sameTest) {
                t.commit();
                tests.push(t);
            };
        };
    };
    return tests;
};

/**
 * Gets unused steps
 *
 * @ignore
 * @function
 * @arg {Step[]} steps
 * @return {Step[]}
 */
exports.__getUnusedSteps = steps => {
    var ss = [];
    for (var s of steps) {
        if (!s.isUsed) ss.push(s);
    };
    return ss;
};

/**
 * Filters tests
 *
 * @ignore
 * @function
 * @arg {Test[]} tests
 * @arg {string} filter
 * @return {Test[]}
 */
exports.__filterTests = (tests, filter) => {
    if (!filter) return tests;
    var filtered = [];
    for (var t of tests) {
        var isMatched = false;

        for (var s of t.steps) {
            if (s.name.includes(filter)) {
                isMatched = true;
                break;
            };
        };

        if (isMatched) filtered.push(t);
    };
    return filtered;
};

/**
 * Defines whether there are changes in tests or no.
 *
 * @ignore
 * @function
 * @arg {Test[]}
 * @return {boolean}
 */
exports.__changes = tests => {
    for (var t of tests) {
        if (t.isChanged) return true;
    };
    return false;
};
