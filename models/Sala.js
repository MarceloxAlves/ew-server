const  AppModel = require('./AppModel');
const  request = require('../request');
module.exports  = {
    adicionar : function (res, object) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
                    var sql = "INSERT INTO usuario SET ?";
                    return AppModel.conn().query(sql, object, function (err, result) {
                        if (err) throw err;
                        res.json(request.success(result.affectedRows))
            });

        });
    },
    listar : function (res) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT * from sala";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                for (let i = 0; i < results.length ; i++) {
                    AppModel.conn().query("SELECT * FROM professor WHERE codigo = '"+results[i].professor+"'", function (error, result) {
                        results[i].professor = result[0]
                        if (i ==  (results.length-1)){
                            res.json(results)
                        }
                    });
                }
            });
        });
    },
    my_class : function (res, username) {
        AppModel.conn().connect(function(err) {
            if (err) throw err;
            var sql = "SELECT sala.codigo, sala.descricao, (SELECT professor.nome FROM professor WHERE professor.codigo = sala.professor) as professor, sala.ativa FROM sala JOIN usuario_sala JOIN usuario on usuario_sala.sala_id = sala.codigo and\n" +
                "usuario_sala.usuario_id = usuario.codigo WHERE username = '"+username+"'";
            return AppModel.conn().query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                        res.json(request.success(results))
                }else{
                    res.json(request.success([]));
                }
            });

        });
    }

}

