"use strict";

/**
 * Creates instance of step.
 *
 * @class
 * @classdesc Step data.
 * @arg {string} name - Step name.
 * @arg {object} income - Income state.
 * @arg {object} outcome - Outcome state.
 * @arg {number} [usage=1] - Usage number.
 * @prop {string} name - Step name.
 * @prop {object} income - Income state.
 * @prop {object} outcome - Outcome state.
 * @prop {number} [usage=1] - Usage number.
 */

var Step = function (name, income, outcome, usage) {
    this.name = name;
    this.income = income;
    this.outcome = outcome;
    this.usage = usage || 1;
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
                                this.usage);
};

module.exports = Step;
