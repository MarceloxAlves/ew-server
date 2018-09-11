const  mysql = require('mysql');
module.exports  = {
    conn: function()
    { return mysql.createConnection(
        {
            host: 'us-cdbr-iron-east-01.cleardb.net',
            user: 'bb6bfbd1c0665c',
            password: '67de256c',
            database: 'heroku_a5a34aebadf4cbd',
            debug    :  false,
        });
    }
}
