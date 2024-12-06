const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteUser')


const postRoutes = require('./routes/post.createPost');
const deletePost = require('./routes/post.deletePost');
const getAllPosts = require('./routes/post.getAllPosts')
const editPost = require('./routes/post.editPost')
const getPostById = require('./routes/post.getPostById');

const createComment = require('./routes/createComment');


require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/posts', postRoutes);
app.use('/posts', deletePost);
app.use('/posts', getAllPosts);
app.use('/posts', getPostById);
app.use('/posts', editPost);
app.use('/user', loginRoute);
app.use('/user', registerRoute);
app.use('/user', getAllUsersRoute);
app.use('/user', getUserByIdRoute);
app.use('/user', editUser);
app.use('/user', deleteUser);
app.use('/comments', createComment);   

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
