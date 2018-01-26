"use strict";

var confPath = "../../lib/config";
var CONF = require(confPath);

var reloadConfig = () => {
    delete CONF.gen;
    delete require.cache[require.resolve(confPath)];
    CONF = require(confPath);
};

scope("test gen config", () => {

    beforeChunk(reloadConfig);

    test("with default values", () => {

        chunk("contains gen section", () => {
            expect(CONF.gen).to.exist;
        });

        chunk("doesn't have outFile", () => {
            expect(CONF.gen.outFile).to.not.exist;
        });

        chunk("doesn't have stepsFile", () => {
            delete CONF.args._;
            reloadConfig();
            expect(CONF.gen.stepsFile).to.not.exist;
        });

        chunk("doesn't have stepsUsage", () => {
            expect(CONF.gen.stepsUsage).to.not.exist;
        });
    });

    test("with option values", () => {

        chunk("has outFile", () => {
            CONF.args.file = "/path/to/out/file";
            reloadConfig();
            expect(CONF.gen.outFile).to.be.equal("/path/to/out/file.yml");
        });

        chunk("has stepsFile", () => {
            CONF.args._ = ["/path/to/steps/file"];
            reloadConfig();
            expect(CONF.gen.stepsFile).to.be.equal("/path/to/steps/file");
        });

        chunk("has stepsUsage", () => {
            CONF.args.usage = 1;
            reloadConfig();
            expect(CONF.gen.stepsUsage).to.be.equal(1);
        });
    });
});
