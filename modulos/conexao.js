const  mysql = require('mysql');
module.exports  = {
  con : function() {
    return mysql.createConnection({
      host: "cpl04.main-hosting.eu",
      user: "itranspa_marcelo",
      port: "3306",
      password: "Marcelo10",
      database: "itranspa_editworld"
    });
  }
}

