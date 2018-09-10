const  conexao =  require('./conexao');
module.exports = {
  construir: function (object){
    return {
      nome: object.nome,
      instituicao: object.instituicao,
      email: object.email,
      senha: object.senha
    }
  },
  adicionar : function (object) {
    conexao.con().connect(function(err) {
      if (err) throw err;
      var sql = "INSERT INTO professor (nome, instituicao, email, senha) VALUES ?";
      var values = [
        [object.nome,
        object.instituicao,
        object.email,
        object.senha]
      ];
      return conexao.con().query(sql, [values], function (err, result) {
        if (err) throw err;
        return result.affectedRows
      });
    });
  }
}
