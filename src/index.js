const http = require('http');
const path = require('path')

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');


const app = express();
const server = http.createServer(app);
const io = socketio(server)

// db connection
mongoose.connect('mongodb://127.0.0.1/chat-database')
.then(db => console.log('db is connected'))
.catch(err => console.error(err));



//settings
app.set('port', process.env.PORT || 3000);


require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});