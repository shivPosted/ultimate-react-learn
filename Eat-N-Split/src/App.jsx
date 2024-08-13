import { useState } from 'react';
import './style.css';
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];
function App() {
  return (
    <div className="container">
      <FriendList />
      <SplitBill />
    </div>
  );
}

function FriendList() {
  return (
    <ul className="friend-list">
      {initialFriends.map(friend => (
        <Friend key={friend.id} friendObj={friend} />
      ))}
    </ul>
  );
}
function Friend({ friendObj: { name, image, balance, id } }) {
  return (
    <li className="friend-row">
      <figure>
        <img src={image} alt={`${name}'s image`} />
      </figure>
      <h3>{name}</h3>
      <p className="summary">
        {balance === 0
          ? 'Both of You are Even'
          : balance > 0
          ? `You owe ${name} $${balance}`
          : `${name} owes you $${0 - balance}`}
      </p>
      <button>Select</button>
    </li>
  );
}
function SplitBill() {
  return (
    <div className="split-bill">
      <h2>Split A bill with X</h2>
      <form action="">
        <label htmlFor="bill-value">💸 Bill value</label>
        <input type="number" id="bill-value" />
        <label htmlFor="your-expense">🧍‍♀️Your Expense</label>
        <input type="number" id="your-expense" />
        <label htmlFor="friend-expense">👫X&apos; Expense</label>
        <input type="number" readOnly id="friend-expense" />
        <label htmlFor="payee">🤑 Who is paying</label>
        <select id="payee" value={0}>
          <option value="0">You</option>
          <option value="1">Friend</option>
        </select>
        <button className="form-btn">Split bill</button>
      </form>
    </div>
  );
}

export default App;
