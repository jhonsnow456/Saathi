# Special Learning Ability Analyzer(Saathi)

[![License](https://img.shields.io/github/license/jhonsnow456/Saathi)](https://github.com/jhonsnow456/Saathi/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/jhonsnow456/Saathi)](https://github.com/jhonsnow456/Saathi/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/jhonsnow456/Saathi)](https://github.com/jhonsnow456/Saathi/pulls)
[![GitHub Stars](https://img.shields.io/github/stars/jhonsnow456/Saathi)](https://github.com/jhonsnow456/Saathi/stargazers)



This is the repository for the "Special Learning Ability Analyzer" project. The project aims to provide a detailed report on children with special learning needs and to help detect symptoms early.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine using the command:

   ```
   git clone https://github.com/username/special-learning-ability-analyzer.git
   ```

2. Switch to the 'frontend' branch using the command:

   ```
   git checkout frontend
   ```

3. Create a folder named 'frontend' and move all the files from the 'frontend' branch to that folder.

4. Install the required dependencies for the frontend by running the following command inside the 'frontend' folder:

   ```
   npm install
   ```

5. Start the frontend server using the command:

   ```
   npm start
   ```

6. Switch to the 'backend' branch using the command:

   ```
   git checkout backend
   ```

7. Create a folder named 'backend' and move all the files from the 'backend' branch to that folder.

8. Install the required dependencies for the backend by running the following command inside the 'backend' folder:

   ```
   npm install
   ```

9. Create a `.env` file in the root folder of the backend with the following data:

   ```
   PORT=8000
   DATABASE=mongodb://localhost:27017/auth
   TOKEN_SECRET=secret-key
   ```

   Note: Update the `DATABASE` value to match your local MongoDB instance.

10. Start the backend server using the command:

    ```
    npx nodemon index.js
    ```

Now you can access the frontend application by navigating to `http://localhost:3000` in your web browser.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request.
