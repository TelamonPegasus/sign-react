# demo link

[DEMO SITE](https://react-sign-in-up.herokuapp.com/)

# Description

Project in progress...

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

**Why JWT and http cookie?**

I use JWT (JsonWebToken) to store the access web Tocen in the application state. I wanten to avoid to use the local storage, session storage or cookie that can be accessed by JS. The refresh token is stored in a http only secure cookie, which is not accessed by JS but can be sent to the refresh endpoint and being recognized - it allows to get a new access token.

### To DO

- develop authentication and authorisation
- refreshToken
- store token during the session or maybe I will use the cookie (actually I am learning about it)
- create protected routes with the protected content available only for authorised users
- full validation inputs form

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
