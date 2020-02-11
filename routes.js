const express = require('express')
const routes = express.Router()
const instructors = require('./instructor')

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})

routes.post('/instructors', instructors.post)

routes.put('/instructors', instructors.put)

routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

// HTTP VERBS
// Get: Receber um resource(Apesar de as vezes ser utilizado para passar informações pelo get(string url)) - Resource(Uma entidade)
// Post: Criar ou Salvar um novo resource com dados enviados
// Put: Atualizar um Resource
// Delete: Deletar um resource

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.get('/members', function(req, res){
    return res.send("members")
})

module.exports = routes