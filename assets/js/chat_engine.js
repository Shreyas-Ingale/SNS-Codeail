// THE SUBSCRIBER which starts the 2 way socket connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = $(`${chatBoxId}`); // chatbox element
        this.userEmail = userEmail; //current user
        // emit a connect event to observer(connect req)
        this.socket = io.connect('http://localhost:5000'); //13.211.211.38
        // subscriber socket server running on 5000
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    // console log on successfull connection and emit a request to join the codeial chatroom
    // chatroom is a space handled by observer with socket connection with diff subs
    // an observer can have many different chatrooms
    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("Connection Established using Sockets ... !");
            // send req to join codeial room by emit and a func name which must be same on server side
            // func : join_room, data to pass
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'
            });
            // handle an on for server emit/acknowledge msg
            self.socket.on('user_joined', function(data){
                console.log("A new User Joined :", data);
            });
        });

        //toggle the height of the chatbox
        $('#chat-heading').click(function(){
            $('#chat-messages-list').toggleClass('display-block');
            $('#chat-message-input-container').toggleClass('display-flex');
        });

        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            // if msg not empty send it to observer who will send it to all users
            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        // catch the msg sent as response by observer here
        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);
            let newMessage = $('<li>');
            let messageType = 'other-message';
            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<sub>', {
                'html': data.user_email
            }));
            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.append($('<hr>'));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
            $('#chat-message-input').val('');
        })
    }
}