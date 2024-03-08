# Twitter Backend - Version 1.0.0

## Overview

`twitter_backend` is a Node.js-based backend application for a social media platform. It provides a set of RESTful APIs for user authentication, tweet management, user profiles, and more. This backend is designed to be easily integrated into frontend applications requiring social media features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HassanBuTt78/Twitter-Backend-Clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd twitter_backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

- Start the server:

  ```bash
  npm start
  ```

  The server will run at `http://localhost:3000` by default.

- For development with automatic server restart:

  ```bash
  npm run dev
  ```

## Configuration

- Create a `.env` file in the project root and configure the following variables:

  ```
  PORT=3000
  DBURI=your_mongodb_connection_string
  JWTSECRET=your_jwt_secret_key
  EMAIL=your_email
  EMAIL_PASSWORD=your_email_password
  ```

  Update the values accordingly for your MongoDB connection, JWT secret, and email service credentials.

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt): For hashing passwords securely.
- [cors](https://www.npmjs.com/package/cors): For handling Cross-Origin Resource Sharing.
- [dotenv](https://www.npmjs.com/package/dotenv): For loading environment variables from a .env file.
- [express](https://www.npmjs.com/package/express): Web application framework for Node.js.
- [express-async-errors](https://www.npmjs.com/package/express-async-errors): Handle async/await errors in Express.
- [joi](https://www.npmjs.com/package/joi): Object schema validation.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JSON Web Tokens (JWT).
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling for Node.js.
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware.
- [multer](https://www.npmjs.com/package/multer): Middleware for handling `multipart/form-data`, used for file uploads.
- [nodemailer](https://www.npmjs.com/package/nodemailer): Send emails using Node.js.

## Scripts

- `start`: Start the server using `node`.
- `dev`: Start the server using `nodemon` for automatic restarts during development.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

Feel free to customize and extend the `twitter_backend` according to your application's requirements. If you have any questions or issues, please don't hesitate to reach out.

Happy coding!