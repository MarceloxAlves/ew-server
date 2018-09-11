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
                    AppModel.conn().query(sql, function (error, result) {
                        results[i].professor = result[0]
                        if (i ==  (results.length-1)){
                            res.json(results)
                        }
                    });
                }
            });
        });
    },

}

