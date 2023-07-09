# Montenegro Luxury Association Frontend

## Description

This is a full-stack web project. It is structured in the following way: the root folder contains all of the react project code which is arranged in the default configuration created by `create-react-app`. The main react source code is contained in `/src`, which is split into the `/components` folder, which contains most of the TSX components, the `/styles` folder which contains global styles, and the `/util` folder that contains reusable logic-related code. The `/src` folder also contains the `App.tsx` file which handles all of the frontend routing. The image assets are contained in the `/public/images` folder. As per the backend, all of its code is contained in the `/backend` folder. Like with the frontend, the main source code is contained in `/backend/src`, which contains the subfolders `models`, which contains Mongoose schema definitions of the different MongoDB documents we will be using, `routes`, which contains several files with routers containing different endpoints that are grouped by functionality, `middleware`, which contains express middleware functions/helpers, and `util`, which contains reusable logic-based code. The `/backend` folder also contains the `server.ts` file, which is the main entrypoint to the backend and is responsible for launching the server, connecting all the routes from the `routes` folder and establishing a MongoDB connection.

## How to run:

### Frontend:

In root of project, run: `npm start` to start the React development server

### Backend:

Run `cd backend`, then run: `npm run start-dev` to run the Node.js nodemon server
