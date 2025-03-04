# Documentation

1. **Initialize the Project**:
    - Start by running the command to create a new Vite project

    ```sh
    yarn create vite my-vue-app --template vue
    ```

2. **Install Dependencies**:
    - Install the necessary dependencies for your project. We are using Vitest so let's install that along with it's dependencies

    ```sh
    yarn add -D @vitejs/plugin-vue vitest @vue/test-utils happy-dom
    ```

3. **Create Vitest Config file**:
    - First create a Vitest config file named `vitest.config.ts`. It should look like this

    ```javascript
    import { defineConfig } from 'vitest/config';
    import Vue from "@vitejs/plugin-vue";
    export default defineConfig({
        plugins: [Vue()]
        test: {
            environment: "happy-dom"
        }
    });
    ```

4. **Create your components and tests**:
    - Create the components that you need and their respective test files which have their 
    names and the `.spec.ts` at the end

5. **Run the tests**:
    - Check if package.json has the `test` command and if not add it 
    ```json
    "scripts": {
        "test": "vitest",
    }
    ```
    - Then you can run the command like this

    ```sh
    yarn test
    ```

6. **Configure GitHub coverage**:
    - Create a ci.yml file in the folder `.github/workflows` and add this

    ```yml
    name: 'Coverage on PR'
    on: 
    pull_request:

    jobs:
    test:
        runs-on: ubuntu-latest
        
        permissions:
        # Required to checkout the code
        contents: read
        # Required to put a comment into the pull-request
        pull-requests: write

        steps:
        - uses: actions/checkout@v4
        - name: 'Install Node'
        uses: actions/setup-node@v4
        with:
            node-version: '20.x'
        - name: 'Install Deps'
        run: npm install
        - name: 'Test'
        run: npx vitest --coverage.enabled true
        - name: 'Report Coverage'
        # Set if: always() to also generate the report if tests are failing
        # Only works if you set `reportOnFailure: true` in your vite config as specified above
        if: always() 
        uses:  davelosert/vitest-coverage-report-action@v2
    ```
    - You also need to add this on `vitest.config.ts`
    ```javascript
    export default defineConfig({
        plugins: [Vue()],
        test: {
            environment: "happy-dom",
            coverage: {
            reporter: ['text', 'json-summary', 'json'],
            reportOnFailure: true,
            }
        }
    })
    ```

7. **Create your PR**:
    - Now all you need to do is to create a PR and the action should be executed automatically and post the coverage comment in the PR
