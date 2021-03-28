import React from 'react';

import './styles.css';

const LandingPage = props => {
    return (
        <div className={"slide landing-page"+(props.className ? ' '+props.className : '')}>
            <h2>Wie können Einwegfunktionen unsere Daten sicher schützen?</h2>
            <h3 style={{ marginTop: '7px' }}>Ausgewählte Aspekte asymmetrischer Verschlüsselungsverfahren.</h3>
            <p className="credits">Sönke Peters</p>
        </div>
    );
};

export default LandingPage;