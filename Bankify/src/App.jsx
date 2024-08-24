import { useState } from 'react';
import './style.css';
import { addUserName, dateFormatter, setBody } from './components/Util';
import Login from './components/Login';
import Main from './components/Main';

const account1 = {
  owner: 'Shiv Pratap Singh',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-07-25T17:01:17.194Z',
    '2023-07-30T23:36:17.929Z',
    '2023-08-02T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN', // de-DE
};

const account2 = {
  owner: 'Matsumoto Rangiku',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

addUserName(accounts);
setBody('b-login');

console.log(dateFormatter(new Date(account1.movementsDates[1])));

// console.log(accounts);

function App() {
  const [account, setAccount] = useState('');
  const [allAccounts, setAllAccounts] = useState(accounts);

  function handleLogin(inputUser, inputPin) {
    console.log(inputUser, inputPin);
    // if (typeof inputPin !== 'number') return null;
    const [currAccount] = accounts.filter(
      account => account.userName === inputUser && account.pin === +inputPin
    );
    console.log(currAccount);
    if (!currAccount) return null;
    setAccount(currAccount);
  }
  function handleLogOut() {
    setAccount('');
  }
  return (
    <>
      {!account && <Login handleLogin={handleLogin} />}
      {account && (
        <Main
          currAcc={account}
          allAccounts={allAccounts}
          modifyAccountMovements={setAccount}
          modifyAccounts={setAllAccounts}
          handleLogOut={handleLogOut}
        />
      )}
    </>
  );
}

export default App;
