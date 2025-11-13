import express from "express"
import http from "http"
import Database from "./config/db.js"
import dotenv from "dotenv"
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const dbName = process.env.dbName
const app = express()
const server = http.createServer(app)
const PORT = 5000
const db = new Database(MONGO_URI,dbName)

db.connect()
server.listen(PORT,(err)=>{
    if(err) console.log(err)
        console.log("Server is listening on Port", PORT)
})
