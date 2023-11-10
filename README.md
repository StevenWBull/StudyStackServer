# StudyStackApp

StudyStackApp is a Node.js/Express backend application for creating and managing stacks to help users learn and retain information effectively.

## Table of Contents

- [Frontend](#frontend)
- [Description](#description)
- [Authors](#authors)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Frontend

The frontend repo for this project can be found [HERE](https://github.com/StevenWBull/StudyStackClient)

## Description

StudyStackApp is a backend application built with Node.js and Express. It provides API routes for creating and managing stacks, where each stack represents a topic or category, and users can add questions and answers to each stack via cards. The application uses MongoDB as a centralized database to store stack and user information. It also includes authentication functionality using JSON Web Tokens (JWT) to protect routes and ensure secure access.

## Authors

This project was created for CSCI 441 at Fort Hays State University during the Fall 2023 semester. The original authors are as follows:

- Hyojin Park
- Preston Deschaine
- Raymond Lee
- Jordan Tyler
- Reagan Mpasinya
- Steven Bull

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd <project_directory>`
3. Install the dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables in the `.env` file:
     - `ENVIRONMENT` (e.g., development, production)
     - `DB_URI` (MongoDB connection URI for production environment)
     - `TEST_DB_URI` (MongoDB connection URI for testing environment)
     - `JWT_SECRET_KEY` (Secret key for JWT token generation)
5. Start the application: `npm start`

## Usage

To use the application, make HTTP requests to the provided API routes using a tool like Postman or a frontend application.

### Authorization

Standard JWT authorization is used for this application. You must send the `Authorization` header with a `Bearer Token` containing the JWT for verification and authorization in all protected endpoints.
### API Routes

- `POST /v1/auth/register`

   **Arguments:**
   - Body:
     - `first_name` (string): First name of the user.
     - `last_name` (string): Last name of the user.
     - `email` (string): Email address of the user.
     - `pword` (string): Password of the user.

- `POST /v1/auth/login`

   **Arguments:**
   - Body:
     - `email` (string): Email address of the user.
     - `pword` (string): Password of the user.

#### All below endpoints are protected and require Authorization

- `GET /v1/auth/logout`

   **No arguments required.**

- `PATCH /v1/user`

   **Arguments:**
   - Body (optional):
     - `first_name` (string): Updated first name of the user.
     - `last_name` (string): Updated last name of the user.
     - `email` (string): Updated email address of the user.
     - `pword` (string): Updated password of the user.

- `GET /v1/user`

   **Arguments:**
   - Body:
     - `_id` (string): ID of user to find.

- `POST /v1/categories/:userID`

   **Arguments:**
   - URL Params:
     - `userID` (string): ID of user to retrieve categories from.
   - Body:
     - `title` (string): Name of the category.

- `GET /v1/categories/:userID `

   **Arguments:**
  - URL Params:
    - `userID` (string): ID of user to retrieve categories from.

- `GET /v1/user/:userID/category/:categoryID`

   **Arguments:**
  - URL Params:
    - `userID` (string): ID of user to retrieve category from.
    - `categoryID` (string): ID of the category to retrieve.

- `DELETE /v1/user/:userID/category/:categoryID`

   **Arguments:**
  - URL Params:
    - `userID` (string): ID of user to delete category from.
    - `categoryID` (string): ID of the category to delete.

- `POST /v1/stacks/:userID/category/:categoryID`

   **Arguments:**
   - URL Params:
    - `userID` (string): ID of user to create stack for.
    - `categoryID` (string): ID of the category to create stack in.
   - Body:
     - `title` (string): Name of the stack.

- `DELETE /v1/ /user/:userID/stack/:stackID`

   **Arguments:**
   - URL Params:
    - `userID` (string): ID of user to delete stack from.
    - `categoryID` (string): ID of the category to delete stack from.

Make sure to include the necessary request headers and body parameters as specified in the API documentation.

## Contributing

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`.
4. Push to the branch: `git push origin <branch_name>`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
