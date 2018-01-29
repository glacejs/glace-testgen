"use strict";

/**
 * Creates instance of step.
 *
 * @class
 * @name Step
 * @classdesc Step data.
 * @arg {string} name - Step name.
 * @arg {object} income - Income state.
 * @arg {object} outcome - Outcome state.
 * @arg {number} [usage=1] - Usage number.
 * @arg {string[]} [actions=[]] - Step actions.
 * @arg {string[]} [expected=[]] - Step expectations.
 * @arg {?string[]} [complete] - List of completenesses.
 * @arg {?string[]} [incomplete] - List of incompletenesses.
 * @arg {?string} [before] - Name of step, which should be executed after this.
 * @arg {?string} [after] - Name of step, which this step should be executed after.
 * @prop {string} name - Step name.
 * @prop {object} income - Income state.
 * @prop {object} outcome - Outcome state.
 * @prop {number} [usage=1] - Usage number.
 * @prop {number} [actions=[]] - Step actions.
 * @prop {string[]} [expected=[]] - Step expectations.
 * @prop {?string[]} [complete] - List of completenesses.
 * @prop {?string[]} [incomplete] - List of incompletenesses.
 * @prop {?string} [before] - Name of step, which should be executed after this.
 * @prop {?string} [after] - Name of step, which this step should be executed after.
 */

var _ = require("lodash");

var Step = function (name,
                     income,
                     outcome,
                     usage,
                     actions,
                     expected,
                     complete,
                     incomplete,
                     before,
                     after) {
    this.name = name;
    this.income = income;
    this.outcome = outcome;
    this.usage = usage || 1;
    this.actions = actions || [];
    this.expected = expected || [];
    this.complete = complete;
    this.incomplete = incomplete;
    this.before = before;
    this.after = after;
};

/**
 * Clones step.
 *
 * @method
 * @return {Step} New instance of step with the same parameters.
 */
Step.prototype.clone = function () {
    return new this.constructor(this.name,
                                _.cloneDeep(this.income),
                                _.cloneDeep(this.outcome),
                                this.usage,
                                _.clone(this.actions),
                                _.clone(this.expected),
                                _.clone(this.complete),
                                _.clone(this.incomplete),
                                this.before,
                                this.after);
};

module.exports = Step;
