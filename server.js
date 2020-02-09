const express = require('express')
const nunjucks = require('nunjucks') // reaproveitamento de código
const routes = require("./routes")

const server = express()
server.use(express.urlencoded({ extended: true })) // Esta linha permite receber o "body" de um "Form" pelo "post"

server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function(){
    console.log("server is running")
})