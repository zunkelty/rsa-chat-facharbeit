import React, { useState } from 'react';

import './styles.css';

const RSADemonstration = props => {

    return (
        <div className={"slide rsa-demo" + (props.className ? ' ' + props.className : '')}>
            <h2>3. Ablauf einer Verschlüsselung</h2>
            <div className="seperator" />
            <h3>- Beispiel: Ende-zu-Ende-Verschlüsselung mit RSA bei einer Chat-App</h3>
        </div>
    );
};

export default RSADemonstration;