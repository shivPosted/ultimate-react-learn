import { useState } from 'react';
import Button from './Button';
import { dateFormatter, setBody, numFormatter, curDateTime } from './Util';

export default function Main({
  currAcc,
  modifyAccountMovements,
  allAccounts,
  modifyAccounts,
}) {
  console.log(allAccounts);
  setBody('a-login');
  console.log(currAcc);
  return (
    <main className="main-landing-page">
      <Nav curName={currAcc.owner?.split(' ')[0]} />
      <MainTransaction currAcc={currAcc}>
        <TransactionMovements currAcc={currAcc} />
        <TransferMoney
          handleAccount={modifyAccountMovements}
          allAccounts={allAccounts}
          modifyAccounts={modifyAccounts}
          currAcc={currAcc}
        />
      </MainTransaction>
    </main>
  );
}

function Nav({ curName }) {
  return (
    <nav className="welcome-message">
      <h2 className="main-section-welcome">Welcome back, {curName}</h2>
      <img src="./logo.png" alt="logo-bank" />
      <Button className="logout btn">Logout</Button>
    </nav>
  );
}

function MainTransaction({ children, currAcc }) {
  return (
    <section className="main-transaction">
      <div className="current-balance-update">
        <h2>Current Balance</h2>
        <p>
          As of{' '}
          <span className="current-date-label">
            {curDateTime(currAcc.locale)}
          </span>
        </p>
      </div>
      <div className="current-balance-display"></div>
      {children}
    </section>
  );
}

function TransactionMovements({ currAcc }) {
  return (
    <ul className="transaction-history">
      {currAcc.movements
        .map((movement, i) => (
          <TransactionMovementsRow
            key={currAcc.movementsDates[i]}
            type={movement > 0 ? 'deposit' : 'withdrawl'}
            movementNum={i + 1}
            movement={Math.abs(movement)}
            movementDate={currAcc.movementsDates[i]}
            currAcc={currAcc}
          />
        ))
        .reverse()}
    </ul>
  );
}

function TransactionMovementsRow({
  currAcc,
  type,
  movementNum,
  movementDate,
  movement,
}) {
  return (
    <li className="transaction-row">
      <div className={`type_${type}`}>
        {type === 'deposit'
          ? `${movementNum} deposited`
          : `${movementNum} withdrawl`}
      </div>
      <div className="date_transaction">
        {dateFormatter(new Date(movementDate))}
      </div>
      <div className="transaction_amount">
        {numFormatter(movement, currAcc.currency, currAcc.locale)}
      </div>
    </li>
  );
}

function TransferMoney({
  modifyAccountMovements,
  allAccounts,
  currAcc,
  modifyAccounts,
}) {
  console.log(allAccounts);
  const [transferUser, setTransferUser] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  function handleMoneyTransfer(user, amount) {
    console.log(user, amount);
    const indexTransfered = allAccounts.findIndex(
      account => account.userName === user
    );

    const indexTransfering = allAccounts.findIndex(
      account => currAcc.userName === account.userName
    );
    if (indexTransfered === -1) return null;
    console.log(indexTransfered);

    const newAccounts = [...allAccounts];
    newAccounts[indexTransfered]?.movements.push(+amount);
    newAccounts[indexTransfering]?.movments.push(0 - Number(amount));
    newAccounts[indexTransfered]?.movementsDates.push(new Date().toISOString());
    newAccounts[indexTransfering]?.movementsDates.push(
      new Date().toISOString()
    );

    modifyAccountMovements(cur => {});
    modifyAccounts(newAccounts);
    console.log(newAccounts);
  }
  return (
    <div className="transfer_money">
      <h3>Transfer Money</h3>
      <TransactionForm
        className="money-function-form"
        handleForm={() => handleMoneyTransfer(transferUser, transferAmount)}
      >
        <input
          type="text"
          className="transfer-to"
          value={transferUser}
          onChange={e => setTransferUser(e.target.value)}
        />
        <input
          type="number"
          className="transfer-amount"
          value={transferAmount}
          onChange={e => setTransferAmount(e.target.value)}
        />
        <button className="transfer-btn function-btn">&rArr;</button>
      </TransactionForm>
    </div>
  );
}

function TransactionForm({ className, children, handleForm }) {
  return (
    <form
      action="#"
      className={className}
      onSubmit={e => {
        e.preventDefault();
        handleForm();
      }}
    >
      {children}
    </form>
  );
}
