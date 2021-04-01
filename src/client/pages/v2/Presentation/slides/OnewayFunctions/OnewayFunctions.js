import React, { useState } from 'react';

import './styles.css';

const OnewayFunctions = props => {

    return (
        <div className={"slide one-way-functions" + (props.className ? ' ' + props.className : '')}>
            <h2>Einsatz von Einwegfunktionen</h2>
            <div className="seperator"/>
            <h3>- Einwegfunktion: Nur in eine Richtung lösbar</h3>
            <h3>- Falltürfunktion: Nur in eine Richtung lösbar, in die andere Richtung mit Geheiminformation lösbar</h3>
            <h3 style={{paddingLeft: '30px'}}>- z.B. Multiplikation von zwei Primzahlen</h3>
        </div>
    );
};

export default OnewayFunctions;