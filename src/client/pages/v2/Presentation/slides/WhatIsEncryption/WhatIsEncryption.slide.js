import React, { useState } from 'react';

import './styles.css';

const WhatIsEncryption = props => {

    return (
        <div className={"slide what-is-encryption" + (props.className ? ' ' + props.className : '')}>
            <h2>Was ist Verschlüsselung?</h2>
            <div className="seperator" />
            <h3>1. Daten werden in eine unlesbare Form gebracht.</h3>
            <h3>2. Um Prozess umzukehren, muss man eine geheime Information (Schlüssel) kennen.</h3>
        </div>
    );
};

export default WhatIsEncryption;