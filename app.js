'use strict';
const app = require('express')();
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

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function collectioner(arr, res, err){

}

app.get('/', function(req, res){
  res.send('server is running');
});

app.get('/professor', function(req, res, next) {
  let prof  =  Professor.construct()
  prof.find(function (err, professores) {
    if (err) return next(err);
    res.json(professores);
    });
});

app.get('/professor/:email', function(req, res, next) {
  let professor  =  Professor.construct()
  professor.find('first',{where: "email= '"+ req.params.email+"'"}, function(err, row) {
    res.json(row);
  });

});

app.post('/professor/salvar', function(req, res, next) {
  let professor  =  Professor.construct(req.body)
  let existe = false
  professor.find('first',{where: "email= '"+ req.body.email+"'"}, function(err, row) {
    if(row.codigo > 0) existe = true;
    if (existe){
      res.json(request.error("Usuário já cadastrado"));
    }else {
      professor.save(function (err, post) {
        if (err) return next(err);
        console.log("Usuário Cadastrado")
        res.json(request.success(post));
      });
    }
  });
});

app.post('/professor/login', function(req, res, next) {
  let professor  =  Professor.construct(req.body)
  let existe = false
  professor.find('first',{where: "email= '"+ req.body.email+"' and senha = '"+req.body.senha+"'"}, function(err, row) {
    if (row.codigo > 0){
      professor.setSQL(row)
      return res.json(request.success(professor))
    }else{
      return res.json(request.error("Dados de acesso inválido!"))
    }
  });
});


app.get('/usuario/:username', function(req, res, next) {
  let user  =  User.construct()
  user.find('first',{where: "username= '"+ req.params.username+"'"}, function(err, row) {
    res.json(row);
  });

});

app.post('/usuario/salvar', function(req, res, next) {
  let user  =  User.construct(req.body)
  let existe = false
  user.find('first',{where: "username= '"+ req.body.username+"'"}, function(err, row) {
    if(row.codigo > 0) existe = true;
    if (existe){
      res.json(request.error("Usuário já cadastrado"));
    }else {
      user.save(function (err, post) {
        if (err) return next(err);
        console.log("Usuário Cadastrado")
        res.json(request.success(post));
      });
    }
  });
});

app.post('/usuario/login', function(req, res, next) {
  let user  =  User.construct(req.body)
  let existe = false
  user.find('first',{where: "username= '"+ req.body.username+"' and senha = '"+req.body.senha+"'"}, function(err, row) {
    if (row.codigo > 0){
      user.setSQL(row)
      return res.json(request.success(user))
    }else{
      return res.json(request.error("Dados de acesso inválido!"))
    }
  });
});


app.get('/sala', function(req, res, next) {
  let sala  =  Sala.construct()
  sala.find(function (err, salas) {
    if (err) return next(err);
    let professor =  Professor.construct({})

    for (let i = 0; i < salas.length ; i++) {
      professor.find('first',{where: "codigo='"+ salas[i].professor+"'"}, function(err, row) {
          salas[i].professor = row
          if (i ==  (salas.length-1)){
             res.json(salas)
          }
      });
    }

  });
});

app.post('/sala/salvar', function(req, res, next) {
  let body = req.body
  let sala  =  Sala.construct(body)
    sala.save(function (err, post) {
      if (err) {
        res.json(err.toLocaleString())
        return next(err);
      }
      console.log("Sala Cadastrada")
      res.json(request.success(post));
    });
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

http.listen(3000, function(){
  console.log('listening on port 3000');
});
