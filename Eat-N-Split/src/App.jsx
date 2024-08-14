import { useState } from 'react';
import './style.css';
const initialFriends = [
  {
    id: 118853,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118853',
    balance: -7,
  },
  {
    id: 933320,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933320',
    balance: 20,
  },
  {
    id: 499467,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499468',
    balance: 0,
  },
];
function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [currentId, setCurrentId] = useState(null);

  function handleClick(id) {
    setCurrentId(cur => (cur === id ? null : id));
  }

  function handlSplitBill(newBal, id) {
    setFriendList(arr =>
      arr.map(friend => {
        if (currentId === friend.id)
          return { ...friend, balance: friend.balance + newBal };
        else return friend;
      })
    );
    handleClick(id);
  }

  function addFriend(name, imgUrl = null) {
    const id = Date.now();
    return {
      id: id,
      image: `${imgUrl ? imgUrl : `https://i.pravatar.cc/48?u=${id}`}`,
      name: name,
      balance: 0,
    };
  }

  function handleFriendAdd(name, imgUrl) {
    const newObj = addFriend(name, imgUrl);

    setFriendList(curArr => [...curArr, newObj]);
  }
  return (
    <div className="container">
      <FriendList
        handleClick={handleClick}
        friendList={friendList}
        currentId={currentId}
      />
      <SplitBill
        currentId={currentId}
        friendList={friendList}
        handlSplitBill={handlSplitBill}
      />
      <AddFriend onAddFriend={handleFriendAdd} />
    </div>
  );
}

function FriendList({ handleClick, friendList, currentId }) {
  return (
    <ul className="friend-list">
      {friendList.map(friend => (
        <Friend
          key={friend.id}
          friendObj={friend}
          handleClick={handleClick}
          currentId={currentId}
        />
      ))}
    </ul>
  );
}

function Friend({
  friendObj: { name, image, balance, id },
  handleClick,
  currentId,
}) {
  return (
    <li className="friend-row">
      <figure>
        <img src={image} alt={`${name}'s image`} />
      </figure>
      <h3>{name}</h3>
      <p
        className="summary"
        style={{
          color: balance === 0 ? '' : balance > 0 ? 'lightgreen' : 'red',
        }}
      >
        {balance === 0
          ? `Both of You  and ${name} are Even`
          : balance > 0
          ? `You owe ${name} $${balance}`
          : `${name} owes you $${0 - balance}`}
      </p>
      <button
        onClick={() => {
          handleClick(id);
        }}
      >
        {currentId === id ? 'Close' : 'Select'}
      </button>
    </li>
  );
}

function SplitBill({ friendList, handlSplitBill, currentId }) {
  const [billValue, setBillValue] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const [target, setTarget] = useState(0);

  if (!currentId) return null;

  const FriendExpense = billValue - yourExpense;
  const frinedName = friendList.find(friend => friend.id === currentId).name;
  const totaledBalance =
    target === 0 ? billValue - yourExpense : 0 - (billValue - FriendExpense);
  function handleChange(val) {
    setTarget(val);
  }
  return (
    <div className="split-bill">
      <h2>Split A bill with {frinedName}</h2>
      <form
        action=""
        className="grid"
        onSubmit={e => {
          e.preventDefault();
          if (billValue == 0 || yourExpense === 0) return null;
          setBillValue('');
          setYourExpense('');
          handlSplitBill(totaledBalance, currentId);
        }}
      >
        <label htmlFor="bill-value">💸 Bill value</label>
        <input
          type="number"
          id="bill-value"
          value={billValue}
          onChange={e => {
            setBillValue(cur => (cur === 0 ? '' : +e.target.value));
          }}
        />
        <label htmlFor="your-expense">🧍‍♀️Your Expense</label>
        <input
          type="number"
          id="your-expense"
          value={yourExpense}
          onChange={e =>
            setYourExpense(cur => (cur === 0 ? '' : +e.target.value))
          }
        />
        <label htmlFor="friend-expense">👫{frinedName}&apos;s Expense</label>
        <input
          type="number"
          readOnly
          id="friend-expense"
          value={FriendExpense}
        />
        <label htmlFor="payee">🤑 Who is paying</label>
        <select
          id="payee"
          value={target}
          onChange={e => {
            handleChange(+e.target.value);
          }}
        >
          <option value="0">You</option>
          <option value="1">Friend</option>
        </select>
        <button className="form-btn">Split bill</button>
      </form>
    </div>
  );
}

function AddFriend({ onAddFriend }) {
  const [newFriend, setNewFriend] = useState('');
  const [openWindow, setOpenWindow] = useState(false);
  if (!openWindow)
    return (
      <button
        className="add-friend-btn"
        onClick={() => setOpenWindow(cur => !cur)}
      >
        Add Friend
      </button>
    );

  const newID = Date.now();
  let imgUrl = `https://i.pravatar.cc/48?u=${newID}`;
  return (
    <form
      className="add-friend-container grid"
      onSubmit={() => {
        onAddFriend(newFriend, imgUrl, newID);
        setOpenWindow(cur => !cur);
        setNewFriend('');
      }}
    >
      <label htmlFor="friend-name">🫂 Add Friend</label>
      <input
        id="friend-name"
        type="text"
        placeholder="friend name..."
        value={newFriend}
        onChange={e => setNewFriend(e.target.value)}
      />
      <label htmlFor="friend-name">📷 Image URL</label>
      <input
        id="friend-name"
        type="text"
        placeholder="img url..."
        defaultValue={imgUrl}
      />
      <button className="close-btn">Add</button>
    </form>
  );
}

export default App;
