"use strict";

/**
 * Steps loader.
 *
 * @module
 */

var self = exports;

self.__fs = require("fs");

self.__U = require("glace-utils");
self.__yaml = require("js-yaml");

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
    filePath = self.__U.defVal(filePath, CONF.gen.stepsFile);
    var data = self.__loadFile(filePath);
    return self.__getSteps(data);
};

/**
 * Loads steps file.
 *
 * @ignore
 * @function
 * @arg {string} filePath
 * @return {object[]}
 */
exports.__loadFile = filePath => {
    var data;
    if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
        data = self.__yaml.safeLoad(self.__fs.readFileSync(filePath, "utf8"));
    } else {
        data = self.__U.loadJson(filePath);
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
exports.__getSteps = data => {
    var ss = [];
    for (var d of data) {
        ss.push(new Step(d.name,
                         d.income,
                         d.outcome,
                         d.usage));
    };
    return ss;
};
