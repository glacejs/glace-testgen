"use strict";

/**
 * `Glace testgen` globals.
 *
 * @module
 */

const path = require("path");

const CONF = require("./config");

if (CONF.gen.use) {
    const _path = path.resolve(__dirname, "autotests.js");
    if (CONF.gen.testsOnly) {
        CONF.test.dirs = [_path];
    } else {
        CONF.test.dirs.push(_path);
    };
};
