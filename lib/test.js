"use strict";

/**
 * Creates instance of test.
 * 
 * @class
 * @classdesc Test case data structure which contains its current state and steps.
 * @name Test
 * @prop {boolean} [isChanged=false] - Flag whether test case is changed,
 *  for example, after step addition.
 * @prop {object} [state={}] - Current test case state.
 * @prop {Step[]} [steps=[]] - Test case steps.
 * @prop {string[]} [incomplete=[]] - Test case incompletenesses.
 */

var _ = require("lodash");

var isSub = require("./utils").isSub;
var CONF = require("./config");

var Test = function () {
    this.isChanged = false;
    this.state = {};
    this.steps = [];
    this.incomplete = [];
};

/**
 * Detects whether it's possible to add step to test case or no.
 *
 * @method
 * @arg {Step} step - Step to check.
 * @return {boolean} `true` if it's possible, `false` otherwise.
 */
Test.prototype.mayAdd = function (step) {

    /* add step if it should after last step in test */
    if (this.steps.length &&
            this.steps[this.steps.length - 1].name === step.after) {
        return true;
    };

    if (this.steps.length &&
            this.steps[this.steps.length - 1].before === step.name) {
        return true;
    };

    /* don't add step if test case is finished */
    if (this.state === null && this.steps.length) return false;

    /* don't add step if its limit is exhausted */
    if (this._amount(step) >= (CONF.gen.stepsUsage || step.usage)) return false;

    /* if step has completeness it should be matches test incompleteness */
    if (step.complete) {
        var isEqual = true;
        var i = 0;
        var complete = _.clone(step.complete).reverse();
        for (var cmpl of complete) {
            var testCmpl = this.incomplete[i++];
            if (cmpl !== testCmpl) {
                isEqual = false;
                break;
            };
        };
        if (!isEqual) return false;
    };

    return isSub(this.state, step.income || {});
};

/**
 * Adds step to test case.
 *
 * @method
 * @arg {Step} step - Added step.
 */
Test.prototype.add = function (step) {

    this.steps.push(step);
    this.isChanged = true;

    /**
     * Don't merge states, if there were steps before addition and state is
     * finished. It means, that this step was added explicitly via keywords
     * `before` or `after`.
     */
    if (this.state === null && this.steps.length > 1) return;

    var outcome = step.outcome === undefined ? {} : step.outcome;

    if (_.isObject(this.state) && _.isObject(outcome)) {
        _.merge(this.state, outcome);
    } else {
        this.state = outcome;
    };

    if (step.complete) {
        this.incomplete = this.incomplete.slice(step.complete.length,
            this.incomplete.length);
    };

    if (step.incomplete) {
        this.incomplete = this.incomplete.concat(step.incomplete);
    };
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
    c.incomplete = _.clone(this.incomplete);
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
