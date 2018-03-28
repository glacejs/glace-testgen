"use strict";

/**
 * Steps loader.
 *
 * @module
 */

var U = require("glace-utils");

var CONF = require("./config");
var Step = require("./step");
var utils = require("./utils");

/**
 * Loads steps from file.
 *
 * @function
 * @arg {string} filePath - List of file paths.
 * @return {Step[]} List of steps.
 */
exports.loadSteps = filePaths => {
    filePaths = U.defVal(filePaths, CONF.gen.stepsFiles);

    var bucket = [];

    for (var filePath of filePaths.reverse()) {
        var data = utils.loadFile(filePath).reverse();
        checkData(filePath, data);
        mergeSteps(bucket, data);
    }

    return getSteps(bucket.reverse());
};

var mergeSteps = (ss1, ss2) => {
    var s;
    var names = ss1.map(s => s.name);
    for (s of ss2) {
        if (names.includes(s.name)) continue;
        ss1.push(s);
    }
};

/**
 * Checks steps consistency.
 *
 * @ignore
 */
var checkData = (file, data) => {
    var dups = utils.getDups(data.map(d => d.name));
    if (dups.length) {
        throw new Error(`${file} contains duplicated steps: ${dups.join(", ")}`);
    }
};

/**
 * Gets steps.
 *
 * @ignore
 * @function
 * @arg {object[]} data
 * @return {Step[]} 
 */
var getSteps = data => {
    var ss = [];
    for (var d of data) {
        ss.push(new Step(d.name,
            d.income,
            d.outcome,
            d.usage,
            d.do,
            d.expected,
            d.complete,
            d.incomplete,
            d.before,
            d.after));
    };
    return ss;
};
