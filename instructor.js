const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils') // desestruturando a funcao age.

//show
exports.show = function(req, res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not Found")

    //return res.send(foundInstructor) // Enviar o objeto para o browser

      const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("en-ES").format(foundInstructor.created_at)
    }/* nesta instrução foi executado um" espalhamento" (Por exemplos, o nome não está nas variáveis mas foi "espalhado mesmo assim")*/

    console.log(instructor.created_at);

    return res.render("instructors/show", { instructor: instructor})
}

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

// edit
exports.edit =  function(req, res){

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not Found")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', {instructor: instructor})
}

//put
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (instructor.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor ={
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("write error!")

        return res.redirect(`/instructors/${id}`)

    })
}

//delete