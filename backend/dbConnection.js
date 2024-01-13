const mongoose = require('mongoose');
require('dotenv').config();
const mongodb_link_url = process.env.mongodb_link_url;

mongoose.connect(mongodb_link_url);

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    isCompleted: Boolean
});

const UserSchema = new mongoose.Schema({
    username: String,
    hashPassword: String,
    todoList: [String]
})

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema)

module.exports = {
    User,
    Todo
}
