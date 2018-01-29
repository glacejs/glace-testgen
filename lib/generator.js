"use strict";

/**
 * Tests generator.
 *
 * @module
 */

var U = require("glace-utils");

var CONF = require("./config");
var loadSteps = require("./loader").loadSteps;
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

    opts = U.defVal(opts, {});
    var filter = U.defVal(opts.filter);

    var steps = loadSteps();

    var tests = generateTests(steps);
    tests = filterByUniqSteps(tests);
    var unusedSteps = getUnusedSteps(steps, tests);
    tests = filterTests(tests, filter);
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
var generateTests = steps => {
    var tests = [new Test()];

    var checkLimit = () => {
        if (tests.length > CONF.gen.testsLimit) {
            throw new Error(
                `Tests amount exceeded limit ${CONF.gen.testsLimit}. ` +
                `Try to add more restricted rules.`);
        };
    };

    var isStarted = false;

    while (!isStarted || changes(tests)) {
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
                checkLimit();

                sameTest = false;
            };

            if (sameTest) {
                t.commit();
                tests.push(t);
                checkLimit();
            };
        };
    };

    return tests.filter(t => !t.incomplete.length);
};

/**
 * Filters tests by unique steps sequence.
 *
 * @ignore
 * @function
 * @arg {Test[]} tests
 * @return {Test[]}
 */
var filterByUniqSteps = tests => {
    var stepsUniq = CONF.gen.stepsUniq;

    tests.sort((a, b) => b.steps.length - a.steps.length);

    if (stepsUniq) {
        var stepNames = [];
        var tmp = [];

        for (var t of tests) {

            if (t.steps.length <= stepsUniq) {
                tmp.push(t);
                continue;
            };

            var isPresent = true;
            for (var i = 0; i < t.steps.length - stepsUniq + 1; i++) {

                var sName = "";
                for (var j = 0; j < stepsUniq; j++) {
                    sName += " " + t.steps[i+j].name;
                };

                if (!stepNames.includes(sName)) {
                    stepNames.push(sName);
                    isPresent = false;
                };
            };
            if (!isPresent) tmp.push(t);
        };
        tests = tmp;
    };

    tests.sort((a, b) => a.steps.length - b.steps.length);
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
var getUnusedSteps = (steps, tests) => {
    var ss = [];

    var stepNames = [];
    for (var t of tests) {
        for (var s of t.steps) {
            if (!stepNames.includes(s.name)) {
                stepNames.push(s.name);
            };
        };
    };

    for (var step of steps) {
        if (!stepNames.includes(step.name)) {
            ss.push(step);
        };
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
var filterTests = (tests, filter) => {
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
var changes = tests => {
    for (var t of tests) {
        if (t.isChanged) return true;
    };
    return false;
};
