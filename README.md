[![Build Status](https://travis-ci.org/glacejs/glace-testgen.svg?branch=master)](https://travis-ci.org/glacejs/glace-testgen)
 | [Source Code](https://github.com/glacejs/glace-testgen)
 | [Release Notes](tutorial-release-notes.html)

# GlaceJS Tests Generator

## Annotation

**Tests Generator creates manual or automated test scenarios from steps description.**

## Features

- Tests generating via graph traversal and rules management.
- [Machine learning in tests building](tutorial-machine-learning.html) via [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) based approach.

## Installation

```
npm i -g glace-testgen
```

Utility `test-gen` will be available in console then.

## Quick Start

1. Create file `steps.yml` and fill with content:

    ```
    -
      name: open app
      income: null
      outcome:
        app: true
    -
      name: authenticate
      income:
        app: true
      outcome:
        app:
          auth: true
    -
      name: close app
      income: 
        app: true
      outcome: null
    ```

1. Launch console and execute command:

    ```
    test-gen /path/to/steps.yml
    ```

1. It will generate next scenarios:

    ```
    Test case 1:
      - open app
      - authenticate
      - close app

    Test case 2:
      - open app
      - close app
    ```

1. Example of glace-js [steps description](https://github.com/glacejs/glace-js/blob/master/tests/e2e.steps.yaml) for autotests generating.

1. Example of glace-proxy [steps description](https://github.com/glacejs/glace-proxy/blob/master/tests/e2e.steps.yaml) for autotests generating.

1. More details about steps description you may find [here](tutorial-steps-description.html).

## Console Options

Utility usage:

```
test-gen path/to/steps/file [options]
```

Steps file may be `.json` or `.yaml` (`.yml`).

`Arguments:`

- `--config [path], -c` - Path to JSON file with CLI arguments. Default is `cwd/config.json` (if it exists).

`Log:`

- `--stdout-log` - Print log messages to stdout.
- `--log [path]` - Path to log file. Default is `cwd/glace.log`.
- `--log-level [level]` - Log level. Default is `debug`.

`Test-gen:`

- `--gen-output-file <path>` - Path to output file (`yaml` format).
- `--gen-steps-filter <chunk>` - Chunk of step name to filter tests.
- `--gen-steps-uniq [number]` - Number of steps in unique sequence to filter tests. Default is `unlimited`.
- `--gen-steps-limit [number]` - Maximum amount of steps per test. Default is `unlimited`.
- `--gen-steps-usage <number>` - Number of steps usage in test case.
- `--gen-steps-files <sequence>` - Space-separated sequence of paths to steps file (yaml or json format). As alternate to specify path to steps file in plugin mode.
- `--gen-tests-limit [number]` - Maximum amount of generated tests per iteration. Default is `1000000`.
- `--gen-tests-max <number>` - Maximum amount of final tests.
- `--gen-tests-files <sequence>` - Space-separated sequence of paths to files with pregenerated tests (yaml or json format).
- `--gen-tests-only` - Flag to exclude other found tests and launch only generated tests in plugin mode.
- `--gen-tests-shuffle` - Shuffle tests during generating. Provides more steps sequence randomization, but tests will be different in generating runs.
- `--gen-train <path>` - Load tests from **path** for training, launch generator in **train** mode and save result to file.
- `--gen-train-result [path]` - Path to file with training result. Default is `cwd/train-result.json`.
- `--gen-load-train <path>` - Path to file with pretrained model, which will be loaded before generating.
- `--gen-train-before <path>` - Path to file with tests for training before generating.
- `--gen-names-only` - Flag to print only step names.

`Common:`

- `--version` - Show version number.
- `-h, --help` - Show help.

## How To

### How to generate tests quickly

If you have several dozens of steps, tests building with unlimited parameters may require a long time. Use options
`--gen-steps-uniq`, `--gen-tests-limit`, `--gen-steps-limit` for efficient optimisation of consumed time.

1. Download [example](https://github.com/glacejs/glace-js/blob/master/tests/e2e.steps.yaml) with steps description.

1. Launch command

  ```
  test-gen e2e.steps.yaml --gen-steps-uniq 2 --gen-tests-limit 150 --gen-output-file result
  ```

1. Wait for finish

  ```
  Generating tests from steps...
  50 tests are generated during 419ms
  ```

1. Open file `result.yml` to see generated tests.

### How to train generator model

For training you need a file with test samples in `yaml` format.

1. Download [example](https://github.com/glacejs/glace-js/blob/master/tests/e2e.steps.yaml) with steps description.

1. Generate 10 tests

  ```
  test-gen e2e.steps.yaml --gen-steps-uniq 2 --gen-tests-limit 150 --gen-tests-max 10 --gen-output-file for_train
  ```

1. Launch training

  ```
  test-gen --gen-train for_train.yml
  ```

1. Wait for finish

  ```
  Training model...
  Model is trained during 18ms
  ```

1. Training result is saved to `train-result.json`.

### How to use trained model for generating

1. Train model from example above.

1. Launch command

  ```
  test-gen e2e.steps.yaml --gen-steps-uniq 2 --gen-tests-limit 150 --gen-load-train train-result.json --gen-output-file result
  ```

1. Generated tests will be saved to file `result.yml`.

### How to train model on fly in generating

1. Prepare test samples for training from example above.

1. Launch command

  ```
  test-gen e2e.steps.yaml --gen-steps-uniq 2 --gen-tests-limit 150 --gen-train-before for_train.yml --gen-output-file result
  ```

1. Generated tests will be saved to file `result.yml`.
