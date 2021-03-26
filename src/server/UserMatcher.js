class UserMatcher {
    constructor() {
        this.searchingUsers = [];

        this.onMatched = () => { };
    }

    reactOnNewUserSearching(userId) {
        this.searchingUsers.push({
            userId: userId,
            match: -1
        })
        if (this.searchingUsers.length >= 2) {
            this.onMatched(this.searchingUsers[0].userId, this.searchingUsers[1].userId);
            this.searchingUsers = this.searchingUsers.filter(user => this.searchingUsers[0].userId !== user.userId && this.searchingUsers[1].userId !== user.userId)
        }
        console.log(this.searchingUsers);
    }
}

module.exports = UserMatcher;