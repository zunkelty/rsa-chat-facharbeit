const { v4: uuid } = require('uuid');

class ChatManager {
    constructor() {
        this.chats = []

        this.onChatComplete = () => { };
    }

    reactOnMatched(match1, match2) {
        this.chats.push({
            chatId: uuid(),
            match1, match2
        })
        console.log(this.chats);
    }

    reactOnJoinChat(chatId, userId, userName, publicKey) {
        let chat = this.findChatById(chatId);
        if(!chat) return;
        if (chat.match1 === userId) {
            chat.match1Name = userName;
            chat.match1PubKey = publicKey;
        } else if (chat.match2 === userId) {
            chat.match2Name = userName;
            chat.match2PubKey = publicKey;
        } else {
            return console.error('User not in chat');
        }

        console.log(chat, this.chats);

        if (chat.match1Name && chat.match2Name) {
            this.onChatComplete(chat);
        }
    }

    reactOnChatKilled(chatId){
        this.chats = this.chats.filter(chat => chat.chatId !== chatId)
    }

    findChatWithUser(id) {
        return this.chats.find(item => item.match1 === id || item.match2 === id)
    }

    findChatById(id) {
        return this.chats.find(item => item.chatId === id)
    }
}

module.exports = ChatManager;