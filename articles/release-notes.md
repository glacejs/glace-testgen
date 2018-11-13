### v1.1.7

- Updated dependencies.

### v1.1.6

- Updated `glace-core`.
- Started to use `$` only.

### v1.1.5

- Migrated to new `glace-core`.

### v1.1.4

- Updated dependencies.

### v1.1.2

- [Replaced](https://github.com/glacejs/glace-testgen/commit/a8f5a4463b13545539b95f153970622df920ff1b) `scope` with `suite` in autotests launcher.

### v1.1.1

- [Fixed](https://github.com/glacejs/glace-testgen/commit/38ae40b93bcc0934dc1e14082e6b14d643908f59) weights formula.

### v1.1.0

- [Added](https://github.com/glacejs/glace-testgen/commit/93000f81e1d452a1140a92d5b21af567802e3211) CLI option to reverse order of generated tests.

### v1.0.9

- [Fixed](https://github.com/glacejs/glace-testgen/commit/88420bc50b037bcf467decb984d0dbe1122950da) bias formula.
- [Removed](https://github.com/glacejs/glace-testgen/commit/9fedac0186b86c580ad85c74507645459ffdbbc2) unused dependencies.

### v1.0.8

- [Updated](https://github.com/glacejs/glace-testgen/commit/f96d26194b3bc7315ba5e3fa885d1a8b6d2f5c81) training coefficients algo.
- [Fixed](https://github.com/glacejs/glace-testgen/commit/f289142d19af7e678f5475ded749e76a2badb300) tests maximum value.
- [Used](https://github.com/glacejs/glace-testgen/commit/9a3efb62bf7267da1405f52fb8762483c480a52b) optional tests shuffle before generating iteration.

### v1.0.7

- [Provided](https://github.com/glacejs/glace-testgen/commit/f1c994a8d12d18db5455a6b302d9c9bc8f6223c8) CLI option to restrict amount of final tests.

### v1.0.6

- [Train](https://github.com/glacejs/glace-testgen/commit/925c49a9b57d7175d4668cffd15bb6f69927f33c) model for generating.
- [Load](https://github.com/glacejs/glace-testgen/commit/dafa63336d669491a2b25cd6d40a0aef7f505f7c) pretrained model.

### v1.0.5

- Print info about pregenerated tests loading.

### v1.0.4

- [Fixed](https://github.com/glacejs/glace-testgen/commit/1a3b9dcad8b6202af9bebdf21b330cf60811fcb8) error to load pregenerated tests.

### v1.0.3

- [Shuffle](https://github.com/glacejs/glace-testgen/commit/f327d5fa4c934367d104aded994b507b2d521fbf) tests in generating optionally.

### v1.0.2

- [Skip](https://github.com/glacejs/glace-testgen/commit/ae0bca11d91388256a00cc1b5931adf2d1e73b92) chunk in debug mode too.

### v1.0.1

- [Fixed](https://github.com/glacejs/glace-testgen/commit/329f928015bc9209f4dcd0f3ed1f604dfaf83570) mislogic in steps adding.

### v1.0.0

- [Limit](https://github.com/glacejs/glace-testgen/commit/211e06f7da8480e973d0a5d73014554f938f34df) generated tests.
- [Support](https://github.com/glacejs/glace-testgen/commit/337437cc461b8d83b10d7e0530e009e70e4b7210) pregenerated tests loading.

### v0.1.0

- Fixed logic typo in generator.

### v0.0.9

- Some fixes and checks in steps files.

### v0.0.8

- Fixed bug with steps file cli option order.

### v0.0.7

- [Added](https://github.com/glacejs/glace-testgen/commit/3492d7b3eb8fd568e0251d850d6d9ac29ffc647b) proactive filtering for unique steps.

### v0.0.6

- [Added](https://github.com/glacejs/glace-testgen/commit/49b0f1ffbfdd414806ff70b4b553ee490d10ddc4) project workflow commands.

### v0.0.5

- [Fixed](https://github.com/glacejs/glace-testgen/commit/5659d81a942ec2d165cece9e31aceeb1f39891ac) bug that `testgen` was activated always as `glace` plugin.

### v0.0.4

- [Use](https://github.com/glacejs/glace-testgen/commit/d97310351d2700364d4da5850a0e9e2ea8b0935d) tests generator as [glace](https://glacejs.github.io/glace-core/index.html) plugin.

### v0.0.3

- Fix bug that console utility `test-gen` wasn't defined.

### v0.0.2

- Added feature to support step actions and expectations in generator

### v0.0.1

- Implemented `test-gen` utility to generate positive test cases for manual testing.
- Added filter by step name of generated tests.
