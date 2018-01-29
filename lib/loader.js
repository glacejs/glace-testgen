"use strict";

/**
 * Steps loader.
 *
 * @module
 */

var fs = require("fs");

var U = require("glace-utils");
var yaml = require("js-yaml");

var CONF = require("./config");
var Step = require("./step");

/**
 * Loads steps from file.
 *
 * @function
 * @arg {string} filePath - Path to file.
 * @return {Step[]} List of steps.
 */
exports.loadSteps = filePath => {
    filePath = U.defVal(filePath, CONF.gen.stepsFile);
    var data = loadFile(filePath);
    return getSteps(data);
};

/**
 * Loads steps file.
 *
 * @ignore
 * @function
 * @arg {string} filePath
 * @return {object[]}
 */
var loadFile = filePath => {
    var data;
    if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
        data = yaml.safeLoad(fs.readFileSync(filePath, "utf8"));
    } else {
        data = U.loadJson(filePath);
    };
    return data;
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
