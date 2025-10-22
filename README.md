# Credit

Original Author [Tarek Kaddoumi](https://www.linkedin.com/in/tarekkaddoumi/), Senior Solutions Architect at [Amazon Web Services (AWS)](https://aws.amazon.com/)

Original file: Bedrock/main.js

## AWS

I did my own modification on this real-world project build with Amazon Web Services (AWS) 📙

I will bring more real-world projects with AWS.

## Table of Contents

- [Dependencies](#dependencies)
- [Run the app](#run-the-app)
- [Configure Environment Variables](#configure-environment-variables)

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

### Configure Environment Variables

The next section ensures your app can communicate with AWS to use Amazon Bedrock.

Your Workshop Studio account is configured with an access key and secret to provide authorisation to access Amazon Bedrock service.

> **AWS Access Keys and Secrets: Best Practices for Development and Deployment**
> As this app will only be running in VS Code Server and will **not** be *deployed*, we are using an IAM user's **Access Key** and **Secret** environment variables to access Amazon Bedrock securely. This is **not** how we would secure a production app that was going to be deployed, but the focus in this lab is on working with Bedrock APIs, so we are using this simpler approach. If you are interested in learning more about security and best practices, review the links below after the lab.
> [AWS Documentation: AWS Access Keys Best Practices](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html)
> [AWS Documentation: AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)

1. In **Visual Studio Code Server**, open the **.env** file (if it doesn't exist, creat one). This file stores your environment variables so you can access Amazon Bedrock securely. No need VITE_AWS_SESSION_TOKEN.

    ```env
    VITE_AWS_DEFAULT_REGION=
    VITE_AWS_ACCESS_KEY_ID=
    VITE_AWS_SECRET_ACCESS_KEY=
    ```

2. Only environment variables starting with **VITE_** are exposed to the app.
3. To populate these with actual values, switch over to the AWS Workshop Studio event dashboard.
4. Select **Get AWS CLI credentials**.
5. An **AWS account access** dialog will open.
6. Select the fourth tab **Windows (CMD)**. Even if you are not using Windows, this is the easiest one to choose.
7. Select the copy icon to copy the values to your clipboard. Alternatively you can select and copy them manually if that button does not work on your web browser.
8. Switch back to the VS Code window. In the **.env** file paste the environment variables you just copied below the existing lines of code.
9. Your **.env** file will look something like this:

    ```env
    VITE_AWS_DEFAULT_REGION=
    VITE_AWS_ACCESS_KEY_ID=
    VITE_AWS_SECRET_ACCESS_KEY=
    
    set AWS_DEFAULT_REGION=us-west-2
    set AWS_ACCESS_KEY_ID=ABCDEFIGHIGJ
    set AWS_SECRET_ACCESS_KEY=ABCDEFIGHIGJKLMNOPQRSTUVWXYZ
    ```

10. *Please note that the variable values above are samples, do not copy these into your own files, as they will not work.*
11. Now comes the trickiest step in the entire lab:
    1. Every key starting with **AWS_** has a matching key starting with **VITE_AWS_**.
    2. The variable is the part following the **=**, and should not have any quotes or brackets or anything else, just a string of characters.
12. Your choice is either:
    1. The variables need to be moved (or copied and pasted) from the **AWS_** lines to the corresponding **VITE_AWS_** lines.*or*
    2. Remove the **set** and paste the prefix `VITE_` in front of each **AWS_** key.

The end result should look like this, regardless of which method you use:

```env
VITE_AWS_DEFAULT_REGION=us-west-2
VITE_AWS_ACCESS_KEY_ID=ABCDEFIGHIGJ
VITE_AWS_SECRET_ACCESS_KEY=ABCDEFIGHIGJKLMNOPQRSTUVWXYZ
```
