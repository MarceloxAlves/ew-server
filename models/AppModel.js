const  mysql = require('mysql-model');
module.exports  = {
  construct: function(table) {
   let appmodel =  mysql.createConnection({
     host: "31.170.161.231",
     user: "itranspa_marcelo",
     password: "Marcelo10",
     database: "itranspa_editworld"});
    return  appmodel.extend({
      tableName: table,
    });
  }
}
