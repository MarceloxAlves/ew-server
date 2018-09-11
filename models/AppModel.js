const  mysql = require('mysql-model');
module.exports  = {
  construct: function(table) {
   let appmodel =  mysql.createConnection(process.env.DATABASE.URL);
    return  appmodel.extend({
      tableName: table,
    });
  }
}
