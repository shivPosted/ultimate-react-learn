import './style.css';
import Main from './components/MainSection';
import Header from './components/Header';
import Result from './components/Results';
import { useState } from 'react';
import Rules from './components/Rules';
import calculateResult from './components/util';
let score = 0;

function App() {
  const [userChoice, setUserChoice] = useState(0);
  const [computerChoice, setComputerChoice] = useState(0);
  const [play, setPlay] = useState(true);
  const [showRules, setShowRules] = useState(false);

  const result = calculateResult(userChoice, computerChoice);
  function handleClick(newChoice) {
    const randomNo = Math.trunc(Math.random() * 3);
    setPlay(false);
    setUserChoice(+newChoice);
    setComputerChoice(randomNo);
    console.log(result);
  }

  function handlePlayAgain() {
    setPlay(true);
  }

  function hideRulesOverlay() {
    setShowRules(false);
  }
  return (
    <>
      <Header userChoice={userChoice} computerChoice={computerChoice} />
      {play && <Main handleClick={handleClick} />}
      {!play && (
        <Result
          userChoice={userChoice}
          computerChoice={computerChoice}
          result={result}
          handlePlayAgain={handlePlayAgain}
        />
      )}
      {showRules && <Rules hideRules={hideRulesOverlay} />}
      <div className="rules-btn" onClick={() => setShowRules(true)}>
        rules
      </div>
    </>
  );
}

export default App;
