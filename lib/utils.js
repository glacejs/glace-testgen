"use strict";

/**
 * Generator utils.
 *
 * @module
 */

var fs = require("fs");

var _ = require("lodash");
var U = require("glace-utils");
var yaml = require("js-yaml");

/**
 * Defines whether step income is a part of test state.
 * 
 * @function
 * @arg {?object} dict - Test case state.
 * @arg {?object} sub - Step income state.
 * @return {boolean} `true` if it's a part, `false` otherwise.
 */
exports.isSub = (dict, sub) => {

    var _isSub = (dict, sub) => {
        var result;
        for (var [k, v] of Object.entries(sub)) {
            var val = dict[k];

            if (v === true) v = {};
            if (val === true) val = {};

            if (!v) v = false;
            if (!val) val = false;

            if (_.isObject(v) && _.isObject(val)) {
                result = _isSub(val, v);
            } else {
                result = val === v;
            };
            if (!result) return false;
        };
        return true;
    };

    if (!_.isObject(dict) || !_.isObject(sub)) {
        return false;
    };

    return _isSub(dict, sub);
};

exports.getDups = arr => {
    var dict = {}, dups =[];
    for (var a of arr) {
        if (dict[a]) {
            if (!dups.includes(a)) dups.push(a);
        } else {
            dict[a] = true;
        }
    }
    return dups;
};

/**
 * Loads steps file.
 *
 * @ignore
 * @function
 * @arg {string} filePath
 * @return {object[]}
 */
exports.loadFile = filePath => {
    var data;
    if (filePath.endsWith(".yml") || filePath.endsWith(".yaml")) {
        data = yaml.safeLoad(fs.readFileSync(filePath, "utf8"));
    } else {
        data = U.loadJson(filePath);
    };
    return data;
};
