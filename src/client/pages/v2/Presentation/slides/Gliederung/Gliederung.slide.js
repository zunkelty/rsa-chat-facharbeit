import React from 'react';

import ScrollDown from '../../../../../assets/south_black_24dp.svg';

import './styles.css';

const Gliederung = props => {
    return (
        <div className={"slide gliederung" + (props.className ? ' ' + props.className : '')}>
            <div className="timeline">
                <div className="point" style={{ marginTop: '30px' }}>
                    <div className="left">
                        <h3>1. Was ist Verschlüsselung?</h3>
                    </div>
                </div>
                <div className="point" style={{ marginTop: '200px' }}>
                    <div className="tile right">
                        <h3>2. Symmetrische und asymmetrische Verschlüsselung</h3>
                    </div>
                </div>
                {/* <div className="point quiz" style={{ marginTop: '370px' }}>
                    <div className="tile left">
                        <h3>Mini-Quiz</h3>
                    </div>
                </div> */}
                <div className="point" style={{ marginTop: '370px' }}>
                    <div className="tile left">
                        <h3>3. Was ist RSA-Verschlüsselung?</h3>
                    </div>
                </div>
                <div className="point" style={{ marginTop: '550px' }}>
                    <div className="tile right">
                        <h3>4. Ablauf einer Verschlüsselung</h3>
                    </div>
                </div>
            </div>
            {/* <div className="scroll-down-container">
                <p>Scrolle nach unten</p>
                <img src={ScrollDown} alt="Scrolle nach unten" className="arrow-down" />
            </div> */}
        </div>
    );
};

export default Gliederung;