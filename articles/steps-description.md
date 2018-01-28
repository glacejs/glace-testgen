1. Step description should be in `json` or `yaml` format. For example:

    ```
    [
        {
            "name": "load game",
            "income": null,
            "outcome": { "game": true }
        }
    ]
    ```

    ```
    -
      name: load game
      income: null
      outcome:
        game: true
    ```

1. Step description **should** include fields `name`, `income` (system state which should be in order to make step), `outcome` (affected system state after step making). For example:

    ```
    -
      name: load game
      income: null
      outcome:
        game: true
    ```

1. Step description **may** include fields `do` (step actions description), `expected` (results of step), `usage` (how many time step will be used in test, default is **1**). For example:

    ```
    -
      name: load game
      do:
        - navigate to game url
        - press button "Enter"
      expected:
        - game splash is opened
      income: null
      outcome:
        game: true
    ```

1. Use `income: null` for steps which should be used to start test. For example:

    ```
    -
      name: "load game"
      income: null
      outcome:
        game: true
    ```

1. Use `outcome: null` for steps which close / shutdown / stop tested application / system. For example:

    ```
    -
      name: "close game"
      income:
        game: true
      outcome: null
    ```

1. Use hierarchy to describe income and outcome step state. For example:

    ```
    -
      name: "play round"
      income:
        game:
          scene:
            type: "main"
            settings: false
      outcome:
        game:
          played: true
    ```

1. In `income` section describe only required state.
1. In `outcome` section describe only affected state.
