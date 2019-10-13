# Mars Attracts

"Mars Attracts" is a fictional dating website for celebrity aliens, made using React. The functionality is similar to that of a social network, with users being able to register and login, request, add and remove friends, chat in the chat room, and write on other user's 'walls'. This project was completed during my time at [SPICED Academy](https://www.spiced.academy/program/full-stack-web-development/), where I studied from July - August 2019.

The main purpose of the project was to teach us React, and was built in stages, with Redux being introduced later in the project. The code makes use of class components, function components with hooks, and pages which make use of redux and some which don't. This was deliberate in order for us to learn React from the ground up. Future react projects will be more cohesive. 

---

## Demo

**Note: The registration and image upload functionality has been disabled to prevent unsolicited text and images being uploaded**

_ You can login using: 

-   username: yoda@gmail.com
-   password: y
_

https://mars-attracts.herokuapp.com

## Technology used

React.js, React Hooks, avaScript, Handlebars.js, Node.js / Express, Postgres / SQL, AWS / S3, Heroku, CSURF, JSX, CSS

## Preview

![Log in, change profile picture and change biography](https://user-images.githubusercontent.com/45455994/66659381-aebb8680-ec43-11e9-8308-5c233cfbb080.gif)

Register your profile, log in and change/edit your profile picture and biography.

![Search for other users and send crushes(add friends.)](https://user-images.githubusercontent.com/45455994/66659529-f3472200-ec43-11e9-85fc-a7251d88e215.gif)

Search for other users and send crushes(add friends.)

![Break hearts(delete friendships), accept crushes(accept friend requests) and chat in the chat room.](https://user-images.githubusercontent.com/45455994/66659647-2f7a8280-ec44-11e9-8a2d-f12e34be560c.gif)

Break hearts (delete friendships), accept crushes (accept friend requests) and chat in the chat room.


## Features

-   Users can register a profile, make edits to their profile, log out, and log back in again.

-   Profile pictures and biographies can be added and changed at will on a user's profile page.

-   Users can send crushes (request friendship), accept crushes (accept friendship), and break hearts (delete friendship).

-   All existing friends, and friend requests can be viewed together on one page.

-   A chatroom exists where users can "flirt" with each other in real time, this was built using socket.io.

-   A 'find friends' feature exists, where users can view the most recent new users and search for other users in the database.

-   Users can post messages on other user's walls.

-   The total number of users online is tracked and displayed on screen.


## Goals while doing the project

-   Learning how to use the React framework

-   Understanding how class components, function components, and React hooks work, and learning the best pratice for using them.

-   Getting to grips with Redux and storing data in state.

-   Implenting socket.io to build a chat room and show online users


## Goals for the future

-   Refactor the code to make it mobile responsive

-   Refactor code to use Redux and React Hooks throughout

-   Fix a bug which sometimes displays the wrong number of online users