import React, { Component } from 'react';

import Loader from '../../assets/loader-white-minimized.gif';

import './styles.css';

class Setup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameError: '',
            isLoading: false
        }
    }


    handleNameChange(e) {
        this.setState({
            name: e.target.value,
            nameError: e.target.value.trim() !== '' ? '' : 'Gib einen Namen ein.'
        })
    }

    keyDown(e) {
        console.log(e.key);
        if (e.key === 'Enter') {
            this.submitName();
        }
    }

    submitName() {
        if(this.state.nameError === '' && this.state.name.trim() !== ''){
            this.setState({
                isLoading: true
            })
            setTimeout(() => {
                this.props.history.push('/chat?name='+encodeURI(this.state.name.trim()));
            }, 700); //Wait for fade-out effect to finish
        }else{
            this.setState({
                nameError: 'Gib einen Namen ein'
            })
        }
    }

    render() {
        return (
            <div className="page setup">
                <div className={"tile"+(this.state.isLoading ? ' fade-out' : '')}>
                    <h2>Entdecke, wie Ende-zu-Ende-Verschlüsselung funktioniert</h2>
                    <h3>Chatte mit RSA-Verschlüsselung</h3>
                    <span className="textfield">
                        <p>Namensabkürzung auf Schulen-Hannover</p>
                        <input type="text" value={this.state.name} onChange={(e) => this.handleNameChange(e)} onKeyDown={(e) => this.keyDown(e)} autoComplete="none" placeholder="z.B. maxmus" />
                        <p style={{ display: this.state.nameError !== '' ? 'block' : 'none' }} className="error">{this.state.nameError}</p>
                    </span>
                    {!this.state.isLoading && <button className="submit" onClick={() => this.submitName()}>Weiter</button>}
                    {this.state.isLoading && <span className="submit">
                        <img src={Loader}></img>
                    </span>}
                </div>
                <p className={"credits"+(this.state.isLoading ? ' fade-out' : '')}>von Sönke Peters</p>
            </div>
        );
    }
}

export default Setup;