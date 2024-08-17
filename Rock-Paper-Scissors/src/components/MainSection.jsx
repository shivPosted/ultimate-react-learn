import { Rock, Paper, Scissors, Triangle } from './IconComponents';

export default function Main({ handleClick }) {
  return (
    <main className="choice--container">
      <Triangle />
      <ChoiceIcon
        className="rock-container"
        dataChoice={0}
        handleClick={handleClick}
      >
        <Rock />
      </ChoiceIcon>
      <ChoiceIcon
        className="paper-container"
        dataChoice={1}
        handleClick={handleClick}
      >
        <Paper />
      </ChoiceIcon>
      <ChoiceIcon
        className="scissors-container"
        dataChoice={2}
        handleClick={handleClick}
      >
        <Scissors />
      </ChoiceIcon>
    </main>
  );
}

function ChoiceIcon({ className, children, dataChoice, handleClick }) {
  return (
    <div
      className={`choice--icon ${className}`}
      data-choice={dataChoice}
      onClick={e => {
        const choice = e.target.closest('.choice--icon').dataset.choice;
        handleClick(choice);
      }}
    >
      <div className="choice--icon-circle">{children}</div>
    </div>
  );
}
