# Credit

Original Author [Tarek Kaddoumi](https://www.linkedin.com/in/tarekkaddoumi/), Senior Solutions Architect at [Amazon Web Services (AWS)](https://aws.amazon.com/)

Original file: Bedrock/main.js

## AWS

I modified this real-world project build with Amazon Web Services (AWS) to use Ollama local LLM inference server instead of AWS Bedrock, so it is free to run locally.

## Table of Contents

- [Dependencies](#dependencies)
- [Run the app](#run-the-app)

### Dependencies

- [Node](https://nodejs.org/en/download)
- [Git](https://github.com/git-guides/install-git/)
- [Vite](https://vitejs.dev/guide/)

### Run the app

Let's try the app by installing dependencies and running it.

1. Go in to the project folder `cd my-affirmations` (VUE 3 + TypeScript + Vite). Install the dependencies first using the **Terminal**. If the terminal is not visible, select **TERMINAL** from the **Panel**. If the **Panel** is closed, select menu item **View** and **Terminal** to show it.
2. In the terminal, run:

    ```bash
    npm install
    ```

3. When the install has finished, it's time to run the app for the first time.
    1. In the terminal, run

        ```bash
        npm run dev
        ```

    2. A popup message may appear asking if you want to open the app in the browser, select this or select the network URL that is displayed in the terminal
4. Ensure the app loads and you can see the web page is rendered and you can click on the button.

**Additional**: Build Vite Project: Run `npm run build` to generate the production-ready assets in the `dist` folder.
