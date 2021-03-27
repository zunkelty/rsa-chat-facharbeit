import React, { Component } from 'react';

import queryString from 'query-string';

import Loader from '../../assets/loader-ring-black-minimized.gif';
import PersonIcon from '../../assets/person_black_24dp.svg'
import ArrowRightIcon from '../../assets/trending_flat_black_24dp.svg'
import KeyIcon from '../../assets/vpn_key_black_24dp.svg'

import './styles.css';

import { loadSocketIo } from '../../helpers/scriptHelpers';


class Presentation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
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

            this.socket.emit('join-presentation');

            this.socket.on('joined-presentation', step => {
                this.setState({
                    isLoading: false,
                    step: step
                })
            });

            this.socket.on('presentation-step', step => {
                this.setState({
                    step: step
                })
            })

        })
    }

    render() {
        return (
            <div className="page presentation">
                {!this.state.isLoading && <>
                    {this.state.step === 1 && <div className="step one">
                        <div className="tile">
                            <h2>Schritt 1: Schlüsselpaar erzeugen</h2>
                            <div className="seperator" />
                            <h3>- Öffentlicher Schlüssel</h3>
                            <h3>- Privater Schlüssel</h3>
                        </div>
                    </div>}
                    {this.state.step === 2 && <div className="step two">
                        <div className="tile">
                            <h2>Öffentlicher Schlüssel:</h2>
                            <div className="seperator" />
                            <h3>{localStorage.getItem('ownPubKey').toString()}</h3>
                        </div>
                    </div>}
                    {this.state.step === 3 && <div className="step three">
                        <div className="tile">
                            <h2>Privater Schlüssel:</h2>
                            <div className="seperator" />
                            <h3>{localStorage.getItem('ownPrivateKey').toString()}</h3>
                        </div>
                    </div>}
                    {this.state.step === 4 && <div className="step four">
                        <div className="tile">
                            <h2>1.1 Sende öffentlichen Schlüssel an Chatpartner</h2>
                            <div className="seperator" />
                            <div className="graphic-presentation">
                                <div className="you" style={{ marginRight: 'auto' }}>
                                    <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                                    <img src={PersonIcon} alt="Du selbst" />
                                    <p>Du</p>
                                </div>
                                <img src={ArrowRightIcon} alt="senden an" />
                                <div className="partner" style={{ marginLeft: 'auto' }}>
                                    <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                                    <img src={PersonIcon} alt="Du selbst" />
                                    <p>{localStorage.getItem('partnerName')}</p>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {this.state.step === 5 && <div className="step five">
                        <div className="tile">
                            <h2>1.2 Empfange öffentlichen Schlüssel von Chatpartner</h2>
                            <div className="seperator" />
                            <div className="graphic-presentation">
                                <div className="you" style={{ marginRight: 'auto' }}>
                                    <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                                    <img src={PersonIcon} alt="Du selbst" />
                                    <p>Du</p>
                                </div>
                                <img src={ArrowRightIcon} alt="senden an" style={{'transform': 'rotate(180deg)'}}/>
                                <div className="partner" style={{ marginLeft: 'auto' }}>
                                    <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                                    <img src={PersonIcon} alt="Du selbst" />
                                    <p>{localStorage.getItem('partnerName')}</p>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {this.state.step === 6 && <div className="step six">
                        <div className="tile">
                            <h2>Bereit zum Chatten!</h2>
                            <div className="seperator" />
                            <h3>- Öffentlicher Schlüssel des Chatpartners gespeichert</h3>
                            <h3>- Privater Schlüssel ist nur für das eigene Schlüsselpaar bekannt</h3>
                        </div>
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

export default Presentation;