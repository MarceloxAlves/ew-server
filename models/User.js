const  AppModel = require('./AppModel');
const  request = require('../request');
module.exports  = {
    adicionar : function (res, object) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;

            var sql = "SELECT * from usuario where username = '"+object.username+"'";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                    res.json(request.error("Usuário já cadastrado"));
                }else{
                    var sql = "INSERT INTO usuario SET ?";
                      return AppModel.conn().query(sql, object, function (err, result) {
                        if (err) throw err;
                        res.json(request.success(result.affectedRows))
                    });
                }
            });

        });
    },
    listar : function (res) {
        let collection;
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * from usuario";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                res.json(results)
            });
        });
        console.log(collection)
        return collection
    },
    getByUsername : function (res, username) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * from usuario where username = '"+username+"'";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                    res.json(results[0])
                }
                res.json(results)
            });
        });
    },
    login : function (res, username, senha) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * from usuario where username = '"+username+"' and senha =  '"+senha+"'";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                    return res.json(request.success(results[0]))
                }else{
                    return res.json(request.error("Dados de acesso inválido!"))
                }
            });
        });
    }
}
