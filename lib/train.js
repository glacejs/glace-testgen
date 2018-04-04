"use strict";

var _ = require("lodash");

var utils = require("./utils");

var train = filePath => {
    var tests = utils.loadFile(filePath);
    var stepsCount = countSteps(tests);
    var bigrams = getNgrams(tests, 2);
    var trigrams = getNgrams(tests, 3);
    var result = {};
    _.merge(result, getWeights(stepsCount, bigrams));
    _.merge(result, getWeights(stepsCount, trigrams));
    return result;
};

var calcWeight = x => _.round(x / (1 + x) - 1 / (1.5 + x * x), 2);

var getWeights = (stepsCount, ngrams) => {
    var result = {};
    for (var [name, ngram] of Object.entries(ngrams)) {
        var x = 0;
        for (var s of ngram.steps) {
            x += stepsCount[s];
        }
        x = ngram.count * x / ngram.steps.length;
        result[name] = calcWeight(x);
    }
    return result;
};

var getNgrams = (tests, n) => {
    var ngrams = {};
    for (var steps of Object.values(tests)) {
        for (var i = 0; i < steps.length - n + 1; i++) {
            var ngram = [];
            for (var j = 0; j < n; j++) {
                ngram.push(steps[i+j]);
            };
            var key = ngram.join(" | ");
            if (key in ngrams) {
                ngrams[key] += 1;
            } else {
                ngrams[key] = {
                    count: 1,
                    steps: ngram,
                };
            }
        };
    };
    return ngrams;
};

var countSteps = tests => {
    var result = {};
    for (var steps of Object.values(tests)) {
        for (var step of steps) {
            result[step] = (result[step] || 0) + 1;
        }
    }
    return result;
};

module.exports = train;
