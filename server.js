const { Socket } = require('dgram');
const { sqlite3Connect } = require('./DB/sqlite3.db');

const express = require("express");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const knex = require('knex')(sqlite3Connect);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Config 
app.set("views", "./views");
app.set("view engine", "ejs");



const messages = {
    id: "12345", 
    mensajes: [
        {
            _id: "123",
            author: {
                email: 'mv33@gmail.com',
                nombre: 'Max',
                apellido: 'Verstappen',
                edad: '23',
                alias: 'Flying dutchman',
                avatar: 'aaaa',
            },
            text: 'Hola!'
        },
        {
            _id: "321",
            author: {
                email: 'dricc@gmail.com',
                nombre: 'Daniel',
                apellido: 'Ricciardo',
                edad: '33',
                alias: 'Honey Badger',
                avatar: 'sup',
            },
            text: 'Sup mate!'
        },
        {
            _id: "213",
            author: {
                email: 'landoooo@gmail.com',
                nombre: 'Lando',
                apellido: 'Norris',
                edad: '4',
                alias: 'Quadrant',
                avatar: 'aaaaa',
            },
            text: 'Hola'
        },
        {
            _id: "123",
            author: {
                email: 'mv33@gmail.com',
                nombre: 'Max',
                apellido: 'Verstappen',
                edad: '23',
                alias: 'Flying dutchman',
                avatar: 'aaaa',
            },
            text: 'Como estan?'
        }
    ] 
}

/*
const messages = [
    {
        email: 'xsawin@gmail.com',
        timestamp: '30/03/2022 10:15:22',
        message: 'Hola!'
    }
]
*/


knex('messages').insert(messages)
    .then(() => console.log('mensajes ingresados'))
    .catch((err) => console.log(err))



app.get('/', (req, res) => {
    res.render('pages/index', {productos: productos})
})



const util = require('util');

function print(objeto){
    console.log(util.inspect(objeto, false, 12, true));
};

const user = new schema.Entity('user', {}, {idAttribute: 'email'});

const chatSchema = new.schema.Entity('message', {
    author: user
}, {idAttribute:'_id'});

const normalizedData = normalize(messages, [chatSchema]);
print(normalizedData);
console.log(JSON.stringify(normalizedData).length);




io.on('connection', (socket) => {
    socket.broadcast.emit('mensaje-user', 'Hola mundo');

    
    socket.emit('messages', normalizedData);

    

    socket.on('new-message', function(data) {
        messages.push(data);

        knex('messages').insert(data)
            .then(() => console.log('mensajes ingresados'))
            .catch((err) => console.log(err))

        io.sockets.emit('messages', messages);
    });

})

http.listen(3030, () => {
    console.log('Driving-driving on port 3030');
})
