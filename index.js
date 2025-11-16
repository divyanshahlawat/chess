import express from "express"
import http from "http"
import Database from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/index.js";
import cookieParser from "cookie-parser"
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const dbName = process.env.dbName
const app = express()
const server = http.createServer(app)
const PORT = 5000
const db = new Database(MONGO_URI,dbName)

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router)

db.connect()
server.listen(PORT,(err)=>{
    if(err) console.log(err)
        console.log("Server is listening on Port", PORT)
})
