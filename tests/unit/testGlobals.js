"use strict";

suite("globals", () => {

    test("import", () => {

        chunk("doesn't affect test targets", () => {
            CONF.gen.use = false;
            CONF.test.dirs = ["/path/to/my/tests"];
            rewire("../../lib/globals");
            expect(CONF.test.dirs).to.have.length(1);
            expect(CONF.test.dirs[0]).to.be.equal("/path/to/my/tests");
        });

        chunk("uses only generated autotests", () => {
            CONF.gen.use = true;
            CONF.gen.testsOnly = true;
            CONF.test.dirs = ["/path/to/my/tests"];
            rewire("../../lib/globals");
            expect(CONF.test.dirs).to.have.length(1);
            expect(CONF.test.dirs[0]).to.endWith("autotests.js");
        });

        chunk("use generated autotests with other targets", () => {
            CONF.gen.use = true;
            CONF.gen.testsOnly = false;
            CONF.test.dirs = ["/path/to/my/tests"];
            rewire("../../lib/globals");
            expect(CONF.test.dirs).to.have.length(2);
            expect(CONF.test.dirs[0]).to.be.equal("/path/to/my/tests");
            expect(CONF.test.dirs[1]).to.endWith("autotests.js");
        });
    });
});
