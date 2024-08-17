import './style.css';
import Main from './components/MainSection';
import Header from './components/Header';
import Result from './components/Results';
import { useState } from 'react';
import Rules from './components/Rules';

function calculateResult(yourChoice, computerChoice) {
  if (
    (yourChoice === 0 && computerChoice === 1) ||
    (yourChoice === 1 && computerChoice === 2) ||
    (yourChoice === 2 && computerChoice === 0)
  )
    return 0;
  else if (yourChoice === computerChoice) return 1;
  else return 2;
}

function App() {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [play, setPlay] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [score, setScore] = useState(0);

  const result = calculateResult(userChoice, computerChoice);

  console.log(result);
  function handleClick(newChoice) {
    const randomNo = Math.trunc(Math.random() * 3);
    console.log(randomNo);
    setPlay(false);
    setUserChoice(+newChoice);
    setComputerChoice(randomNo);

    setScore(cur => {
      console.log(cur);
      if (result === 2) {
        return cur + 1;
      } else if (result === 0) {
        return cur === 0 ? cur : cur - 1;
      } else {
        return cur;
      }
    });
  }

  function handlePlayAgain() {
    setPlay(true);
    setComputerChoice('');
    setUserChoice('');
  }

  function hideRulesOverlay() {
    setShowRules(false);
  }
  return (
    <>
      <Header score={score} />
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
