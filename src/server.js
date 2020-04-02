const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({
  extended: true,
}))

nunjucks.configure('./', {
  express: server,
  noCache: true,
})

const donors = [
  {
    name: "Diego Fernandes",
    blood: "AB+"
  },
  {
    name: "Mayk Brito",
    blood: "B+"
  },
  {
    name: "Andres Amaral",
    blood: "O+"
  },
  {
    name: "Ana Clara",
    blood: "B+"
  },
]

server.use(express.json())

server.get('/', (req, res) => {
  return res.render("src/index.html", { donors })
})

server.post('/', (req, res) => {
  const { name, email, blood } = req.body
  donors.push({ name: name, blood: blood })
  return res.redirect("./")
})

server.listen(3333, () => {
  console.log('Servidor rodando');
})