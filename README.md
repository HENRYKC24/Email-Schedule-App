# Email Scheduler - Mental Health Tips

This application is smart. Daily exercises, encouragement, psychology facts, and more. Sent straight to your email when you least expect it.
This isn't a counseling session. This isn't a therapy system. It's the best first step towards a healthier brain. When a user registers with his credentials (email and password inclusive) the application sends a periodic email to the user with mental health support in mind.

# Features

- A user can register to the service
- A user receives random mental health tips
- No email message is repeated
- When the number of messages in the database is exhausted, the email stops
- A user can pause/restart the email message
- A user can recover forgotten passport
- A user can change his email for the message at any time
- A user can login and be authenticated and authorized for some capabilities
- There are two categories of users: admin and user. They have different authorizations
- A user can delete his account
- A user can change his name provided he is logged in
- Very secure

## Built With

- NodeJS
- Express
- MongoD
- Google APIs
- Node Mailer

## Live Demo

[Live Demo Link](https://henrykc-mail-scheduler.herokuapp.com/)

## Run App Locally

### To get a local copy up and running follow these simple example steps.

Run `git clone https://github.com/HENRYKC24/Email-Schedule-App.git` in your terminal

Run `cd Email-Schedule-App` to navigate to the project folder

Run `npm install` from the command line to install all dependencies

## Note:

You need to set up the below environment variable: [See this](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/)

### For MongoDB Config [See this](https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/)

- MONGODB_REMOTE_SERVER
- MONGODB_PASSWORD

### For Running Server

- PORT

### For cookie

- COOKIE_EXPIRES_IN

### For Google Mail API [See this](https://www.youtube.com/watch?v=18qA61bpfUs)

- CLIENT_SECRET
- CLIENT_ID
- REFRESH_TOKEN

### For JSON Web Token (JWT) [See this](https://www.youtube.com/watch?v=mbsmsi7l3r4)

- JWT_SECRET
- JWT_EXPIRES_IN

When all these are set,
Run `npm run start:dev` to start the local server in development environment

OR:

Run `npm run start:prod` to start the local server in production environment

# API Documentation

All responses come in standard JSON.

# Note: The token is intentionally added to some responses to ease testing purposes with Postman API Tool. PLEASE, TEST THE ENDPOINTS WITH POSTMAN APPLICATION

### Example Error Message

http code 500

```json
{
  "status": "fail",
  "message": "Internal server error"
}
```

### Example success Message

http code 200
```json
{
  "status": "success",
  "dataCount": 2,
  "data": {}
}

```

# HOME ROUTE: GET REQUEST

`https://henrykc-mail-scheduler.herokuapp.com/`

**Response:**

```json
{
  "status": "success",
  "message": "Welcome to our API service!"
}
```

# POST REQUESTS:

### Register A User

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/signup`

### POSTMAN TIPS
1. Place this code in the `Tests` tab `pm.environment.set("jwt", pm.response.json().token);`

#### Payload

```json
{
  "name": "John Doe",
  "email": "example1@gmail.com",
  "password": "password12345",
  "passwordConfirm": "password12345"
}
```

The above endpoint with the payload returns the user as a response

**Response:**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "role": "user",
      "active": true,
      "messagePaused": true,
      "messagesLeft": -1,
      "sentMessageIds": [],
      "_id": "62f62257d2296048c1fa7ef8",
      "name": "John Doe",
      "email": "example1@gmail.com",
      "__v": 0
    }
  }
}
```

### Login A User

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/login`
### POSTMAN TIPS
1. Place this code in the `Tests` tab `pm.environment.set("jwt", pm.response.json().token);`

#### Payload

```json
{
  "email": "example1@gmail.com",
  "password": "password12345"
}
```

The above endpoint with the payload returns the user as a response

**Response:**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "role": "user",
      "messagePaused": false,
      "messagesLeft": -1,
      "sentMessageIds": [],
      "_id": "62f5fb3e72e354f248aa17eb",
      "name": "John Doe",
      "email": "example1@gmail.com",
      "__v": 0
    }
  }
}
```

### Recover User Password

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/forgot-password`

_Hint: No authentication required._

#### Payload

```json
{
  "email": "example1@gmail.com"
}
```

The above endpoint sends an email with a link to recover/change the password to the provided email in the payload.

### Reset password from email message

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/reset-password/:token`
### POSTMAN TIPS
1. Place this code in the `Tests` tab `pm.environment.set("jwt", pm.response.json().token);`

_Hint: The above endpoint will be automatically generated from the email send during forgot password process. It is a post request that require a payload. Copy the link from your email and paste it in Postman_

#### Payload

```json
{
  "password": "password12",
  "passwordConfirm": "password12"
}
```

**Response:**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "role": "user",
      "messagePaused": false,
      "messagesLeft": -1,
      "sentMessageIds": [],
      "_id": "62f5fb3e72e354f248aa17eb",
      "name": "John Doe",
      "email": "example1@gmail.com",
      "__v": 0
    }
  }
}
```

# GET REQUESTS:

### Logout A User

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;
2. Place this code in the `Tests` tab `pm.environment.set("jwt", pm.response.json().token);`

_Hint: You must be logged in before you can access this route. No payload is required._

**Response:**

```json
{
  "status": "success",
  "message": "You successfully logged out",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Get All Users

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;

_Hint: You must be logged in and also an admin before you can access this route. No payload is required._

#### Payload

The above endpoint returns all registered users as a response

**Response:**

```json
{
  "status": "success",
  "dataCount": 3,
  "data": {
    "users": [
      {
        "role": "admin",
        "messagePaused": false,
        "messagesLeft": 0,
        "sentMessageIds": [],
        "_id": "62f5fb3e72e354f248aa17eb",
        "name": "Changed Name",
        "email": "example1@gmail.com",
        "__v": 0
      },
      {
        "role": "admin",
        "messagePaused": false,
        "messagesLeft": 0,
        "sentMessageIds": [],
        "_id": "62f6207791323129f0d65448",
        "name": "John Doe",
        "email": "example2@gmail.com",
        "__v": 0
      },
      {
        "role": "user",
        "messagePaused": true,
        "messagesLeft": -1,
        "sentMessageIds": [],
        "_id": "62f62257d2296048c1fa7ef8",
        "name": "John Doe",
        "email": "example3@gmail.com",
        "__v": 0
      }
    ]
  }
}
```

### Get A Single User

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/:id`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;

_Hint: You must be logged in and also an admin before you can access this route. No payload is required._

#### Payload

The above endpoint returns a user as a response

**Response:**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "role": "user",
      "messagePaused": false,
      "messagesLeft": -1,
      "sentMessageIds": [],
      "_id": "62f5fb3e72e354f248aa17eb",
      "name": "John Doe",
      "email": "example1@gmail.com",
      "__v": 0
    }
  }
}
```

# PATCH REQUESTS:

### Change User Password

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/update-password`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;
2. Place this code in the `Tests` tab `pm.environment.set("jwt", pm.response.json().token);`

_Hint: You must be logged in before you can change your password._

#### Payload

```json
{
  "passwordCurrent": "password12345",
  "password": "password12345change",
  "passwordConfirm": "password12345change"
}
```

The above endpoint returns a user as a response

**Response:**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjVmYjNlNzJlMzU0ZjI0OGFhMTdlYiIsImlhdCI6MTY2MDMxNTgxMywiZXhwIjoxNjY4MDkxODEzfQ.-oRibPCC-LC-gjFUzfh0x8_nroQDrdblVRdqKjtIFKI",
  "data": {
    "user": {
      "role": "admin",
      "messagePaused": false,
      "messagesLeft": 0,
      "sentMessageIds": [],
      "_id": "62f5fb3e72e354f248aa17eb",
      "name": "Changed Name",
      "email": "henrykc24@yahoo.com",
      "__v": 0,
      "passwordResetExpires": "2022-08-12T07:40:15.286Z",
      "passwordResetToken": "0cd23722d7d38c79205c...",
      "passwordChangedAt": "2022-08-12T14:50:11.844Z"
    }
  }
}
```

### Change User Info (email/name)

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/update-user`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;

_Hint: You must be logged in before you can change your name or email._

#### Payload

```json
{
  "email": "henrykc25@yahoo.com"
}
```

The above endpoint returns a user as a response

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "role": "admin",
      "messagePaused": false,
      "messagesLeft": 0,
      "sentMessageIds": [],
      "_id": "62f5fb3e72e354f248aa17eb",
      "name": "Changed Name",
      "email": "henrykc25@yahoo.com",
      "__v": 0,
      "passwordResetExpires": "2022-08-12T07:40:15.286Z",
      "passwordResetToken": "0cd23722d7d38c79...",
      "passwordChangedAt": "2022-08-12T14:50:11.844Z"
    }
  }
}
```

### Pause User Email Message

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/pause-message`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;

_Hint: You must be logged in before you can pause receiving email for mental health tips. No payload is required_

The above endpoint returns a message that your message service has been paused.

**Response:**

```json
{
  "status": "success",
  "message": "Email messages paused successfully."
}
```

### Continue Receiving Email Message

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/continue-message`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;

_Hint: You must be logged in before you can continue a paused email for mental health tips. No payload is required_

The above endpoint returns a message that your paused service has been resumed.

**Response:**

```json
{
  "status": "success",
  "message": "Email messages has successfully continued."
}
```

### Re-subscribe to Email Message Service

`https://henrykc-mail-scheduler.herokuapp.com/api/v1/users/re-subscribe`
### POSTMAN TIPS
1. In the `Authorization` tab, select `Bearer Token` in the `Type` field;

_Hint: You must be logged in before you can re-subscribe email for mental health tips. No payload is required_

The above endpoint returns a success or failure message.

**Response: - Success**

```json
{
    "status": "success",
    "message": "You have successfully re-subscribed!"
}
```

**Response: - Failure**

```json
{
    "status": "fail",
    "message": "You already have an active subscription. Please, check if message service is paused!"
}
```

## Author

👤 **Henry Kc**

- GitHub: [@githubhandle](https://github.com/henrykc24)
- Twitter: [@twitterhandle](https://twitter.com/henrykc24)
- LinkedIn: [LinkedIn](https://linkedin.com/in/henry-kc)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/HENRYKC24/web-scraping-app/issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- I remain indebted to all software engineers across the world for helping me in one way or the other in the project and in my career.

## 📝 License

This project is [MIT](./MIT.md) licensed.
