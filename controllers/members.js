const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils') // desestruturando a funcao age.

exports.index =  function(req, res){
    let member = data.members

//    for(var i = 0, len = member.length; i < len; ++i) {
        //member[i].services_arr = member[i].services.split(',');
    //}

    return res.render("members/index", { members: member})
}

//show
exports.show = function(req, res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not Found")

    //return res.send(foundMember) // Enviar o objeto para o browser

      const member = {
        ...foundMember,
        age: age(foundMember.birth)
    }/* nesta instrução foi executado um" espalhamento" (Por exemplos, o nome não está nas variáveis mas foi "espalhado mesmo assim")*/

    return res.render("members/show", { member: member})
}

//create
exports.create = function(req, res){
    return res.render("members/create")
}

// post
exports.post = function(req, res){

    const keys = Object.keys(req.body); /*Retorna apenas as chaves dos campos*/
    
    //console.log(req.body["birth"]) // escreve o conteúdo da chave "birth"
     
    for (key of keys){
        if (req.body[key] == "")
          return res.send("Please, fill all fields");

    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now() // observar que "created_at" está sendo INSERIDO no "body"
    req.body.id = Number(data.members.length + 1); // observar que "id" está sendo INSERIDO no "body"

    //data.members.push(req.body)
    //as duas linhas abaixo fazem o mesmo que a linha acima. Foi utilizadoo conceito de desestruturação apenas para que fique nítido para o programador o que está sendo feito
    const {avatar_url, birth,created_at, id, name, services, gender} = req.body //desestruturando req.body (poderia utilizar "let"(para alterar) ao invés de "const")
    data.members.push({
        id, 
        name,
        avatar_url, 
        birth,
        gender,
        services, 
        created_at
    })

    avatar_url, birth,created_at, id, name, services, gender

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write file error")

        return res.redirect("/members")
    })
}

// edit
exports.edit =  function(req, res){

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not Found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', {member: member})
}

//put
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (member.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member ={
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("write error!")

        return res.redirect(`/members/${id}`)

    })
}

//delete

exports.delete = function(req, res){
    const { id } = req.body

    const filteredInstructos = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredInstructos;


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")
    
        return res.redirect("/members")
    })
}