import calculateResult from './util';
let score = 0;
export default function Header({ userChoice, computerChoice }) {
  console.log(userChoice, computerChoice);
  const result = calculateResult(userChoice, computerChoice);

  score = result === 0 ? score - 1 : result === 1 ? score : score + 1;
  return (
    <header>
      <h1>Rock paper scissors</h1>
      <div className="score-container">
        <p>score</p>
        <div className="score--label">{score}</div>
      </div>
    </header>
  );
}
