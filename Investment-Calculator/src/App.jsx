import { useState } from 'react';
import { formatter, buildTable } from './util';
import './style.css';

const initTable = [];

const initYear = new Date().getFullYear();

for (let i = 0; i < 12; i++) {
  const obj = {
    Year: initYear + i,
    interestThisYear: 500,
    investmentValue: 100,
    totalInterest: 500,
    investedCapital: 12000,
  };
  initTable.push(obj);
}

function App() {
  const [userInput, setUserInput] = useState({
    initialValue: 10000,
    anual: 300,
    interestRate: 5.5,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    if (+newValue < 0) return null;
    setUserInput(preValue => {
      return { ...preValue, [inputIdentifier]: +newValue };
    });
  }

  const table = [];
  buildTable(userInput, table);

  return (
    <div className="app">
      <Input userInput={userInput} handleChange={handleChange} />
      {table && <InvestmentTable table={table} />}
    </div>
  );
}

function Input({ userInput, handleChange }) {
  return (
    <div className="user-input">
      <label htmlFor="init-invest">Initial Investment</label>
      <input
        type="number"
        id="init-invest"
        value={userInput.initialValue}
        onChange={e => handleChange(`initialValue`, e.target.value)}
      />

      <label htmlFor="anual-invest">Anual Investment</label>
      <input
        type="number"
        id="anual-invest"
        value={userInput.anual}
        onChange={e => handleChange(`anual`, e.target.value)}
      />

      <label htmlFor="interest">Interest Rate</label>
      <input
        type="number"
        id="interest"
        value={userInput.interestRate}
        onChange={e => handleChange(`interestRate`, e.target.value)}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="number"
        id="duration"
        value={userInput.duration}
        onChange={e => handleChange(`duration`, e.target.value)}
      />
    </div>
  );
}

function InvestmentTable({ table }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <TableBody table={table} />
    </table>
  );
}

function TableBody({ table }) {
  return (
    <tbody>
      {table.map((record, i) => (
        <tr key={i}>
          <td>{record.year}</td>
          <td>{formatter.format(record.investmentValue)}</td>
          <td>{formatter.format(record.interestThisYear)}</td>
          <td>{formatter.format(record.totalInterest)}</td>
          <td>{formatter.format(record.investmentCapital)}</td>
        </tr>
      ))}
    </tbody>
  );
}
export default App;
