const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})

routes.post('/instructors', function(req, res){

    const keys = Object.keys(req.body); /*Retorna apenas as chaves dos campos*/
    var x = 'keys:';
    console.log('----')
     
    for (key of keys){
        x = x + '-' + key;
        console.log(x)
        //console.log(key);
    }

    //return "x";
    return res.send(x);
})


routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

routes.get('/members', function(req, res){
    return res.send("members")
})

module.exports = routes