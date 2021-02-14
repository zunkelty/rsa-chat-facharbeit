const User = require('./User');

class SocketManager {
    constructor(io) {
        this.io = io;

        this.activeUsers = [];

        this.setup();
    }

    setup() {
        this.io.on('connection', socket => {
            socket.emit('welcome');
            console.log('Connected');
            socket.on('join-chats', (userName, publicKey) => {
                console.log('Joined chat', userName, 'with pubKey', publicKey);
                this.activeUsers.push(new User(userName, publicKey));
                this.io.sockets.emit('active-users', this.activeUsers.map(user => {
                    return {
                        name: user.getName(),
                        pubKey: user.getKey()
                    }
                }))
                socket.on('disconnect', () => {
                    this.activeUsers = this.activeUsers.filter(user => user.getName() !== userName);
                    this.io.sockets.emit('active-users', this.activeUsers.map(user => {
                        return {
                            name: user.getName(),
                            pubKey: user.getKey()
                        }
                    }))
                })
            })
        })
    }
}

module.exports = SocketManager;