import { useState } from 'react';
import './style.css';
('use-strict');

const stepDesc = [
  'Step 1: Learn React ⚛️',
  'Step 2: Get A Job 💼',
  'Step 3: 🤑 🤑',
];

function App() {
  return (
    <>
      {/* <Steps /> */}
      <Steps />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // let [test] = useState({name: 'Shiv'})
  function handleNext() {
    if (step === stepDesc.length) return null;
    setStep(cur => cur + 1);

    // step++;
  }
  function handlePrevious() {
    if (step === 1) return null;
    setStep(cur => cur - 1);

    //dont update the states manually like this
    // test.name = 'changed'
    // step--;
  }
  return (
    <>
      <button className="close-btn" onClick={() => setIsOpen(cur => !cur)}>
        {isOpen ? <span>&times;</span> : 'Show'}
      </button>
      {isOpen ? (
        <div className="container">
          <Numbers step={step} />
          <StepInfo step={step} />
          <Buttons fx={{ handleNext, handlePrevious }} />
        </div>
      ) : null}{' '}
    </>
  );
}

function Numbers({ step }) {
  return (
    <ul className="numbers">
      {[1, 2, 3].map((num, i) => (
        <Number key={i} num={num} step={step} />
      ))}
    </ul>
  );
}

function Number({ num, step }) {
  return <li className={`number ${step >= num ? 'active' : ''}`}>{num}</li>;
}
function StepInfo({ step }) {
  return <p className="step-desc">{stepDesc[step - 1]}</p>;
}

function Buttons({ fx: { handleNext, handlePrevious } }) {
  return (
    <div className="buttons">
      <button className="button" onClick={handlePrevious}>
        previous
      </button>
      <button className="button" onClick={handleNext}>
        next
      </button>
    </div>
  );
}

export default App;
