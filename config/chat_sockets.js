// importing chat model to load preexisting chats
const Chat = require('../models/chat')

// server side function which will be the socket user(observer)
module.exports.chatSockets = function (socketServer) {
    const { Server } = require("socket.io");
    const io = new Server(socketServer, {
        cors: { // cross origin resouce service basically it is a kind of security measure
            // so website from port 8000 is able to access sockets from port 5000 only if on port 5000 
            // cors is configured to allow port 8000 wali website to access the sockets
            origin: "http://13.211.211.38:8000",
            credentials: true
        }
    });
    // once subscriber emits a connect observer starts on connection and emits a acknowledgment
    // to subscriber by emiting connect on it
    io.on('connection', function (socket) {
        console.log("New Connection Recieved :", socket.id);
        // handle emit from subs this one is for join_room : codeial
        socket.on('join_room', function(data){
            console.log("Joining Request Recieved :", data);
            // join the socket/sub who sent req to the codial room if it exists or create that room then join
            socket.join(data.chatroom);
            // notify other users in  codeial about a new user's joining with a func with same name
            // on client and server, func: user_joined , data from current user
            io.in(data.chatroom).emit('user_joined',data);
        });

        // detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            // also save the data in db
            Chat.create(data);
            io.in(data.chatroom).emit('receive_message', data);
        });

        // on diconnect
        socket.on('disconnect', function () {
            console.log("Socket Disconnected !");
        });
    });
}