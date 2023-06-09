const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on('connection', (socket) => {
    console.log('a user has connected');
    io.emit('new connection');
    socket.on('chat message', (sender, msg)=>{
        io.emit('chat message', sender, msg);
        console.log(msg);
    });
    socket.on('disconnect', ()=>{
        console.log('a user has disconnected');
    });
});

server.listen(3000, ()=>{
    console.log("server running on port 3000");
});