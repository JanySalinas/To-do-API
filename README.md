[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Kt0kZlq2)

![](http://143.42.108.232/pvt/Noroff-64.png)
# Noroff
## Back-end Development Year 1
### REST API - Course Assignment 1 <sup>V2</sup>

Startup code for Noroff back-end development 1 - REST API course.

Instruction for the course assignment is in the LMS (Moodle) system of Noroff.
[https://lms.noroff.no](https://lms.noroff.no)

![](http://143.42.108.232/pvt/important.png)

You will not be able to make any submission after the deadline of the course assignment. Make sure to make all your commit **BEFORE** the deadline

![](http://143.42.108.232/pvt/help_small.png)

If you are unsure of any instructions for the course assignment, contact out to your teacher on **Microsoft Teams**.

**REMEMBER** Your Moodle LMS submission must have your repository link **AND** your Github username in the text file.

---
# Noroff - REST API Course Assignment

This repository contains the back-end code for the Todo application built for the Noroff Back-end Development course. The API is developed using Express.js and Sequelize (with a MySQL database) and uses JWT authentication. All responses follow the JSend specification.

---

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Environment Variables](#environment-variables)
- [Additional Libraries/Packages](#additional-librariespackages)
- [NodeJS Version Used](#nodejs-version-used)
- [API Documentation](#api-documentation)
- [Testing](#testing)

---

## Installation and Usage

1. **Clone the Repository**
   ```bash
   git clone https://github.com/noroff-backend-1/aug24ft-api-ca-1-JanySalinas.git
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Configure the Environment**
   - Create a `.env` file in the root directory. See [Environment Variables](#environment-variables) for details.

4. **Start the Application**
   ```bash
   npm start
   ```
   The API will be running on `http://localhost:3000`.


## Environment Variables

Create a `.env` file in the root directory with the following variables (adjust the values as needed):
```properties
HOST=localhost
ADMIN_USERNAME=<your_mysql_username>
ADMIN_PASSWORD=<your_mysql_password>
DATABASE_NAME=myTodo
DIALECT=mysql
TOKEN_SECRET=<your_jwt_secret>
my token secret is : lolomyass if u need it.
```

## Additional Libraries/Packages

The following additional libraries and packages are used in this project:
- **Express:** Web framework for NodeJS.
- **Sequelize:** ORM for interacting with the MySQL database.
- **MySQL2:** MySQL client for NodeJS.
- **jsonwebtoken:** For generating and verifying JWT tokens.
- **bcrypt:** For hashing passwords.
- **swagger-jsdoc & swagger-ui-express:** For generating API documentation accessible at `/doc`.
- **jsend:** To format JSON responses consistently.
- **dotenv:** For loading environment variables.
- **Jest & Supertest:** For writing and running tests.

---

## NodeJS Version Used

This project was developed using Node.js version 14 (or your specific version). Verify your version with:
```bash
node --version
```


## API Documentation

Swagger documentation is set up for this API. Once the application is running, navigate to:
```
http://localhost:3000/doc
```
This documentation includes details for all available endpoints, required request parameters, response formats, and security configurations.


---

## Testing

Tests are implemented using Jest and Supertest. To run the tests, execute:
```bash
npm test
```
The tests cover key scenarios including user login, creating todos, retrieving todos using a JWT token, deleting todos (soft delete), and error handling for missing or invalid JWT tokens.

---

## Notes

- **Authentication:**  
  All routes (except for `/users/signup` and `/users/login`) are protected. Use the "Authorize" button in Swagger UI to provide a valid JWT for testing.
  !!!remember to signup first and login to get the token to check if everything works, if not it will not work.

- **Database Seeding:**  
  The Status table is seeded with the possible todo statuses ("Not Started", "Started", "Completed", "Deleted") on the first run. Ensure no duplicate status records exist.

- **Soft Delete:**  
  Deleting a todo will update its status to "Deleted" rather than removing it from the database.

- **API Responses:**  
  All responses are in JSON following the JSend specification.
