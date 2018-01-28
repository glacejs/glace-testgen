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
 * @prop {string} name - Step name.
 * @prop {object} income - Income state.
 * @prop {object} outcome - Outcome state.
 * @prop {number} [usage=1] - Usage number.
 * @prop {number} [actions=[]] - Step actions.
 * @prop {string[]} [expected=[]] - Step expectations.
 */

var _ = require("lodash");

var Step = function (name, income, outcome, usage, actions, expected) {
    this.name = name;
    this.income = income;
    this.outcome = outcome;
    this.usage = usage || 1;
    this.actions = actions || [];
    this.expected = expected || [];
};

/**
 * Clones step.
 *
 * @method
 * @return {Step} New instance of step with the same parameters.
 */
Step.prototype.clone = function () {
    return new this.constructor(this.name,
                                this.income,
                                this.outcome,
                                this.usage,
                                _.cloneDeep(this.actions),
                                _.cloneDeep(this.expected));
};

module.exports = Step;
