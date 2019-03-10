const  mysql = require('mysql');
module.exports  = {
    conn: function()
    { return mysql.createConnection(
        {
            host: 'cpl04.main-hosting.eu',
            user: 'itranspa_marcelo',
            password: 'Marcelo10',
            database: 'itranspa_editworld',
            debug    :  false,
        });
    }
}
