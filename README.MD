# TODO
~~1. fix color handling in index.js ~~
~~2. check if post works as intended (probably not)~~
~~3. check if docker logs work as required~~
~~4. update nginx.conf with a new location for /api and add basic auth to it ~~
5. do optional tasks
6. improvement: lots of code in index.js is repeating, we could set up functions for that to have cleaner code

# Simple Node.js App with Docker Compose

This is a simple Node.js application that can be run using Docker Compose. The app is available at http://localhost:8080 The application has three endpoints:

- `/` returns a "Hello World!" message
- `/api/environment` returns the environment variables of the container
- `/api/headers` returns the request headers of the incoming request
- `/api/post` returns items in provided body

For the /api/ endpoints you can also use `?format=json`, `?format=xml`, or `?format=html` to return a specific format. HTML is used by default.

## Project Structure
    ├── Dockerfile
    ├── docker-compose.yml
    ├── index.js
    ├── package.json
    ├── nginx.conf
    ├── README.md
    ├── node_modules
    └── package-lock.json

- `Dockerfile`: instructions to build the Docker image for the Node.js app.
- `docker-compose.yml`: the configuration file for Docker Compose.
- `index.js`: the Node.js application code.
- `package.json`: the Node.js project information file
- `nginx.conf`: configuration file for the Nginx reverse proxy.
- `README.md`: the readme file
- `node_modules`: NodeJS modules directory
- `package-lock.json`: file for keeping dependency information

## Requirements

- Docker Engine
- Docker Compose

## Getting Started

1. Install Docker engine and Docker compose
    https://docs.docker.com/engine/install/ubuntu/

2. Clone the repository

    git clone https://github.com/robliv/DCtask
    cd DCtask

3. Start the containers using Docker Compose
    docker-compose up --build -d

4. When done stop containers
    docker-compose down

This command will start two containers: one for the Node.js app and one for the Nginx reverse proxy. The Node.js app will be accessible at http://localhost:8080.


# Environment Variables
The following environment variables can be set in the docker-compose.yml file:

BGCOLOR: the background color of the HTML pages (default: white).
FGCOLOR: the foreground color of the HTML pages (default: black).

# Nginx Reverse Proxy
The Nginx reverse proxy is used to route incoming requests to the Node.js app. The nginx.conf file contains the configuration for the reverse proxy. By default, the Node.js app is accessible at http://localhost:3000 and the reverse proxy at http://localhost:8080. The web service name is defined in the docker-compose.yml file. The WEB container can be accessed directly but the reverse proxy will help with managing traffic rules for routes and setting up authentication. 
