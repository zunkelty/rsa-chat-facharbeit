import React, { Component } from 'react';
import queryString from 'query-string';
import Loader from '../../assets/loader-ring-black-minimized.gif';
import axios from 'axios';

import './styles.css';

class Match extends Component {

    constructor(props) {
        super(props);

        if (queryString.parse(this.props.location.search).name === undefined) {
            location.replace('/');
        }

    }

    componentDidMount() {
        setTimeout(() => {
            axios.post('/api/match/hello/')
                .then(res => {
                    if (!res.data.userId) return this.props.history.push('/');
                    this.poll(res.data.userId);
                }).catch(err => {
                    alert('Es ist ein Fehler augetreten. Versuche es erneut.');
                    this.props.history.push('/');
                })
        }, queryString.parse(location.search).abandoned === 'true' ? 5000 : 0)
    }

    poll(userId) {
        axios.get('/api/match/poll/' + userId)
            .then(res => {
                const status = res.data.status || undefined;
                if (!status) return this.props.history.push('/');
                if (status === 'open') {
                    setTimeout(() => this.poll(userId), 1000);
                } else if (status === 'found') {
                    this.props.history.push('/chat/' + res.data.chatId + '?name=' + queryString.parse(this.props.location.search).name + '&userId=' + userId);
                }
            })
    }

    render() {
        return (
            <div className="page match">
                <div className="tile">
                    <h2>Chat wird gesucht...</h2>
                    <h3>{queryString.parse(location.search).abandoned === 'true' ? 'Dein Chatpartner hat den Chat verlassen' : 'Warten auf einen Chatpartner'}</h3>
                </div>
            </div>
        );
    }
}

export default Match;