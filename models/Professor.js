const  AppModel = require('./AppModel');
const  request = require('../request');
module.exports  = {
    adicionar : function (res, object) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;

            var sql = "SELECT * from professor where email = '"+object.email+"'";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                    res.json(request.error("Usuário já cadastrado"));
                }else{
                    var sql = "INSERT INTO professor (nome, instituicao, email, senha) VALUES ?";
                    var values = [
                        [object.nome,
                            object.instituicao,
                            object.email,
                            object.senha]
                    ];
                    return AppModel.conn().query(sql, [values], function (err, result) {
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
            var sql = "SELECT * from professor";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                res.json(results)
            });
        });
        console.log(collection)
        return collection
    },
    getByEmail : function (res, email) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * from professor where email = '"+email+"'";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                  res.json(results[0])
                }
                res.json(results)
            });
        });
    },
    login : function (res, email, senha) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * from professor where email = '"+email+"' and senha '"+senha+"'";
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
