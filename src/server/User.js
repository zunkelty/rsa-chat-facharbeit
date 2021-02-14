class User{
    constructor(name, pubKey){
        this.name = name;
        this.pubKey = pubKey;
    }

    getName(){
        return this.name;
    }

    getKey(){
        return this.pubKey;
    }
}

module.exports = User;