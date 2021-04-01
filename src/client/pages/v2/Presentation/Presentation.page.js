import React, { Component } from 'react';

import Loader from '../../../assets/loader-ring-black-minimized.gif';

import queryString from 'query-string';

import './styles.css';

import { loadSocketIo } from '../../../helpers/scriptHelpers';
import LandingPage from './slides/LandingPage/LandingPage.slide';
import Gliederung from './slides/Gliederung/Gliederung.slide';
import WhatIsEncryption from './slides/WhatIsEncryption/WhatIsEncryption.slide';
import SymAsymEncryption from './slides/SymAsymEncryption/SymAsymEncryption.slide';
import FirstQuiz from './slides/FirstQuiz/FirstQuiz.slide';
import WhatIsRSA from './slides/WhatIsRSA/WhatIsEncryption.slide';
import RSADemonstration from './slides/RSADemonstration/RSADemonstration';
import Setup from '../../Setup/Setup.page';
import LetsLookBTS from './slides/LetsLookBTS/LetsLookBTS.slide';
import PresentationPage from '../../Presentation/Presentation.page';

import { Redirect } from 'react-router';
import SecondQuiz from './slides/SecondQuiz/SecondQuiz.slide';
import OnewayFunctions from './slides/OnewayFunctions/OnewayFunctions';
import FinalPage from './slides/FinalPage/FinalPage.slide';

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
                setTimeout(() => {
                    this.setState({
                        step: step
                    })
                    window.scrollY = 0;
                }, 500);
                if(document.getElementsByClassName('step')[0] !== undefined) document.getElementsByClassName('step')[0].style.opacity = 0;
            })

        })
    }

    render() {
        return (
            <div className="page v2-presentation">
                {!this.state.isLoading && <div className="presentation-wrapper">
                    {this.state.step === 0 && <LandingPage className="step" />}
                    {this.state.step === 1 && <Gliederung className="step" />}
                    {this.state.step === 2 && <WhatIsEncryption className="step" />}
                    {this.state.step === 3 && <OnewayFunctions className="step" />}
                    {this.state.step === 4 && <SymAsymEncryption className="step" />}
                    {/* {this.state.step === 4 && <FirstQuiz className="step" track={(status) => {console.log('Tracking Quiz start'); this.socket.emit('track', status)}}/>} */}
                    {this.state.step === 5 && <WhatIsRSA className="step"/>}
                    {this.state.step === 6 && <RSADemonstration className="step"/>}
                    {this.state.step === 7 && <Setup className="step" jumpToPage={(page) => this.props.history.push(page)}/>}
                    {this.state.step === 8 && <LetsLookBTS className="step"/>}
                    {this.state.step === 9 && <PresentationPage step={1}/>}
                    {this.state.step === 10 && <PresentationPage step={2}/>}
                    {this.state.step === 11 && <PresentationPage step={3}/>}
                    {this.state.step === 12 && <PresentationPage step={4}/>}
                    {this.state.step === 13 && <PresentationPage step={5}/>}
                    {this.state.step === 14 && <PresentationPage step={6}/>}
                    {this.state.step === 15 && <PresentationPage step={7}/>}
                    {this.state.step === 16 && <PresentationPage step={8}/>}
                    {this.state.step === 17 && <PresentationPage step={9}/>}
                    {this.state.step === 18 && <PresentationPage step={10}/>}
                    {this.state.step === 19 && <PresentationPage step={11}/>}
                    {this.state.step === 20 && <PresentationPage step={12}/>}
                    {this.state.step === 21 && <PresentationPage step={13}/>}
                    {this.state.step === 22 && <PresentationPage step={14}/>}
                    {this.state.step === 23 && <SecondQuiz className="step" track={(status) => {console.log('Tracking Quiz start'); this.socket.emit('track', status)}}/>}
                    {this.state.step === 24 && <FinalPage className="step"/>}
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