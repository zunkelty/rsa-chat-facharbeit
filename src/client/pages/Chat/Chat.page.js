import React, { Component } from 'react';

import queryString from 'query-string';

import Loader from '../../assets/loader-ring-black-minimized.gif';

import './styles.css';

import { loadSocketIo } from '../../helpers/scriptHelpers';
import { generateNewKeyPair } from '../../helpers/generateNewKeyPair';
import { encryptMessage, decryptMessage, test } from '../../helpers/encryptDecrypt';

class Chat extends Component {

    constructor(props) {
        super(props);

        console.log(props.match.params.chatId)

        this.state = {
            name: queryString.parse(this.props.location.search).name,
            userId: queryString.parse(this.props.location.search).userId,
            pubKey: '',
            privateKey: '',
            chatId: props.match.params.chatId,
            isLoading: true,
            partnerPubKey: '',
            partnerName: '',
            messages: [],
            message: ''
        }

        if (queryString.parse(this.props.location.search).name === undefined) {
            location.replace('/');
        }

        this.socket = undefined;
    }

    componentDidMount() {
        generateNewKeyPair().then(keys => {
            this.setState({
                pubKey: keys.publicKey,
                privateKey: keys.privateKey
            })
            this.connectSockets(keys.publicKey);
        });
    }

    connectSockets(pubKey) {
        loadSocketIo(() => {
            console.log('Loaded socket.io');
            this.socket = io(process.env.NODE_ENV.trim() === 'development' ? ':8080' : '/', { transport: ['websocket'] });

            this.socket.emit('join-chats', this.state.chatId, this.state.userId, this.state.name, JSON.stringify(pubKey))

            this.timeout = setTimeout(() => this.props.history.push('/match?name=' + this.state.name), 10000);

            this.socket.on('chat-complete', chat => {
                console.log('Joined', chat)
                clearTimeout(this.timeout);
                if (chat.match1 === this.state.userId) {
                    this.setState({
                        partnerPubKey: JSON.parse(chat.match2PubKey),
                        partnerName: chat.match2Name,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        partnerPubKey: JSON.parse(chat.match1PubKey),
                        partnerName: chat.match1Name,
                        isLoading: false
                    })
                }
                localStorage.setItem('partnerPubKey', this.state.partnerPubKey);
                localStorage.setItem('partnerName', this.state.partnerName);
                localStorage.setItem('ownName', this.state.name);
            });

            this.socket.on('message', encrypted => {
                console.log('Received', encrypted)
                decryptMessage(new Uint8Array(encrypted), this.state.privateKey)
                    .then(decrypted => {
                        this.setState({
                            messages: this.state.messages.concat({
                                isSelf: false,
                                message: decrypted
                            })
                        })
                    })
            })

            this.socket.on('leave', () => {
                this.props.history.push('/match?name=' + this.state.name + '&abandoned=true')
            })

        })
    }

    handleMessageChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    keyDown(e) {
        if (e.key === 'Enter') {
            this.submitMessage(this.state.message);
        }
    }

    submitMessage(message) {
        if(message.length === 0) return;
        this.setState({
            message: '',
            messages: this.state.messages.concat({
                isSelf: true,
                message: message
            })
        })
        encryptMessage(message, this.state.partnerPubKey)
            .then(encrypted => {
                this.socket.emit('message', encrypted);
            })
    }

    messages() {
        return this.state.messages.map((message, i) => {
            return <div key={i} className={"message-wrapper" + (message.isSelf ? ' self' : '')}>
                <div key={i} className={"message" + (message.isSelf ? ' self' : '')}>
                    <p>{message.message}</p>
                </div>
                {console.log(message, this.state.messages[i + 1])}
                {(!this.state.messages[i + 1] || message.isSelf !== this.state.messages[i + 1].isSelf) && <p className="sender-tag">Von {message.isSelf ? this.state.name : this.state.partnerName}</p>}
            </div>
        })
    }

    render() {
        return (
            <div className="page chat">
                {!this.state.isLoading && <div className="tile">
                    <h3>Du schreibst mit: {this.state.partnerName}</h3>
                    <div className="seperator" />
                    <div className="messages">
                        {this.messages()}
                    </div>
                    <span className="textfield">
                        <input type="text" value={this.state.message} onChange={(e) => this.handleMessageChange(e)} onKeyDown={(e) => this.keyDown(e)} autoComplete="none" placeholder="Schreibe eine Nachricht" />
                    </span>
                    <button className="submit" onClick={() => this.submitMessage(this.state.message)}>Senden</button>
                </div>}
                {this.state.isLoading && <div className="loading">
                    <img src={Loader} alt="Wird geladen" />
                    <p>Wird geladen...</p>
                </div>}
            </div>
        );
    }
}

export default Chat;