import { useState } from 'react';
import './style.css';
import Player from './Player';
import Button from './Button';
import DiceImage from './DiceImage';
import Instruction from './Instruction';
const initialScore = {
  player1: 0,
  player2: 0,
};

function App() {
  const [diceRoll, setDiceRoll] = useState(null);
  const [activePlayer, setActivePlayer] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(initialScore);
  const [showInstruction, setShowInstruction] = useState(true); //ONLY FOR DISPLAYING INSTRUCTION
  const gameOver = Object.entries(totalScore)
    .flat()
    .some(num => num >= 100);
  const randomNo = Math.trunc(Math.random() * 6) + 1;
  console.log(gameOver);
  console.log(Object.entries(totalScore).flat());
  function handleHoldScore() {
    if (randomNo !== 1) {
      setTotalScore(obj =>
        activePlayer === 1
          ? { ...obj, player1: obj.player1 + currentScore }
          : { ...obj, player2: obj.player2 + currentScore }
      );
    }
    setActivePlayer(cur => (cur === 1 ? 2 : 1));

    setCurrentScore(0);
  }

  function handleDiceRoll() {
    if (randomNo === 1) {
      setDiceRoll(randomNo);
      console.log(diceRoll);
      handleHoldScore();
      return null;
    }
    setDiceRoll(randomNo);
    setCurrentScore(cur => cur + randomNo);
  }

  function handleReset() {
    setDiceRoll(null);
    setActivePlayer(1);
    setCurrentScore(0);
    setTotalScore(initialScore);
  }

  return (
    <>
      <main>
        <Player
          playerNo={1}
          activePlayer={activePlayer}
          diceRoll={diceRoll}
          currentScore={currentScore}
          totalScore={totalScore.player1}
        />
        <Player
          playerNo={2}
          activePlayer={activePlayer}
          diceRoll={diceRoll}
          currentScore={currentScore}
          totalScore={totalScore.player2}
        />
        <Button className="new-game" handleClick={handleReset}>
          ♻️ New Game
        </Button>
        <Button
          className="roll-dice"
          handleClick={gameOver ? null : handleDiceRoll}
        >
          🎲 Roll Dice
        </Button>
        <Button
          className="pause-game"
          handleClick={gameOver ? null : handleHoldScore}
        >
          ⏸️ Hold
        </Button>
        {diceRoll && <DiceImage imgNo={diceRoll} />}
      </main>
      {showInstruction && (
        <Instruction setShowInstruction={setShowInstruction} />
      )}
    </>
  );
}
export default App;
