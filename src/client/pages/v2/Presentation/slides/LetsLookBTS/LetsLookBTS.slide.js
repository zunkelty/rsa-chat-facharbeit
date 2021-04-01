import React, { useState } from 'react';

import './styles.css';

const LetsLookBTS = props => {

    return (
        <div className={"slide lets-look-bts" + (props.className ? ' ' + props.className : '')}>
            <h2>Was ist beim Chatten gerade passiert?</h2>
        </div>
    );
};

export default LetsLookBTS;