## Todo Application
### This project contains a simple TODO Application
##### It has the following features/TODOs:
- [x] User can sign up
- [x] User can log in
- [x] User can logout
    - [x] localStorage cleanup
- [x] User can create a todo
- [x] User can see their existing todos
- [ ] jwt token should include an expiration time to enhance security
- [ ] Styling should be added

### Clone the repo:

    git clone https://github.com/ManikantaMandala/TodoApplication

### Steps to start the application:

Prerequisite:
- mongodb url link (you can get it from [mongodb-atlas](https://www.mongodb.com/cloud/atlas/register)):<your_mongodb_link>
- jwt password (Any phrase that you like):<your_jwt_password_phrase>

Step 1: create .env file and echo below properties into it

    touch ./backend/.env
    echo 'mongodb_link_url=<your_mongodb_link>
    port=3451
    jwtPassword=<your_jwt_password_phrase>' > .env
    
Step 2: install all the dependencies with yarn

    yarn
    yarn install
    
Step 3: run the frontend and backend services

    yarn dev

Step 4: stop the services by pressing ctrl+c
