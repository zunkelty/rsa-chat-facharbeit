import React, { useState } from 'react';

import './styles.css';

const WhatIsRSA = props => {

    return (
        <div className={"slide what-is-rsa" + (props.className ? ' ' + props.className : '')}>
            <h2>3. Was ist RSA-Verschlüsselung?</h2>
            <div className="seperator" />
            <h3>- Bekanntestes asymmetrisches Verschlüsselungsverfahren</h3>
            <h3>- Nach den Erfindern benannt: Ron Rivest (R), Adi Shamir (S), Len Adleman (A)</h3>
            <h3>- Nutzt Falltürfunktion: Multiplikation zweier Primzahlen</h3>
        </div>
    );
};

export default WhatIsRSA;