const fs = require('fs')
const data = require('./data.json')

// create
exports.post = function(req, res){

    const keys = Object.keys(req.body); /*Retorna apenas as chaves dos campos*/
    
    //console.log(req.body["birth"]) // escreve o conteúdo da chave "birth"
     
    for (key of keys){
        if (req.body[key] == "")
          return res.send("Please, fill all fields");

    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now() // observar que "created_at" está sendo INSERIDO no "body"
    req.body.id = Number(data.instructors.length + 1); // observar que "id" está sendo INSERIDO no "body"

    //data.instructors.push(req.body)
    //as duas linhas abaixo fazem o mesmo que a linha acima. Foi utilizadoo conceito de desestruturação apenas para que fique nítido para o programador o que está sendo feito
    const {avatar_url, birth,created_at, id, name, services, gender} = req.body //desestruturando req.body (poderia utilizar "let"(para alterar) ao invés de "const")
    data.instructors.push({
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

        return res.redirect("/instructors")
    })
}

// update

//delete