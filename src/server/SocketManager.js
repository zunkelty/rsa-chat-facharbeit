const User = require('./User');

class SocketManager {
    constructor(io) {
        this.io = io;

        this.setup();

        this.onJoinedChat = () => { };
        this.onChatKilled = () => { };

        this.currentPresentationStep = 0;
        this.statuses = {};
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
                    this.onChatKilled(chatId);
                })
            })
            socket.on('join-admin', adminCode => {
                if (process.env.ADMIN_CODE = adminCode) {
                    socket.emit('admin-joined');

                    // socket.on('start-presentation', adminCode => {
                    //     if(process.env.ADMIN_CODE !== adminCode) return;
                    //     this.io.emit('start-presentation');
                    //     this.currentPresentationStep = 0;
                    // })

                    // socket.on('goto-step', (step, adminCode) => {
                    //     if(process.env.ADMIN_CODE !== adminCode) return;
                    //     this.currentPresentationStep = step;
                    //     this.io.emit('presentation-step', step);
                    // })

                    socket.on('next-slide', (adminCode) => {
                        if (process.env.ADMIN_CODE !== adminCode) return;
                        this.currentPresentationStep = this.currentPresentationStep + 1;
                        this.io.emit('v2/presentation-step', this.currentPresentationStep);
                    })

                    socket.on('prev-slide', (adminCode) => {
                        if (process.env.ADMIN_CODE !== adminCode) return;
                        if (this.currentPresentationStep - 1 < 0) return;
                        this.currentPresentationStep = this.currentPresentationStep - 1;
                        this.io.emit('v2/presentation-step', this.currentPresentationStep);
                    })

                }
            })
            socket.on('v2/join-presentation', () => {
                socket.emit('v2/joined-presentation', this.currentPresentationStep);

                socket.on('track', (status) => {
                    switch (status) {
                        case "started-quiz":
                            this.statuses['doing-quiz'] = (this.statuses['doing-quiz'] + 1 || 1);
                            break;
                        case "finished-quiz":
                            this.statuses['doing-quiz'] = (this.statuses['doing-quiz'] - 1 || 0);
                            break;
                    }
                    console.log('Status update', this.statuses)
                    this.io.emit('status-update', this.statuses);
                })
            });
        })
    }

    reactOnChatComplete(chat) {
        console.log('Complete', chat)
        this.io.to(chat.chatId).emit('chat-complete', chat);
    }
}

module.exports = SocketManager;