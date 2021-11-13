# Getting started

## Folder structure

In `/client/` is the source code for the vue-based client and in `/src/` is the code for the server.
The config files for the server are placed in `/`, like the `package.json`, the config for the client in `/client/`.

## Setup

To set up the full development environment, run `npm install` in the root directory of the repository, to install the servers dependencies and run `npm install` in `/client/` to install the clients dependencies.

If you only want to run the server, you should create a production build of the client by running `npm run build` in `/client/`, since the server serves the `/client/dist/` folder on `GET /`.

Unfortunately, since the client uses the api from the server for getting public pins, types and categories, only running the client should yield some problems.

## Running the dev-environment

To run the full development environment, run `npm run serve` in `/client/` and `npm run dev` in `/` concurrently. That should spin up a server on port `9000` and a vue-dev-server on port `8080`. Then navigate to `localhost:8080` in your browser.
You might need to set `NODE_ENV` to `development`, if you run into any problems.