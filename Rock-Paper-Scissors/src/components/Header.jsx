import { useState } from 'react';

export default function Header({ score }) {
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
