import { Rock, Paper, Scissors } from './IconComponents';

const resultStr = ['YOU LOSE', 'DRAW', 'YOU WON'];

export default function Result({
  userChoice,
  computerChoice,
  result,
  handlePlayAgain,
}) {
  return (
    <section className="play-choice-section reveal-result">
      <h4>You Picked</h4>
      <h4>The House Picked</h4>
      <Choice player={'user'} choice={userChoice} />
      <Choice player={'computer'} choice={computerChoice} />
      <ResultOverlay result={result} handlePlayAgain={handlePlayAgain} />
    </section>
  );
}

function Choice({ choice, player }) {
  return (
    <div className={`${player}--choice reveal-result`}>
      {/*somthing needs to be done here*/}
      <div
        className={`choice--icon ${
          choice === 0
            ? 'rock-container'
            : choice === 1
            ? 'paper-container'
            : 'scissors-container'
        }`}
      >
        <div className="choice--icon-circle result-section-icon">
          {choice === 0 ? <Rock /> : choice === 1 ? <Paper /> : <Scissors />}
        </div>
      </div>{' '}
    </div>
  );
}

function ResultOverlay({ result, handlePlayAgain }) {
  return (
    <div className="result-overlay">
      <p className="result-status">{resultStr[result]}</p>
      <div className="play-again-btn" onClick={handlePlayAgain}>
        Play Again
      </div>
    </div>
  );
}
