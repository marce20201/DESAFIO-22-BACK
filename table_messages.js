// Creación de tabala

const { sqlite3Connect } = require('./DB/sqlite3.db');
const knex = require('knex')(sqlite3Connect);


/*
knex.schema.createTable('messages', table => {
    table.string('email')
    table.string('timestamp', 50)
    table.string('message', 255)
})
    .then(() => console.log('table created!'))
    .catch((err) => console.log(err))
    .finally(() => knex.destroy())
*/

knex.from('messages').select("*")
    .then((rows)=> {
        for (row of rows) {
            console.log(`${row['email']} - ${row['timestamp']} - ${row['message']}`)
        }
    }).catch((err) => {console.log(err); throw err})
    .finally(() => {
        knex.destroy();
    });

