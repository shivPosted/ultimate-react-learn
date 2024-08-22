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
  const [openAddForm, setOpenAddForm] = useState(false);

  function handleClick(id) {
    setCurrentId(cur => (cur === id ? null : id));
    setOpenAddForm(false);
  }

  function handleAddFriend() {
    setOpenAddForm(cur => !cur);
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
    setOpenAddForm(false);
  }
  return (
    <div className="container">
      <FriendList
        handleClick={handleClick}
        friendList={friendList}
        currentId={currentId}
      />
      <Button className="add-friend-btn" onClick={handleAddFriend}>
        {openAddForm ? 'Close' : 'Add Friend'}
      </Button>
      {currentId && (
        <SplitBill
          key={currentId}
          openAddForm={openAddForm}
          friendList={friendList}
          handlSplitBill={handlSplitBill}
          currentId={currentId}
        />
      )}
      {openAddForm && <AddFriend onAddFriend={handleFriendAdd} />}
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
    <li className={`friend-row ${id === currentId && 'selected'}`}>
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
          ? `You  and ${name} are Even`
          : balance > 0
          ? `You owe ${name} $${balance}`
          : `${name} owes you $${0 - balance}`}
      </p>
      <Button
        onClick={() => {
          handleClick(id);
        }}
      >
        {currentId === id ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function SplitBill({ friendList, handlSplitBill, currentId }) {
  const [billValue, setBillValue] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const [target, setTarget] = useState(0);

  const FriendExpense = billValue ? billValue - yourExpense : '';
  const friendName = friendList?.find(friend => friend.id === currentId).name;
  const totaledBalance = target === 0 ? FriendExpense : 0 - yourExpense;

  function handleChange(val) {
    setTarget(val);
  }

  return (
    <div className="split-bill">
      <h2>Split A bill with {friendName}</h2>
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
          maxLength={billValue}
          value={yourExpense}
          onChange={e => {
            if (Number(e.target.value) > billValue) return null;
            setYourExpense(cur => (cur === 0 ? '' : +e.target.value));
          }}
        />
        <label htmlFor="friend-expense">👫{friendName}&apos;s Expense</label>
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
        <Button className="form-btn">Split Bill</Button>
      </form>
    </div>
  );
}

function AddFriend({ onAddFriend }) {
  const [newFriend, setNewFriend] = useState('');
  const newID = crypto.randomUUID();
  let imgUrl = `https://i.pravatar.cc/48?u=${newID}`;
  return (
    <form
      className="add-friend-container grid"
      onSubmit={e => {
        e.preventDefault();
        onAddFriend(newFriend, imgUrl, newID);
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
      <Button>Add Friend</Button>
    </form>
  );
}

function Button({ onClick, children, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
