const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");  //importing Server class from socket.io , as it is something inside socketio therefore we use curly braces
app.use(cors()); 

const server =  http.createServer(app);     //creating server

const io = new Server(server, {             //instance of the class Server, in which the server we created is passed
    cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
    },
}) ; 

io.on("connection", (socket)=> {                    // listens for connection , which is an event
        
    console.log("\nUser connected : ",socket.id);

    socket.on("join_room", (data)=> {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) =>{
        // console.log(data);
        socket.to(data.room).emit("recieve_message", data);

    })
    socket.on("disconnect", ()=>{
      console.log("User Disconnected : ", socket.id);
          
    });
});                    

server.listen( 3001, ()=> {
    console.log("\nServer Running at port 3001 ^-^ ");
});