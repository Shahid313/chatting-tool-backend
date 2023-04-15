const express = require('express')
const app = express()

var body_parser = require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static("public"));

const upload = require('express-fileupload');
app.use(upload());

const cors = require('cors')
app.use(cors());

const userRoute = require('./routes/User')
const messageRoute = require('./routes/Message')

// Database connection
const connect_db = require('./connect_db')
connect_db()


app.use("/user", userRoute)
app.use("/message", messageRoute)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})

