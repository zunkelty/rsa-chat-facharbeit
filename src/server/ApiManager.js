const ApiRouter = require("./ApiRouter");
const ChatManager = require("./ChatManager");
const SocketManager = require("./SocketManager");
const UserMatcher = require("./UserMatcher");

class ApiManager{
    constructor(socket, restApi){

        this.socketManager = new SocketManager(socket); 
        this.apiRouter = new ApiRouter();
        this.userMatcher = new UserMatcher();
        this.chatManager = new ChatManager();

        this.setup();
    }

    setup(){
        this.apiRouter.onNewUserSearching = (name, userId) => this.userMatcher.reactOnNewUserSearching(name, userId);
        this.apiRouter.onCheckHasUserMatched = (userId) => this.chatManager.findChatWithUser(userId);
        
        this.userMatcher.onMatched = (match1, match2) => this.chatManager.reactOnMatched(match1, match2);

        this.socketManager.onJoinChat = (chatId, userId, userName, publicKey) => this.chatManager.reactOnJoinChat(chatId, userId, userName, publicKey);

        this.chatManager.onChatComplete = (chat) => this.socketManager.reactOnChatComplete(chat);
    }

    getRouter(){
        return this.apiRouter.getRouter();
    }
}

module.exports = ApiManager;