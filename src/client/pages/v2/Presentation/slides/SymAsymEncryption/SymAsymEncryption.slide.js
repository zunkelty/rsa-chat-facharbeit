import React, { useState } from 'react';

import Key from '../../../../../assets/vpn_key_black_24dp.svg';
import Data from '../../../../../assets/description_black_24dp.svg';
import Lock from '../../../../../assets/lock_black_24dp.svg';
import ArrowRightIcon from '../../../../../assets/trending_flat_black_24dp.svg'

import './styles.css';

const SymAsymEncryption = props => {

    return (
        <div className={"slide sym-asym-encryption" + (props.className ? ' ' + props.className : '')}>
            <div className="tile">
                <h2>Symmetrische Verschlüsselung</h2>
                <div className="seperator" />
                <h3>- Zur Verschlüsselung und Entschlüsselung wird der gleiche Schlüssel verwendet.</h3>
                <h3></h3>
            </div>
            <div className="tile">
                <h2>Asymmetrische Verschlüsselung</h2>
                <div className="seperator" />
                <h3>- Zur Verschlüsselung wird ein Schlüssel (öffentlicher Schlüssel) verwendet.</h3>
                <h3>- Zur Entschlüsselung wird ein anderer Schlüssel (privater Schlüssel) verwendet.</h3>
            </div>
        </div>
    );
};

export default SymAsymEncryption;