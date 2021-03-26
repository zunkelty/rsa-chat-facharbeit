const User = require('./User');

class SocketManager {
    constructor(io) {
        this.io = io;

        this.setup();

        this.onJoinedChat = () => { };
    }

    setup() {
        this.io.on('connection', socket => {
            socket.on('join-chats', (chatId, userId, userName, publicKey) => {
                console.log('Joined chat', userName, 'with pubKey', publicKey);
                socket.join(chatId);
                this.onJoinChat(chatId, userId, userName, publicKey);

                socket.on('message', message => {
                    console.log('Got message', message)

                    let buffer = message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength);

                    socket.broadcast.to(chatId).emit('message', buffer);
                })

                socket.on('disconnect', () => {
                    socket.broadcast.to(chatId).emit('leave')
                })
            })
        })
    }

    reactOnChatComplete(chat) {
        console.log('Complete', chat)
        this.io.to(chat.chatId).emit('chat-complete', chat);
    }
}

module.exports = SocketManager;