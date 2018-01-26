"use strict";

var format = require("util").format;

var utils = require("../../lib/utils");

scope("utils", () => {

    test(".isSub()", () => {
        [
            [null, null, false],
            [{}, null, false],
            [null, {}, false],
            [{ app: true }, { app: true }, true],
            [{ app: { loaded: true }}, { app: true }, true],
            [{ app: true }, { app: { loaded: true }}, false],
            [{ app: { scene: { loaded: true }}}, { app: { scene: true }}, true],
        ].forEach(([dict, sub, res]) => {
            chunk(format(`returns ${res} for`, dict, '&', sub), () => {
                expect(utils.isSub(dict, sub)).to.be.equal(res);
            });
        });
    });
});
