const express = require('express')
const routes = express.Router()
const instructor = require('./instructor')
routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})

routes.post('/instructors', instructor.post)


routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

routes.get('/members', function(req, res){
    return res.send("members")
})

module.exports = routes