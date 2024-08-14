export default function Player({
  playerNo,
  activePlayer,
  currentScore,
  totalScore,
}) {
  return (
    <div
      className={`player-${playerNo} flex ${
        playerNo === activePlayer ? '' : 'player-inactive'
      } ${totalScore >= 100 ? 'player-won' : ''}`}
    >
      <div className="total-score-section">
        <h2 className={`celebrate-${playerNo}`}>Player {playerNo}</h2>
        <p className={`total-score-${playerNo}`}>{totalScore}</p>
      </div>
      <div className={`current-score-section-${playerNo}`}>
        <h3>current</h3>
        <p className={`current-score-${playerNo}`} id={`current--${playerNo}`}>
          {playerNo === activePlayer ? currentScore : 0}
        </p>
      </div>
    </div>
  );
}
