const  mysql = require('mysql-model');
module.exports  = {
  construct: function(table) {
   let appmodel =  mysql.createConnection(
       process.env.DATABASE_URI || {
           host: 'localhost',
           user: 'root',
           database: 'editworld',
           password: ''
       }
   );
    return  appmodel.extend({
      tableName: table,
    });
  }
}
