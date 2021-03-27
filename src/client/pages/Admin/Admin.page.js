import React, { Component } from 'react';

import queryString from 'query-string';

import Loader from '../../assets/loader-ring-black-minimized.gif';

import './styles.css';

import { loadSocketIo } from '../../helpers/scriptHelpers';

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            adminCode: queryString.parse(this.props.location.search).admin,
            isLoading: true,
        }

        if (queryString.parse(this.props.location.search).admin === undefined) {
            location.replace('/');
        }

        this.socket = undefined;
    }

    componentDidMount() {
        this.connectSockets();
    }

    connectSockets() {
        loadSocketIo(() => {
            console.log('Loaded socket.io');
            this.socket = io(process.env.NODE_ENV.trim() === 'development' ? ':8080' : '/', { transport: ['websocket'] });

            this.socket.emit('join-admin', this.state.adminCode);

            this.socket.on('admin-joined', () => {
                this.setState({
                    isLoading: false
                })
            })

        })
    }

    render() {
        return (
            <div className="page admin">
                {!this.state.isLoading && <div className="tile">
                    <button className="submit" onClick={() => this.socket.emit('start-presentation', this.state.adminCode)}>Präsentation anzeigen</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 1, this.state.adminCode)}>Schritt 1: Schlüsselpaar erzeugen</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 2, this.state.adminCode)}>Öffentlichen Schlüssel zeigen</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 3, this.state.adminCode)}>Privaten Schlüssel zeigen</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 4, this.state.adminCode)}>1.1 Sende öffentlichen Schlüssel an Chatpartner</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 5, this.state.adminCode)}>1.2 Empfange öffentlichen Schlüssel von Chatpartner</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 6, this.state.adminCode)}>Bereit zum Chatten!</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 7, this.state.adminCode)}>Schritt 7</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 8, this.state.adminCode)}>Schritt 8</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 9, this.state.adminCode)}>Schritt 9</button>
                    <button className="submit" onClick={() => this.socket.emit('goto-step', 10, this.state.adminCode)}>Schritt 10</button>
                </div>}
                {this.state.isLoading && <div className="loading">
                    <img src={Loader} alt="Wird geladen" />
                    <p>Wird geladen...</p>
                </div>}
            </div>
        );
    }
}

export default Admin;