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
