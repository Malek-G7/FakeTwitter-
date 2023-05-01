const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session');
const passport = require('passport');
const cors = require("cors")
const userRouter = require("./routes/userRoute")
const app = express()
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(
    "mongodb+srv://WavesUsername:WavesPassword@waves.fewat9e.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
)
 
const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})

db.once('open', () => {
    console.log("connected to database")
})

app.use(cors({
    origin : "*",
    credentials:  true
}))

app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    // store: db,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
app.use((req, res, next) => {
    console.log(req.session);
    next();
});
app.use(cookieParser("secretcode"))

app.get("/",(req,res) => {
    res.send("hello world")
   
})

app.use("/",userRouter)

app.listen(3000,'0.0.0.0', () => {
    console.log("server started on port 5000 !")
})