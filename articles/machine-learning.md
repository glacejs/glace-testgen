The idea to combine machine learning with tests generator was in order to generate tests for new functionality based on choosen tests for existing functionality.

For example, let's imagine that:
- we have tests for existing functionality;
- we have steps declaration for existing functionality;
- we add new functionality to get current page;
- we want to generate new tests using to previous expertise;

Let's see how it works.

- Save steps declaration to file `steps.yml` (including step `get_current_page` for new fuctionality):

```
-
  name: launch_chrome
  incomplete:
    - chrome
  income:
    chrome: false
  outcome:
    chrome: true
-
  name: close_chrome
  complete:
    - chrome
  income:
    chrome: true
  outcome:
    chrome: false
-
  name: restart_chrome
  income:
    chrome: true
  outcome:
    chrome: true
    chrome restarted: true
-
  name: launch_global_proxy
  incomplete:
    - global proxy
  income:
    global proxy: false
  outcome:
    global proxy: true
-
  name: stop_global_proxy
  complete:
    - global proxy
  income:
    global proxy: true
  outcome:
    global proxy: false
-
  name: restart_global_proxy
  income:
    global proxy: true
  outcome:
    global proxy: true
-
  name: launch_http_proxy
  incomplete:
    - http proxy
  income:
    http proxy: false
  outcome:
    http proxy: true
-
  name: stop_http_proxy
  complete:
    - http proxy
  income:
    http proxy: true
  outcome:
    http proxy: false
-
  name: restart_http_proxy
  income:
    http proxy: true
  outcome:
    http proxy: true
-
  name: open_app
  income:
    chrome: true
  outcome:
    web page: true
-
  name: open_page
  income:
    chrome: true
  outcome:
    web page: true
-
  name: open_url
  income:
    chrome: true
  outcome:
    web page: true
-
  name: get_current_page
  income:
    chrome: true
    chrome restarted: false
    web page: true
```

- Generate tests without training first:

```
test-gen steps.yaml --gen-steps-uniq 4 --gen-steps-limit 6 --gen-steps-filter get_current_page --gen-tests-max 10 --gen-output-file result
```

- That's result:

```
Test case 1:
  - launch_chrome
  - open_page
  - open_app
  - open_url
  - get_current_page
  - close_chrome

Test case 2:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - get_current_page
  - close_chrome
  - stop_global_proxy

Test case 3:
  - launch_global_proxy
  - launch_chrome
  - open_page
  - get_current_page
  - close_chrome
  - stop_global_proxy

Test case 4:
  - launch_global_proxy
  - launch_chrome
  - open_url
  - get_current_page
  - close_chrome
  - stop_global_proxy

Test case 5:
  - launch_chrome
  - launch_global_proxy
  - stop_global_proxy
  - open_app
  - get_current_page
  - close_chrome

Test case 6:
  - launch_chrome
  - launch_global_proxy
  - stop_global_proxy
  - open_page
  - get_current_page
  - close_chrome

Test case 7:
  - launch_chrome
  - launch_global_proxy
  - stop_global_proxy
  - open_url
  - get_current_page
  - close_chrome

Test case 8:
  - launch_chrome
  - launch_global_proxy
  - open_app
  - stop_global_proxy
  - get_current_page
  - close_chrome

Test case 9:
  - launch_chrome
  - launch_global_proxy
  - open_app
  - get_current_page
  - stop_global_proxy
  - close_chrome

Test case 10:
  - launch_chrome
  - launch_global_proxy
  - open_page
  - stop_global_proxy
  - get_current_page
  - close_chrome
```

- Save tests for existing functionality to file `for_training.yml`:

