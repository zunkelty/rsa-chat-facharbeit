import React, { useEffect, useState } from 'react';

import './styles.css';

const FirstQuiz = props => {

    const [isQuizRunning, setIsQuizRunning] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [points, setPoints] = useState(-1);

    function startQuiz() {
        setTimeout(() => {
            setIsQuizRunning(true);
            props.track('started-quiz');
        }, 500);

        document.getElementsByClassName('title')[0].style.opacity = 0;
        document.getElementsByClassName('pyro')[0].style.opacity = 0;
    }

    function handleAnswerClick(e) {
        let answerId = e.target.id;
        let conflictingAnswersRemoved = selectedAnswers.filter(answer => answer[0] !== answerId[0]);
        let updatedList = conflictingAnswersRemoved.concat(answerId);
        [].forEach.call(document.getElementsByClassName('answer'), function (item) {
            if (updatedList.includes(item.id) && !item.classList.contains('selected')) {
                item.classList.add('selected')
            } else if (!updatedList.includes(item.id) && item.classList.contains('selected')) {
                item.classList.remove('selected');
            }
        });
        setSelectedAnswers(updatedList);
        console.log('Updated', updatedList)
        setTimeout(() => console.log(selectedAnswers), 1000);
    }

    useEffect(() => {
        console.log('New selectedAnswers', selectedAnswers)
    }, [selectedAnswers])

    function finishQuiz() {

        setIsQuizRunning(false);

        props.track('finished-quiz');

        let calcPoints = 0;
        selectedAnswers.forEach(item => {
            console.log({ item })
            calcPoints = ['1d', '2c', '3a'].includes(item) ? calcPoints + 1 : calcPoints;
        })
        setPoints(calcPoints);
        if (calcPoints > 0) document.getElementsByClassName('pyro')[0].style.opacity = 1;
    }

    return (
        <>
            <div className={"slide first-quiz" + (props.className ? ' ' + props.className : '')}>
                <svg className="front" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#100D12" fillOpacity="1" d="M0,32L48,53.3C96,75,192,117,288,160C384,203,480,245,576,224C672,203,768,117,864,117.3C960,117,1056,203,1152,208C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <div className="back-filler"></div>
                <svg className="back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1B0E2A" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,240C672,256,768,288,864,272C960,256,1056,192,1152,192C1248,192,1344,256,1392,288L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                {!isQuizRunning && points === -1 && <div className="tile title">
                    <h2>Mini-Quiz Nr. 1</h2>
                    <div className="seperator"></div>
                    <button id="start" onClick={startQuiz}>Starten</button>
                </div>}
                {isQuizRunning && <div className="tile questions">
                    <h2>1. Wie viele Schlüssel werden bei asymmetrischer Verschlüsselung verwendet?</h2>
                    <button className="answer" id="1a" onClick={handleAnswerClick}>3 Schlüssel</button>
                    <button className="answer" id="1b" onClick={handleAnswerClick}>1 Schlüssel</button>
                    <button className="answer" id="1c" onClick={handleAnswerClick}>4 Schlüssel</button>
                    <button className="answer" id="1d" onClick={handleAnswerClick}>2 Schlüssel</button>
                    <div className="seperator" />
                    <h2>2. Wie viele Schlüssel werden bei symmetrischer Verschlüsselung verwendet?</h2>
                    <button className="answer" id="2a" onClick={handleAnswerClick}>2 Schlüssel</button>
                    <button className="answer" id="2b" onClick={handleAnswerClick}>3 Schlüssel</button>
                    <button className="answer" id="2c" onClick={handleAnswerClick}>1 Schlüssel</button>
                    <button className="answer" id="2d" onClick={handleAnswerClick}>4 Schlüssel</button>
                    <div className="seperator" />
                    <h2>3. Welche Verschlüsselung ist das: Eine Nachricht wird online mit Ende-zu-Ende-Verschlüsselung gesendet. Empfänger und Absender kennen sich nicht persönlich.</h2>
                    <button className="answer" id="3a" onClick={handleAnswerClick}>Asymmetrisch</button>
                    <button className="answer" id="3b" onClick={handleAnswerClick}>Symmetrisch</button>
                    <button className="answer" id="3c" onClick={handleAnswerClick}>Keine der beiden</button>
                    <div className="seperator" />
                    <button className="submit" onClick={finishQuiz}>Beenden</button>
                </div>}
                {!isQuizRunning && points >= 0 && <div className="tile result">
                    <h2>{points}/3 Fragen richtig</h2>
                    <div className="seperator"/>
                    <h3 className="question">1. Wie viele Schlüssel werden bei asymmetrischer Verschlüsselung verwendet?</h3>
                    <h3> - 2 Schlüssel: Ein Schlüssel zur Verschlüsselung und ein Schlüssel zur Entschlüsselung.</h3>
                    <div className="seperator"/>
                    <h3 className="question">2. Wie viele Schlüssel werden bei symmetrischer Verschlüsselung verwendet?</h3>
                    <h3> - 1 Schlüssel: Ein Schlüssel zur Verschlüsselung und Entschlüsselung.</h3>
                    <div className="seperator"/>
                    <h3 className="question">3. Welche Verschlüsselung ist das: Eine Nachricht wird online mit Ende-zu-Ende-Verschlüsselung gesendet. Empfänger und Absender kennen sich nicht persönlich.</h3>
                    <h3> - Asymmetrische Verschlüsselung: Da sich beide Chatpartner nicht persönlich kennen, können ihre Schlüssel nicht händisch ausgetauscht worden sein. Damit ist nur die asymmetrische Verschlüsselung möglich.</h3>
                    <div className="seperator"/>
                </div>}
            </div>
            <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
            </div>
        </>
    );
};

export default FirstQuiz;