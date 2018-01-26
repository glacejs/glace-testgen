"use strict";

/**
 * Generator utils.
 *
 * @module
 */

var _ = require("lodash");

/**
 * Defines is step income is a part of test state.
 * 
 * @function
 * @arg {?object} dict - Test case state.
 * @arg {?object} sub - Step income state.
 * @return {boolean} `true` if it's a part, `false` otherwise.
 */
exports.isSub = (dict, sub) => {

    var _isSub = (dict, sub) => {
        for (var [k, v] of Object.entries(sub)) {
            var val = dict[k];

            if (v === true) v = {};
            if (val === true) val = {};

            if (!v) v = false;
            if (!val) val = false;

            if (_.isObject(v) && _.isObject(val)) {
                var result = _isSub(val, v);
            } else {
                var result = val === v;
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
