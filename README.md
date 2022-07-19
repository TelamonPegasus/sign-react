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

## **Why JWT and http cookie**

JWT (Json Web Token) can be considered to be a form of user identification
that is issued after the initial user authentication takes place. When a user completes their login proces and they are authenticated our REST API will issue the client application and access token and refresh token. The access token is given a short time before it expires for example 5 to 15 minutes. The refresh token is given a longer duration before it expires, possibly several hours, a day or even days. While no security measures are perfect we do want consider the risk of cross-site scripting and cross-site request forgery. Our API will send and receive an access tokens as json data.

To avoid the previously mentioned risks it is recommended for front-end clinet application to only store access tokens in memory - so they will be authomatically lost when app is closed. They should not be stored in local storage or session storage or in a cookie. If we can store it somewhere with JavaScript a kacker can also retrieve it with JavaScript. That's why it is good to keep access token in the memory which also refer to us a current application state. The API will issue refresh tokens in http only cookie. This type of cookie it is not accessible with JavaScript. Refresh tokens do need to have an expiration which will then require users to log in again. Refresh tokens should have not the ability to issue new refresh tokens because that essentially grants indefinite access if a refresh token falls into the wrong hands so the overall access token process involves issuing an access token during user authorization.

The user's application can then access our REST API protected routes with the access token until it expires. The api's will verify the access token with middleware every time when access token is used to make a request. When the access token does expire then the user's application will need to send refresh token to our api's refresh endpoint to get a new access token. The refresh token is also issued during user authorization. The refresh api's refresh endpoint will verify the token and cross-reference the refresh token in our database too. Storing a reference to the refresh token in the database
will allow refresh tokens to be terminated early if the user decides to log out. And again refresh tokens need to be allowed to expire so indefinite access cannot be gained.

**Summary:**
Tokens are not stored in the local storage or session storage because this is not secure. The user login will persist when the React app is refreshed, reloaded, or revisited unless the user logs out or the refresh token has expired. The refresh token is stored in a http only secure cookie (set the cookie to http only), which is not accessed by JavaScript but can be sent to the refresh endpoint and being recognized - it allows to get a new access token. Access token is stored in the state of the application - it can not be stored in the local storage or anywhere else that JavaScript can retrieve it.

## **JWT strategy and TWO IMPORTANT CUSTOM HOOKS: useRefreshToken and useAxiosPrivate**

When the person is logged into the app the token has been created and verified. The main idea is to use the private version of axios and use the token with it at anytime when we use that instance of axios.

Access token expires so afterwards we can receive error 403 Forbidden. Then refresh token is sending to the server - which means "give me a new access token" and the backend server issues that in a secure http only cookie. That's why refresh token is so important here.

**useRefreshToken hook:**

Here is imported the useAuthContext hook so we can destructure the setAuth function and set the auth. Inside of the hook is created the async refresh function where we can get the response from the /api/refresh endpoint which has been creted on the server side as a another route.

```
  const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });
```

It allows us to send cookies with our request. This request is going to send along our cookie that has a response token. It is a secure cookie that we never see inside of our JS code but axios can send it to the backend endpoint that we need it to. After that we can set the auth state - in this case we have to use the previous function - it will return the previous state and accessToken key will be overwrite by a new accessToken.

Generally we will call this function when our initial request fails - when our access token is expired then it will refresh get a new token and we will retry the request. So at the we habe to return the refresh function from the hook. This refresh function returns the new access token.

**useAxiosPrivate:**

I have created axiosPrivate instance with some properties that will be attached to every request when the private instance will be called.

```
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
```

Custom useAxiosPrivate hook attaches only axios interceptors to the axiosPrivate instance - it basically returns privateAxios instance but before the return the interceptors are attached to the request and response of the axios instance. It is done authomatically by the useEffect - in the callback we have got our two axiosPrivate.interceptor and the dependency array set with auth and refresh.

These **auth** has got our authorization data from the context and **refresh** it is a variable which fires the useRefreshToken() hook.

**Request interceptor** allows to check the config - basically we are checking the authorization header so if that header does not exist then we know that it is a first attempt so we can set the authorization header with the auth state which contains the accessToken created during the sign in process into the application. Also it could be the new accessToken that we got after a refresh either way. But this is an initial request and we know that the authorization header was not set so that's why we are passing that in. Otherwise if it is set then we know that it is a retry and it is already been set down after a field request 403. In this case we have to just return the config.

**Response Interceptor** allows to set new access token in the authorisation header. When response is good then it will be return otherwise there is async error handler: it will be called when our token is expired. Access token has got a short life span. In this case we have to create previous request variable and inside of it we can store the config property. If the error response status is equal to 403 it means that our request is failed due to an expired access token and then we have to also check the private property on the request that was set called sent so if sent doesn't exist (it prevents endless loop that could happen on 403 error so we only to retry once and the sent property indicates that) we can set prevRequest.sent to true. Then we have to reate the new access token by calling the refresh function and store its reference in this variable. Next step is to set the token into the request headers["Authorization"]. At the end we have to call this privateAxios function and pass as an argument this previous reqest with new headers - request is updated with a refreshed token. It allows us to give a new access token.

At the end we have to remove these interceptors otherwise we could have many request and response interceptors.

Summary: This hook returns the axios private instance with those interceptors added to handle JWT tokens that we need to request our data and possibly retry and get a new accessToken if neccessary.

## **PERSISTENT USER LOGIN - SESSION STORAGE**

Also after refreshing the page normally the state of the app is reset so we can loose the access token. It is only stored in the memory because can not be stored in the local storage or session storage etc. That's why persisting user login comes up as a solution so user doesn't have to login in when the page has been refreshed. It is not very secure so when the app has to be really secured it is good to heep a log back in - for example if we have a financial application.

## **ROLES**:

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
