# demo link

[DEMO SITE](https://react-sign-in-up.herokuapp.com/)

# Description

Project still in progress.

In this application I am focusing on functionality of the application.

### To Do

- add ROLES to the employee data - only user or editor can modify the data
- full validation for all forms
- styled components
- add CRUD functionality for an ADMIN (create, update, delete) subscribers but also add select with ROLES options

### Technologies used

- React.js (Router v6, useForm hook & controllers, Yep for validation)
- Node.js
- Express.js
- MongoDB
- JWT (Json Web Token)

### Achieved

- client side and server side
- simple responsive navigation bar based on React router v6 with pages and forms
- register user and send data to the MongoDB data base
- login to the protected content
- create access token

**Why JWT and http cookie**

Tokens are not stored in the local storage or session storage because this is not secure. The user login will persist when the React app is refreshed, reloaded, or revisited unless the user logs out or the refresh token has expired. The refresh token is stored in a http only secure cookie (set the cookie to http only), which is not accessed by JavaScript but can be sent to the refresh endpoint and being recognized - it allows to get a new access token.

Access token is stored in the state of the application - it can not be stored in the local storage or anywhere else that JavaScript can retrieve it.

**REFRESH TOKEN**
We also get a refresh token but the backend server issues that in a secure http only cookie. That's why refresh token is at.

Acess token expires so afterwards we can receive error 403 Forbidden. Then refresh token is sending to the server - which means "give me a new access token.

**PERSISTENT USER LOGIN - SESSION STORAGE**
Also after refreshing the page normally the state of the app is reset so we can loose the access token. It is only stored in the memory because can not be stored in the local storage or session storage etc. That's why persisting user login comes up as a solution so user doesn't have to login in when the page has been refreshed. It is not very secure so when the app has to be really secured it is good to heep a log back in - for example if we have a financial application.

### Description:

Three roles are available: admin, editor and user. Admin has an access within whole application, only admin and editor can change some data, user can only see and read the unprotected pages content.

By default every user has got "user role":

```
ADMIN:
------

- email: admin@gmail.com
- password: admin

EDITOR:
-------

- email: editor@gmail.com
- password: editor

ANY REGISTERED USER in the "/register" endpoint:
-----

REGISTER PERSON - by default it will be a user with the role "user"

```

### View

<p align="center" >
 <img src="./client/img/Screen Shot 2022-06-26 at 23.46.22.png" width="540">
</p>

<br>

<p align="center" >
 <img src="./client/img/Screen Shot 2022-06-26 at 23.47.35.png" width="540">
</p>

<br>

<p align="center" >
 <img src="./client/img/Screen Shot 2022-06-26 at 23.47.48.png" width="540">
</p>

<br>

<p align="center" >
 <img src="./client/img/Screen Shot 2022-06-26 at 23.46.56.png" width="540">
</p>

<br>

<p align="center" >
 <img src="./client/img/Screen Shot 2022-06-26 at 23.45.18.png" width="540">
</p>

<br>

## Install all dependencies

```
npm install
```

## Run both server and client

```
npm run start
```

## Separated commands:

- server:

```
npm run server
```

- client: cd client and then run this command:

```
npm run start
```

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
