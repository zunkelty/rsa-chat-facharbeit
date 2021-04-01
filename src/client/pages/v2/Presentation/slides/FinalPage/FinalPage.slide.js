import React from 'react';

import './styles.css';

const FinalPage = props => {
    return (
        <div className={"slide final-page"+(props.className ? ' '+props.className : '')}>
            <h2>Gibt es noch Fragen?</h2>
            <p className="credits">Sönke Peters</p>
        </div>
    );
};

export default FinalPage;