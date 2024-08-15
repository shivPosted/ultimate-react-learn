import { useState } from 'react';
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
  const [table, setTable] = useState('');

  function handleTable(duration, initialValue, anualValue, interestRate) {
    const newTable = [];
    let totalInterest = 0;

    for (let i = 0; i < duration; i++) {
      const investmentCapital = initialValue + (anualValue * i + anualValue);
      totalInterest += (interestRate / 100) * investmentCapital;
      newTable.push({
        investedCapital: investmentCapital,
        interestThisYear: (interestRate / 100) * investmentCapital,
        totalInterest: totalInterest,
        year: i + 1,
        investmentValue: investmentCapital + totalInterest,
      });
    }
    setTable([...newTable]);
  }
  return (
    <div className="app">
      <Input render={handleTable} />
      {table && <InvestmentTable table={table} />}
    </div>
  );
}

function Input({ render }) {
  const [init, setInit] = useState('');
  const [anual, setAnual] = useState('');
  const [interest, setInterest] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <form
      className="user-input"
      onSubmit={e => {
        e.preventDefault();
        render(duration, init, anual, interest);
      }}
    >
      <label htmlFor="init-invest">Initial Investment</label>
      <input
        type="number"
        id="init-invest"
        value={init}
        onChange={e => setInit(+e.target.value)}
      />

      <label htmlFor="anual-invest">Anual Investment</label>
      <input
        type="number"
        id="anual-invest"
        value={anual}
        onChange={e => setAnual(+e.target.value)}
      />

      <label htmlFor="interest">Interest Rate</label>
      <input
        type="number"
        id="interest"
        value={interest}
        onChange={e => setInterest(+e.target.value)}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="number"
        id="duration"
        value={duration}
        onChange={e => setDuration(+e.target.value)}
      />
      <button>Get it</button>
    </form>
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
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return (
    <tbody>
      {table.map((record, i) => (
        <tr key={i}>
          <td>{record.year}</td>
          <td>{formatter.format(record.investmentValue)}</td>
          <td>{formatter.format(record.interestThisYear)}</td>
          <td>{formatter.format(record.totalInterest)}</td>
          <td>{formatter.format(record.investedCapital)}</td>
        </tr>
      ))}
    </tbody>
  );
}
export default App;
