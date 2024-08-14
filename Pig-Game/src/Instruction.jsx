const pigGameInstructions = [
  '1. The game requires two players. Each player takes turns to roll a die.',
  "2. On a player's turn, they roll a die as many times as they wish, adding up the rolled numbers to their turn total.",
  '3. If the player rolls a 1, they lose all points accumulated in their turn, and their turn ends immediately.',
  '4. If the player rolls any number other than 1, they can choose to either roll again or hold.',
  '5. If the player holds, their turn total is added to their overall score, and their turn ends.',
  '6. The first player to reach or exceed 100 points on their overall score wins the game.',
  "7. If a player rolls a 1, they lose their turn total, and it's the next player's turn.",
  '8. The game continues with players taking turns until one player reaches 100 points and wins the game.',
  '9. Remember, strategy is key: roll the die to accumulate points, but be cautious not to roll a 1!',
];

function Instruction({ setShowInstruction }) {
  return (
    <>
      <div className="overlay"></div>
      <div className="instruction">
        <div className="close-button" onClick={() => setShowInstruction(false)}>
          ×
        </div>
        <h1>Instruction to play👇</h1>
        <ul>
          {pigGameInstructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
        <p>
          Enjoy the game and have fun <span>😄</span>
        </p>
      </div>
    </>
  );
}

export default Instruction;
