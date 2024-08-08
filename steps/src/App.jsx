import './style.css';
function App() {
  return (
    <div className="container">
      <Numbers />
      <StepInfo />
      <Buttons />
    </div>
  );
}

function Numbers() {
  return (
    <ul className="numbers">
      {[1, 2, 3].map((num, i) => (
        <Number key={i} num={num} />
      ))}
    </ul>
  );
}

function Number({ num }) {
  return <li className={`number ${num === 1 ? 'active' : ''}`}>{num}</li>;
}
function StepInfo({ num }) {
  return (
    <p className="step-desc">
      Step 1: Learn React ⚛️
      {/* {num === 1 && 'Step 1: Learn React ⚛️'}
      {num === 2 && 'Step 2: Get A Job 💼'}
      {num === 3 && 'Step 1: Learn React ⚛️'} */}
    </p>
  );
}

function Buttons() {
  return (
    <div className="buttons">
      <div className="button">previous</div>
      <div className="button">next</div>
    </div>
  );
}

export default App;
