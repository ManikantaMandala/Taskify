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

Step 1: navigate to backend folder in your terminal and install all the dependencies:

    cd backend && npm install

Step 2: create .env file and add the following text:

    touch .env
    echo 'mongodb_link_url=<your_mongodb_link>
    port=3451
    jwtPassword=<your_jwt_password_phrase>' > .env

Step 3: navigate to frontend folder and install all the dependencies:

    cd ../frontend && npm install

Step 4: run the servers:(recommanding to install [tmux](https://github.com/tmux/tmux/wiki/Installing))
    
    cd ../
    tmux new-session -d -s myServers
    tmux send -t myServers:0 'cd ./backend/ && npm run dev' Enter
    tmux neww -t myServer
    tmux send -t myServers:1 './frontend/ && npm run dev' Enter

Step 5: navigate to a browser and open [localhost:5173](http://localhost:5173)

Step 6: terminate the servers:

    tmux kill-session -t myServers
