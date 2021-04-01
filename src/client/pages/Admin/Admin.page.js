import React, { Component } from 'react';

import queryString from 'query-string';

import Loader from '../../assets/loader-ring-black-minimized.gif';
import NextSlide from '../../assets/skip_next_black_24dp.svg';
import PrevSlide from '../../assets/skip_previous_black_24dp.svg';

import './styles.css';

import { loadSocketIo } from '../../helpers/scriptHelpers';
import Presentation from '../v2/Presentation/Presentation.page';

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            adminCode: queryString.parse(this.props.location.search).admin,
            isLoading: true,
            status: {}
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

            this.socket.on('status-update', (status) => {
                this.setState({
                    status: status
                })
            })

        })
    }

    render() {
        return (
            <div className="page admin">
                {!this.state.isLoading && <>
                    <Presentation />
                    <button className="presentation-option next-slide" onClick={() => this.socket.emit('next-slide', this.state.adminCode)}><img src={NextSlide} alt="Weiter"/></button>
                    <button className="presentation-option prev-slide" onClick={() => this.socket.emit('prev-slide', this.state.adminCode)}><img src={PrevSlide} alt="Zurück"/></button>
                    {this.state.status['doing-quiz'] > 0 && <div className="tile status">
                        <p>Im Quiz: {this.state.status['doing-quiz']}</p>
                    </div>}
                </>}
                {this.state.isLoading && <div className="loading">
                    <img src={Loader} alt="Wird geladen" />
                    <p>Wird geladen...</p>
                </div>}
            </div>
        );
    }
}

export default Admin;