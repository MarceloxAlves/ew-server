'use strict';
const express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors')
var bodyParser = require('body-parser');

app.use(bodyParser.json());

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
    res.json('server is running');
});

app.get('/professor', function(req, res, next) {
    Professor.listar(res);
});

app.get('/professor/:email', function(req, res, next) {
  Professor.getByEmail(res, req.params.email)
});

app.post('/professor/salvar', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
  Professor.adicionar(res, req.body)
});

app.post('/professor/login', function(req, res, next) {
    res.writeHead(200,{"Content-Type":"application/json"});
    Professor.construct(res, req.body.email, req.body.senha)
});


app.get('/usuario/:username', function(req, res, next) {
  User.getByUsername(res, req.params.username)
});

app.post('/usuario/salvar', function(req, res, next) {
  User.adicionar(res, req.body)
});

app.post('/usuario/login', function(req, res, next) {
  User.login(res,req.body.username, req.body.senha)
});


app.get('/sala', function(req, res, next) {
   Sala.listar(res)
});

app.post('/sala/salvar', function(req, res, next) {
    Sala.adicionar(res, req.body)
});


io.on("connection", function (client) {
  client.on("join", function(name){
    console.log("Joined: " + name);
    clients[client.id] = name;
    client.emit("update","an event sent to all connected clients");
    client.broadcast.emit("update", name + " Está online")
  });

  client.on("professor-cadastrar", function (object) {
    client.emit('saved', result )
  });

  client.on("logar", function(user){
    console.log("Logando....." + user);
    client.emit("logado", {
      connected: true,
       professor:{
        username: user,
        id: "001"
      }
    });
  });


  client.on("send", function(msg){
    console.log("Message: " + msg);
    client.broadcast.emit("chat", clients[client.id], msg);
  });


  client.on("disconnect", function(){
    console.log("Disconnect");
    io.emit("update", clients[client.id] + " has left the server.");
    delete clients[client.id];
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});
