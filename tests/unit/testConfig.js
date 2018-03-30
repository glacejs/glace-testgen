"use strict";

var confPath = "../../lib/config";
var CONF = rewire(confPath);

var reloadConfig = () => {
    delete CONF.gen;
    CONF = rewire(confPath);
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

        chunk("doesn't have stepsUsage", () => {
            expect(CONF.gen.stepsUsage).to.not.exist;
        });

        chunk("doesn't have filter", () => {
            expect(CONF.gen.filter).to.not.exist;
        });

        chunk("doesn't have namesOnly", () => {
            expect(CONF.gen.namesOnly).to.be.false;
        });

        chunk("doesn't have stepsUniq", () => {
            expect(CONF.gen.stepsUniq).to.be.equal(0);
        });

        chunk("has default testsLimit", () => {
            expect(CONF.gen.testsLimit).to.be.equal(1000000);
        });
    });

    test("with option values", () => {

        chunk("has outFile", () => {
            CONF.args.genOutputFile = "/path/to/out/file";
            reloadConfig();
            expect(CONF.gen.outFile).to.be.equal("/path/to/out/file.yml");
        });

        chunk("has stepsUsage", () => {
            CONF.args.genStepsUsage = 1;
            reloadConfig();
            expect(CONF.gen.stepsUsage).to.be.equal(1);
        });

        chunk("has filter", () => {
            CONF.args.genStepsFilter = "filter";
            reloadConfig();
            expect(CONF.gen.filter).to.be.equal("filter");
        });

        chunk("has namesOnly", () => {
            CONF.args.genNamesOnly = true;
            reloadConfig();
            expect(CONF.gen.namesOnly).to.be.true;
        });

        chunk("has stepsUniq", () => {
            CONF.args.genStepsUniq = 1;
            reloadConfig();
            expect(CONF.gen.stepsUniq).to.be.equal(1);
        });

        chunk("has custom testsLimit", () => {
            CONF.args.genTestsLimit = 1;
            reloadConfig();
            expect(CONF.gen.testsLimit).to.be.equal(1);
        });
    });
});
