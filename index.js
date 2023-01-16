const express = require("express");
const cors = require('cors');
require('dotenv').config()

const {connection} = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRouter);
app.use("/posts",postRouter);


app.listen(port, async () => {
    try {
        await connection;
        console.log("successfully connected with the DB.......");
    } catch (error) {
        console.log("error occured while connecting to the DB.. And error is : " , error);
    }
    console.log("server is successfully started....");
});