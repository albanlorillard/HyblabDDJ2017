/**
 * Created by alban on 28/01/17.
 */

// Mysql connection
var mysql = require('mysql');        // Mysql NodeJS Modules.
var configDB = require('./db.json'); // The JSON file with the database config connection


/*var db = mysql.createConnection(configDB);
db.connect(function(err){
    if(err){
        console.log("Error connection to database. Check if your database work and if login is correct");
        return;
    }
    console.log("Connection to database establishedon.");
});*/

var connection;
function handleDisconnect() {
    connection = mysql.createConnection(configDB); // Recreate the connection, since
                                                    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
        else
        {
            console.log("Connection to database established");
        }
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            console.log("Connection to database lost.. Retry...");
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            console.log("Other db problem : ", err);
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

module.exports=connection;

