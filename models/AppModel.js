const  mysql = require('mysql');
module.exports  = {
    conn: function()
    { return mysql.createConnection(
        {
            host: '31.170.161.231',
            user: 'itranspa_marcelo',
            password: 'Marcelo10',
            database: 'itranspa_editworld',
            debug    :  false,
        });
    }
}
