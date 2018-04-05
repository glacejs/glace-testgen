"use strict";

require("colors");
var _ = require("lodash");
var prettyms = require("pretty-ms");

var utils = require("./utils");

var train = filePath => {
    var startTime = new Date();
    console.log("Training model...".yellow);
    var tests = utils.loadFile(filePath);
    var stepsCount = countSteps(tests);
    var bias = calcBias(stepsCount);
    var bigrams = getNgrams(tests, 2);
    var trigrams = getNgrams(tests, 3);
    var result = {};
    _.merge(result, getWeights(stepsCount, bigrams, bias));
    _.merge(result, getWeights(stepsCount, trigrams, bias));
    console.log(`Model is trained during ${prettyms(new Date() - startTime)}`.yellow);
    return result;
};

var calcBias = stepsCount => {
    var counter = {};
    for (var i of Object.values(stepsCount)) {
        counter[i] = (counter[i] || 0) + 1;
    }

    var weights = [];
    for (var [k, v] of Object.entries(counter)) {
        weights.push(k * v);
    }
    weights.sort((a, b) => a - b);

    var bias = Object.keys(counter)[0] || 1, diff = 0;
    for (var j = 0; j < weights.length - 1; j++) {
        var a = weights[j], b = weights[j + 1];
        var d = b / a;
        if (d > diff) {
            diff = d;
            bias = a;
        }
    }
    return bias;
};

var calcWeight = x => x / (1 + x);

var getWeights = (stepsCount, ngrams, bias) => {
    var dim, del;
    var result = {};
    for (var [name, ngram] of Object.entries(ngrams)) {

        if (!dim) {
            dim = ngram.steps.length;
            del = Math.pow(2, dim - 2);
        }

        var x = ngram.count;
        for (var s of ngram.steps) {
            x += (stepsCount[s] - ngram.count) / dim;
        }
        x = x / bias;

        result[name] = _.round(calcWeight(x) / del, 3);
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
                ngrams[key].count += 1;
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
