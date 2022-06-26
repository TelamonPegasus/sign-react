# demo link

[DEMO SITE](https://react-sign-in-up.herokuapp.com/)

# Description

Project in progress.

### Achieved

- client side and server side
- built simple responsive navigation bar based on React router v6 with pages and forms
- register user and send data to the MongoDB data base
- login to the protected content
- create token

At the moment the token is stored in the Web API local storage but this is not very save method so I will change it.

### To DO

- develop authentication and authorisation
- refreshToken
- store token during the session or maybe I will use the cookie
- create protected routes with the protected content available only for authorised users

### Technologies used

- React.js
- Node.js
- Express.js
- MongoDB

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

### Install dependencies

```
npm install
```

### `Run`

```
npm run dev
```

This will run JSON-server on port :5000 and React Application on port :3000.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
