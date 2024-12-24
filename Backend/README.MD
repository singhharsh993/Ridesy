# Backend API Documentation

## Endpoints

### /users/register

#### Description
This endpoint is used to register a new user.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A string representing a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}

Responses
201 Created: User successfully registered.

Response body:

{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}

// ...existing documentation...

### /users/login

#### Description
This endpoint authenticates an existing user and returns a JWT token.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `email`: A string representing a valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}

Responses
200 OK: User successfully logged in

Response body:

{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}

401 Unauthorized: Invalid credentials

Response body:
{
  "message": "INVALID CREDENTIALS"
}


400 Bad Request: Validation error

Response body:

{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}


// ...existing documentation...

### /users/profile

#### Description
Get the profile information of the authenticated user.

#### Method
`GET`

#### Authentication
Requires a valid JWT token in:
- Authorization header: `Bearer <token>` or
- Cookie: `token=<token>`

#### Responses

- `200 OK`: Profile retrieved successfully
  - Response body:
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
    ```

- `401 Unauthorized`: Invalid or missing token
  - Response body:
    ```json
    {
      "message": "UNAUTHORIZED"
    }
    ```

### /users/logout

#### Description
Logout the currently authenticated user and invalidate their token.

#### Method
`GET`

#### Authentication
Requires a valid JWT token in:
- Authorization header: `Bearer <token>` or
- Cookie: [token=<token>](http://_vscodecontentref_/0)

#### Responses

- `200 OK`: Successfully logged out
  - Response body:
    ```json
    {
      "message": "LOGGED OUT SUCCESSFULLY"
    }
    ```

- `401 Unauthorized`: Invalid or missing token
  - Response body:
    ```json
    {
      "message": "UNAUTHORIZED"
    }
    ```