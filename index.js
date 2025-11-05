import express from "express"
import http from "http"

const app = express()
const server = http.createServer(app)
const PORT = 5000

server.listen(PORT,(err)=>{
    if(err) console.log(err)
        console.log("Server is listening on Port", PORT)
})