```
Test case 1:
  - launch_chrome
  - open_page
  - open_app
  - restart_chrome
  - open_url
  - close_chrome

Test case 2:
  - launch_chrome
  - open_url
  - restart_chrome
  - close_chrome
  - launch_global_proxy
  - stop_global_proxy

Test case 3:
  - launch_chrome
  - open_url
  - restart_chrome
  - close_chrome
  - launch_http_proxy
  - stop_http_proxy

Test case 4:
  - launch_chrome
  - open_url
  - restart_chrome
  - launch_http_proxy
  - stop_http_proxy
  - close_chrome

Test case 5:
  - launch_chrome
  - open_url
  - restart_chrome
  - open_app
  - open_page
  - close_chrome

Test case 6:
  - launch_chrome
  - open_url
  - restart_chrome
  - open_page
  - open_app
  - close_chrome

Test case 7:
  - launch_global_proxy
  - launch_chrome
  - close_chrome
  - stop_global_proxy
  - launch_http_proxy
  - stop_http_proxy

Test case 8:
  - launch_global_proxy
  - launch_chrome
  - close_chrome
  - launch_http_proxy
  - stop_http_proxy
  - stop_global_proxy

Test case 9:
  - launch_global_proxy
  - launch_chrome
  - restart_global_proxy
  - restart_chrome
  - close_chrome
  - stop_global_proxy

Test case 10:
  - launch_global_proxy
  - launch_chrome
  - restart_global_proxy
  - open_app
  - close_chrome
  - stop_global_proxy

Test case 11:
  - launch_global_proxy
  - launch_chrome
  - restart_global_proxy
  - open_page
  - close_chrome
  - stop_global_proxy

Test case 12:
  - launch_global_proxy
  - launch_chrome
  - restart_global_proxy
  - open_url
  - close_chrome
  - stop_global_proxy

Test case 13:
  - launch_chrome
  - open_page
  - launch_http_proxy
  - open_url
  - stop_http_proxy
  - close_chrome

Test case 14:
  - launch_global_proxy
  - launch_chrome
  - launch_http_proxy
  - stop_http_proxy
  - close_chrome
  - stop_global_proxy

Test case 15:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - close_chrome
  - restart_global_proxy
  - stop_global_proxy

Test case 16:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - restart_chrome
  - close_chrome
  - stop_global_proxy

Test case 17:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - restart_global_proxy
  - close_chrome
  - stop_global_proxy

Test case 18:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - open_page
  - close_chrome
  - stop_global_proxy

Test case 19:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - open_url
  - close_chrome
  - stop_global_proxy

Test case 20:
  - launch_global_proxy
  - launch_chrome
  - open_page
  - close_chrome
  - restart_global_proxy
  - stop_global_proxy
```

- Train generator model (`train-result.json` file will be created):

```
test-gen --gen-train for_train.yml
```

- Generate tests with trained model and filter tests related with new functionality only:

```
test-gen steps.yaml --gen-steps-uniq 4 --gen-steps-limit 6 --gen-steps-filter get_current_page --gen-tests-max 10 --gen-output-file result --gen-load-train train-result.json
```

- Result now is different (and seems more relevant):

```
Test case 1:
  - launch_global_proxy
  - launch_chrome
  - open_app
  - get_current_page
  - close_chrome
  - stop_global_proxy

Test case 2:
  - launch_global_proxy
  - launch_chrome
  - open_page
  - get_current_page
  - close_chrome
  - stop_global_proxy

Test case 3:
  - launch_chrome
  - open_app
  - get_current_page
  - close_chrome
  - launch_global_proxy
  - stop_global_proxy

Test case 4:
  - launch_chrome
  - open_url
  - get_current_page
  - close_chrome
  - launch_global_proxy
  - stop_global_proxy

Test case 5:
  - launch_chrome
  - open_page
  - get_current_page
  - close_chrome
  - launch_global_proxy
  - stop_global_proxy

Test case 6:
  - launch_chrome
  - open_app
  - open_url
  - get_current_page
  - open_page
  - close_chrome

Test case 7:
  - launch_chrome
  - open_app
  - get_current_page
  - restart_chrome
  - open_url
  - close_chrome

Test case 8:
  - launch_chrome
  - open_page
  - get_current_page
  - open_app
  - open_url
  - close_chrome

Test case 9:
  - launch_chrome
  - open_url
  - get_current_page
  - open_app
  - restart_chrome
  - close_chrome

Test case 10:
  - launch_chrome
  - open_app
  - get_current_page
  - open_url
  - restart_chrome
  - close_chrome
```
