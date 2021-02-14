import React, { Component } from 'react';

import queryString from 'query-string';

import Loader from '../../assets/loader-ring-black-minimized.gif';

import './styles.css';
import { loadSocketIo } from '../../helpers/scriptHelpers';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: queryString.parse(this.props.location.search).name,
            searchUser: '',
            isLoading: false,
            activeUsers: []
        }

        if (queryString.parse(this.props.location.search).name === undefined) {
            location.replace('/');
        }

        this.socket = undefined;
    }

    componentDidMount() {
        loadSocketIo(() => {
            console.log('Loaded socket.io');
            this.socket = io(process.env.NODE_ENV.trim() === 'development' ? ':8080' : '/', { transport: ['websocket'] });

            this.socket.emit('join-chats', this.state.name, 'exampleKey')

            this.socket.on('welcome', () => {
                console.log('Connected to socket')
                this.setState({
                    isLoading: false
                })
            })

            this.socket.on('active-users', users => {
                this.setState({
                    activeUsers: users.filter(user => user.name !== this.state.name)
                })
            })
        })
    }

    activeUsers() {
        return this.state.activeUsers.map((user, key) => {
            return <div className="active-user" key={key}>
                <p>{user.name}</p>
            </div>
        })
    }

    render() {
        return (
            <div className="page chat">
                <div className="choose-chat">
                    <div className="title">
                        <h2>Aktive Chats</h2>
                        <h3>Klicke auf einen Nutzer um den Chat zu öffnen</h3>
                    </div>
                    <input placeholder="Nutzer suchen" onChange={(e) => this.setState({ searchUser: e.target.value })} />
                    {this.state.isLoading && <div className="loading">
                        <img src={Loader} /><p>Wird geladen...</p>
                    </div>}
                    {!this.state.isLoading && this.activeUsers()}
                </div>
                <div className="chat">

                </div>
            </div>
        );
    }
}

export default Chat;