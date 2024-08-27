import { useState } from 'react';
import Button from './Button';
import { dateFormatter, setBody, numFormatter, curDateTime } from './Util';

export default function Main({
  currAcc,
  modifyAccountMovements,
  allAccounts,
  modifyAccounts,
  handleLogOut,
}) {
  console.log(allAccounts);
  setBody('a-login');
  console.log(currAcc);
  return (
    <main className="main-landing-page">
      <Nav curName={currAcc.owner?.split(' ')[0]}>
        <Button className="logout btn" handleClick={handleLogOut}>
          Logout
        </Button>
      </Nav>
      <MainTransaction currAcc={currAcc}>
        <TransactionMovements currAcc={currAcc} />
        <TransferMoney
          handleAccount={modifyAccountMovements}
          allAccounts={allAccounts}
          modifyAccounts={modifyAccounts}
          currAcc={currAcc}
        />
        <RequestLoan
          handleAccount={modifyAccountMovements}
          modifyAccounts={modifyAccounts}
          currAcc={currAcc}
          allAccounts={allAccounts}
        />
        <CloseAccount
          currAcc={currAcc}
          handleAccount={modifyAccountMovements}
          modifyAccounts={modifyAccounts}
          allAccounts={allAccounts}
        />
      </MainTransaction>
    </main>
  );
}

function Nav({ curName, children }) {
  return (
    <nav className="welcome-message">
      <h2 className="main-section-welcome">Welcome back, {curName}</h2>
      <img src="./logo.png" alt="logo-bank" />
      {children}
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
      <div className="current-balance-display">
        {numFormatter(
          +currAcc.movements.reduce((accum, val) => accum + val, 0),
          currAcc.currency,
          currAcc.locale
        )}
      </div>
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
            movement={movement}
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
  // const money = movement >= 0 movement :
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
  handleAccount,
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
    if (
      indexTransfered === -1 ||
      Number(amount) >
        Number(currAcc.movements.reduce((accum, val) => accum + val, 0))
    )
      return null;
    console.log(indexTransfered);

    const newAccounts = [...allAccounts];
    newAccounts[indexTransfered]?.movements.push(+amount);
    newAccounts[indexTransfering]?.movements.push(0 - Number(amount));
    newAccounts[indexTransfered]?.movementsDates.push(new Date().toISOString());
    newAccounts[indexTransfering]?.movementsDates.push(
      new Date().toISOString()
    );

    handleAccount(newAccounts[indexTransfering]);

    modifyAccounts(newAccounts);
    console.log(newAccounts);
  }
  return (
    <div className="transfer_money">
      <h3>Transfer Money</h3>
      <TransactionForm
        // className="money-function-form"
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
        <Button className="transfer-btn function-btn">&rArr;</Button>
      </TransactionForm>
    </div>
  );
}

function RequestLoan({ currAcc, handleAccount, modifyAccounts, allAccounts }) {
  const [requestedLoan, setRequestedLoan] = useState(0);
  function handleLoan(amount) {
    const requestedAmount = Number(amount);
    //eligible for loan only if the total balance is at least 10% of requested amount

    const currBalance = Number(
      currAcc.movements.reduce((accum, val) => accum + val, 0)
    );

    const checkingAmount = requestedAmount * 0.1;

    if (!(currBalance >= checkingAmount)) return null;

    const movements = [...currAcc.movements, requestedAmount];
    const movementsDates = [
      ...currAcc.movementsDates,
      new Date().toISOString(),
    ];
    handleAccount(cur => {
      return {
        ...cur,
        movements,
        movementsDates,
      };
    });

    const newAccounts = [...allAccounts];
    const curAccIndex = newAccounts.findIndex(
      account => account.owner === currAcc.owner
    );

    newAccounts[curAccIndex].movements = movements;
    newAccounts[curAccIndex].movementsDates = movementsDates;

    modifyAccounts(newAccounts);
  }
  return (
    <div className="request_loan">
      <h3>Request Loan</h3>
      <TransactionForm
        // className="money-function-form"
        handleForm={() => handleLoan(requestedLoan)}
      >
        <input
          type="number"
          className="loan-amount"
          value={requestedLoan}
          onChange={e => setRequestedLoan(e.target.value)}
        />
        <Button className="request-loan-btn function-btn">&rArr;</Button>
      </TransactionForm>
    </div>
  );
}

function CloseAccount({ currAcc, handleAccount, modifyAccounts }) {
  const [user, setUser] = useState('');
  const [deletePin, setDeletePin] = useState('');

  function onCloseAccount() {
    const enteredPin = Number(deletePin);
    console.log(currAcc.userName);
    if (currAcc.pin === enteredPin && currAcc.userName === user) {
      handleAccount('');
      console.log(currAcc, user, deletePin);
      modifyAccounts(cur => cur.filter(account => account.userName !== user));
    }
  }
  return (
    <div className="close_account">
      <h3>Delete Account</h3>
      <TransactionForm handleForm={onCloseAccount}>
        <input
          type="text"
          className="confirm-user"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <input
          type="number"
          className="confirm-pin"
          value={deletePin}
          onChange={e => setDeletePin(e.target.value)}
        />
        <Button className="close-account-btn function-btn">&rArr;</Button>
      </TransactionForm>
    </div>
  );
}

function TransactionForm({ children, handleForm }) {
  return (
    <form
      action="#"
      className="money-function-form"
      onSubmit={e => {
        e.preventDefault();
        handleForm();
      }}
    >
      {children}
    </form>
  );
}
