const express = require('express')
const nunjucks = require('nunjucks') // reaproveitamento de código

const server = express()
const videos= require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url:"https://avatars0.githubusercontent.com/u/59754455?s=460&v=4",
        name:"Mateus Nunes",
        role: "Desenvolvedor desktop migrando para Web/Mobile",
        description: 'Buscando novas ferramentas para desenvolvimento mobile e web e iniciando <a class="links" href="https://github.com/MateusOrnelas" target="_blank"> github </a>',
        links:[
            { name: "Github", url: "https://github.com/MateusOrnelas"},
            { name: "Facebook", url: "https://www.facebook.com/profile.php?id=1122123545"}
        ]
    }
    return res.render("about", {about:about})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id;
    
    const video = videos.find(function(video){// P. de onde veio este "video"?
        return video.id == id
        }
    })

    if (!video) {
        return res.send("Video not found")
    } 
    
    return res.render("video", { item: video })

    

//    return res.render("video", { video })

})

server.listen(5000, function(){
    console.log("server is running")
})
