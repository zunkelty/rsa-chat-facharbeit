import React, { Component } from 'react';

import Loader from '../../../assets/loader-ring-black-minimized.gif';

import './styles.css';

import { loadSocketIo } from '../../../helpers/scriptHelpers';
import LandingPage from './slides/LandingPage/LandingPage.slide';
import Gliederung from './slides/Gliederung/Gliederung.slide';

class Presentation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            step: undefined
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

            this.socket.emit('v2/join-presentation');

            this.socket.on('v2/joined-presentation', step => {
                this.setState({
                    isLoading: false,
                    step: step
                })
            });

            this.socket.on('v2/presentation-step', step => {
                setTimeout(() => this.setState({
                    step: step
                }), 500);
                document.getElementsByClassName('step')[0].style.opacity = 0;
            })

        })
    }

    render() {
        return (
            <div className="page v2-presentation">
                {!this.state.isLoading && <div className="presentation-wrapper">
                    {this.state.step === 0 && <LandingPage className="step" />}
                    {this.state.step === 1 && <Gliederung className="step"/>}
                    {this.state.step === 2 && <p>Step 2</p>}
                </div>}
                {this.state.isLoading && <div className="loading">
                    <img src={Loader} alt="Wird geladen" />
                    <p>Wird geladen...</p>
                </div>}
            </div>
        );
    }
}

export default Presentation;