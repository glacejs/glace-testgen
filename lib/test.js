"use strict";

/**
 * Creates instance of test.
 * 
 * @class
 * @classdesc Test case data structure which contains its current state and steps.
 * @name Test
 * @prop {boolean} [isChanged=false] - Flag whether test case is changed,
 *  for example, after step addition.
 * @prop {object} [state=null] - Current test case state.
 * @prop {Step[]} [steps=[]] - Test case steps.
 */

var _ = require("lodash");

var isSub = require("./utils").isSub;
var CONF = require("./config");

var Test = function () {
    this.isChanged = false;
    this.state = null;
    this.steps = [];
};

/**
 * Detect is it possible to add step or no.
 *
 * @method
 * @arg {Step} step - Verified step.
 * @return {boolean} `true` if possible, `false` otherwise.
 */
Test.prototype.mayAdd = function (step) {
    // FIXME don't add steps if test case is finished
    if (this.state == null && this.steps.length) return false;
    var isState = this.state == step.income || isSub(this.state, step.income);

    if (!isState) return false;
    return this._amount(step) < (CONF.gen.stepsUsage || step.usage);
};

/**
 * Adds step to test case.
 *
 * @method
 * @arg {Step} step - Added step.
 */
Test.prototype.add = function (step) {
    if (_.isObject(this.state) && _.isObject(step.outcome)) {
        _.merge(this.state, step.outcome);
    } else {
        this.state = step.outcome;
    };
    this.steps.push(step);
    this.isChanged = true;
};

/**
 * Clones test case.
 *
 * @method
 * @return {Test} New instance of test with the same parameters.
 */
Test.prototype.clone = function () {
    var c = new this.constructor();
    c.isChanged = this.isChanged;
    c.state = _.cloneDeep(this.state);
    c.steps = this.steps.map(s => s.clone());
    return c;
};

/**
 * Commits test case and flushes changes state.
 *
 * @method
 */
Test.prototype.commit = function () {
    this.isChanged = false;
};

/**
 * Calculates number of step usage in test case.
 *
 * @method
 * @arg {Step} step - Step which usage is calculated in test case.
 * @return {number} Number of step usage.
 */
Test.prototype._amount = function (step) {
    return this.steps.filter(s => s.name === step.name).length;
};

module.exports = Test;
