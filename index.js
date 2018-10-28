'use strict';
const express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors())

const  Professor = require('./models/Professor');
const  Sala = require('./models/Sala');
const  User = require('./models/User');
const  request = require('./request');

var clients = {};
var  result = null

var whitelist = ['http://localhost:8080']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Não permitido acesso a api' + origin))
    }
  },
  methods: ['POST','GET','DELETE','PUT'],
  credentials: true,
  maxAge: 3600
}

// index.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

function collectioner(arr, res, err){

}

app.get('/', function(req, res){
  res.send("<h1>Server is Running</h1>");
});

app.get('/teste', function(req, res){
    try {
        res.json('server is running');
    } catch (ex) {
        res.json(request.error("Error") );
    }

});

app.get('/professor', function(req, res, next) {
    try {
        Professor.listar(res);
    }catch (e) {
        res.json(request.error("Erro ao listar os professores"))
    }
});

app.get('/professor/:email', function(req, res, next) {
  try{
    Professor.getByEmail(res, req.params.email)
  }catch (e) {
      res.json(request.error("Erro ao encontrar professor por email"))
  }
});

app.post('/professor/salvar', function(req, res, next) {
  try{
    Professor.adicionar(res, req.body)
  }catch (e) {
      res.json(request.error("Erro ao adicionar professor"))
  }
});

app.post('/professor/login', function(req, res, next) {
    try{
        Professor.login(res, req.body.email, req.body.senha)
    }catch (e) {
        res.json(request.error("Erro ao fazer login"))
    }
});

app.get('/usuario', function(req, res, next) {
    try{
        User.listar(res);
    }catch (e) {
        res.json(request.error("Erro ao listar usuários"))
    }
});

app.get('/usuario/:username', function(req, res, next) {
    try{
        User.getByUsername(res, req.params.username)
    }catch (e) {
        res.json(request.error("Não foi possível pegar o usuário " + req.params.username))
    }
});

app.post('/usuario/salvar', function(req, res, next) {
    try{
        User.adicionar(res, req.body)
    }catch (e) {
        res.json(request.error("Erro ao salvar usuário"))
    }
});

app.post('/usuario/login', function(req, res, next) {
    try{
        User.login(res,req.body.username, req.body.senha)
    }catch (e) {
        res.json(request.error("Erro ao fazer o login"))
    }
});


app.get('/sala', function(req, res, next) {
    try{
        Sala.listar(res)
    }catch (e) {
        res.json(request.error("Erro ao listar salas"))
    }
});

app.post('/sala/salvar', function(req, res, next) {
    try {
        Sala.adicionar(res, req.body)
    }catch (e) {
        res.json(request.error("Erro salvar sala"))
    }
});

app.get('/sala/:username', function(req, res, next) {
    try{
        Sala.my_class(res,req.params.username)
    }catch (e) {
        res.json(request.error("Erros ao listar salas do usuário " + req.params.username))
    }
});


// io.on("connection", function (client) {
//   client.on("join", function(name){
//     console.log("Joined: " + name);
//     clients[client.id] = name;
//     client.emit("update","an event sent to all connected clients");
//     client.broadcast.emit("update", name + " Está online")
//   });
//
// });

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});
