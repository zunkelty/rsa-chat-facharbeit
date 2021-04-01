import React, { Component } from 'react';

import queryString from 'query-string';

import Loader from '../../assets/loader-ring-black-minimized.gif';
import PersonIcon from '../../assets/person_black_24dp.svg'
import ArrowRightIcon from '../../assets/trending_flat_black_24dp.svg'
import KeyIcon from '../../assets/vpn_key_black_24dp.svg'
import Data from '../../assets/description_black_24dp.svg'
import Encrypted from '../../assets/password_black_24dp.svg'

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

    render() {
        return (
            <div className="page presentation">
                {this.props.step === 1 && <div className="step one">
                    <div className="tile">
                        <h2>Schritt 1: Schlüsselpaar erzeugen</h2>
                        <div className="seperator" />
                        <h3>- Öffentlicher Schlüssel</h3>
                        <h3>- Privater Schlüssel</h3>
                    </div>
                </div>}
                {this.props.step === 2 && <div className="step two">
                    <div className="tile">
                        <h2>Öffentlicher Schlüssel:</h2>
                        <div className="seperator" />
                        <h3>{localStorage.getItem('ownPubKey').toString()}</h3>
                    </div>
                </div>}
                {this.props.step === 3 && <div className="step three">
                    <div className="tile">
                        <h2>Privater Schlüssel:</h2>
                        <div className="seperator" />
                        <h3>{localStorage.getItem('ownPrivateKey').toString()}</h3>
                    </div>
                </div>}
                {this.props.step === 4 && <div className="step four">
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
                {this.props.step === 5 && <div className="step five">
                    <div className="tile">
                        <h2>1.2 Empfange öffentlichen Schlüssel von Chatpartner</h2>
                        <div className="seperator" />
                        <div className="graphic-presentation">
                            <div className="you" style={{ marginRight: 'auto' }}>
                                <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                                <img src={PersonIcon} alt="Du selbst" />
                                <p>Du</p>
                            </div>
                            <img src={ArrowRightIcon} alt="senden an" style={{ 'transform': 'rotate(180deg)' }} />
                            <div className="partner" style={{ marginLeft: 'auto' }}>
                                <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                                <img src={PersonIcon} alt="Du selbst" />
                                <p>{localStorage.getItem('partnerName')}</p>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.props.step === 6 && <div className="step six">
                    <div className="tile">
                        <h2>Bereit zum Chatten!</h2>
                        <div className="seperator" />
                        <h3>- Öffentlicher Schlüssel des Chatpartners gespeichert</h3>
                        <h3>- Privater Schlüssel ist nur für das eigene Schlüsselpaar bekannt</h3>
                    </div>
                </div>}
                {this.props.step === 7 && <div className="step seven">
                    <div className="tile">
                        <h2>Schritt 2: Nachricht eingeben und auf "Senden" klicken</h2>
                        <div className="seperator" />
                        <h3>- Nachricht wird unverschlüsselt eingeben</h3>
                    </div>
                </div>}
                {this.props.step === 8 && <div className="step eight">
                    <div className="tile">
                        <h2>2.1 Verschlüssele die Nachricht mit dem öffentlichen Schlüssel deines Partners</h2>
                        <div className="seperator" />
                        <div className="graphic-presentation">
                            <div className="you" style={{ marginRight: 'auto' }}>
                                <img className="decrypted" src={Data} alt="Nachricht" />
                            </div>
                            <img src={ArrowRightIcon} alt="senden an" />
                            <img className="key" src={KeyIcon} alt="Öffentlicher Schlüssel" />
                            <img src={ArrowRightIcon} alt="senden an" />
                            <div className="encrypted-moving">
                                <img className="encrypted moving" src={Encrypted} alt="Verschlüsselte Nachricht" />
                            </div>
                            <div className="partner" style={{ marginLeft: 'auto' }}>
                                <img className="encrypted" src={Encrypted} alt="Verschlüsselte Nachricht" />
                            </div>
                        </div>
                    </div>
                </div>}
                {this.props.step === 9 && <div className="step nine">
                    <div className="tile">
                        <h2>Verschlüsselung für deine Nachricht "{localStorage.getItem('sentDecryptedMessage')}"</h2>
                        <div className="seperator" />
                        <h3>{localStorage.getItem('sentEncryptedMessage')}</h3>
                    </div>
                </div>}
                {this.props.step === 10 && <div className="step ten">
                    <div className="tile">
                        <h2>2.2 Versende die verschlüsselte Nachricht an deinen Partner</h2>
                        <div className="seperator" />
                        <div className="graphic-presentation">
                            <div className="you" style={{ marginRight: 'auto' }}>
                                <img className="encrypted" src={Encrypted} alt="Verschlüsselte Nachricht" />
                                <img src={PersonIcon} alt="Du selbst" />
                                <p>Du</p>
                            </div>
                            <img src={ArrowRightIcon} alt="senden an" />
                            <div className="partner" style={{ marginLeft: 'auto' }}>
                                <img className="encrypted" src={Encrypted} alt="Verschlüsselte Nachricht" />
                                <img src={PersonIcon} alt="Partner" />
                                <p>{localStorage.getItem('partnerName')}</p>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.props.step === 11 && <div className="step eleven">
                    <div className="tile">
                        <h2>Nachricht wurde gesendet!</h2>
                    </div>
                </div>}
                {this.props.step === 12 && <div className="step twelve">
                    <div className="tile">
                        <h2>Schritt 3: Partner empfängt verschlüsselte Nachricht</h2>
                        <div className="seperator" />
                        <div className="graphic-presentation">
                            <div className="you" style={{ marginRight: 'auto' }}>
                                <img className="encrypted" src={Encrypted} alt="Verschlüsselte Nachricht" />
                            </div>
                            <img src={ArrowRightIcon} alt="senden an" />
                            <div className="partner" style={{ marginLeft: 'auto' }}>
                                <img className="encrypted" src={Encrypted} alt="Verschlüsselte Nachricht" />
                                <img src={PersonIcon} alt="Partner" />
                                <p>{localStorage.getItem('partnerName')}</p>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.props.step === 13 && <div className="step thirteen">
                    <div className="tile">
                        <h2>3.1 Partner entschlüsselt Nachricht mit eigenem privaten Schlüssel</h2>
                        <div className="seperator" />
                        <div className="graphic-presentation">
                            <div className="you" style={{ marginRight: 'auto' }}>
                                <img className="decrypted" src={Encrypted} alt="Verschlüsselte Nachricht" />
                            </div>
                            <img src={ArrowRightIcon} alt="senden an" />
                            <img className="key" src={KeyIcon} alt="Privater Schlüssel" />
                            <img src={ArrowRightIcon} alt="senden an" />
                            <div className="encrypted-moving">
                                <img className="encrypted moving" src={Data} alt="Daten" />
                            </div>
                            <div className="partner" style={{ marginLeft: 'auto' }}>
                                <img className="encrypted" src={Data} alt="Daten" />
                            </div>
                        </div>
                    </div>
                </div>}
                {this.props.step === 14 && <div className="step fourteen">
                    <div className="tile">
                        <h2>Nachricht wurde empfangen und entschlüsselt!</h2>
                    </div>
                </div>}
            </div >
        );
    }
}

export default Presentation;