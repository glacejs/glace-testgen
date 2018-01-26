[![Build Status](https://travis-ci.org/glacejs/glace-testgen.svg?branch=master)](https://travis-ci.org/glacejs/glace-testgen)
 | [Source Code](https://github.com/glacejs/glace-testgen)
 | [Release Notes](tutorial-release-notes.html)

# GlaceJS Tests Generator

## Annotation

Tests Generator needs to generate test scenarios from steps library.
It receives `json` or `yaml` file with steps description and returns a list composed test cases.
Tests Generator may be used for manual and autotests generation.

**Note!** Currently it may generate only positive test cases.

## Installation

```
npm i glace-testgen
```

Then utility `test-gen` will be available in console.

## Quick Start

1. Be sure that you have installed `glace-testgen`.

1. Create file `steps.yml` and fill with content:

    ```
    -
      name: "open app"
      income: null
      outcome:
        app: true
    -
      name: "authenticate"
      income:
        app: true
      outcome:
        app:
          auth: true
    -
      name: "close app"
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

More details about steps description you may find [here](tutorial-steps-description.html).

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

- `--file <output>, -f` - Path to output file (`yaml` format).
- `--usage <number>` - Number of steps usage in test case. Overrides each step usage value which may be specified in config.
- `--filter <chunk>` - Chunk of step name to filter tests.

`Common:`

- `--version` - Show version number.
- `-h, --help` - Show help.

## State Descriptor

The quality and correctness of composed tests deeply depends on steps `income` and `outcome` description. There are some [rules](tutorial-steps-description.html) which will help you to avoid unexpected scenarios.

## Howto
