import { useState } from 'react';
import './style.css';
const numArray = [];
for (let i = 0; i <= 19; i++) {
  numArray.push(i + 1);
}
function App() {
  const [items, setItems] = useState([]);
  function addItems(item) {
    setItems(items => [...items, item]);
  }

  function deleteItems(id) {
    setItems(items => items.filter(item => item.id !== id));
  }
  function toggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  function sortList(type) {
    console.log('inside sorting function');
    if (type === 'input')
      setItems(items => [...items].sort((a, b) => a.id - b.id));
    else if (type === 'description')
      setItems(items =>
        [...items].sort((a, b) => a.description.localeCompare(b.description))
      );
    else if (type === 'packed') {
      setItems(items =>
        [...items].sort((a, b) => Number(a.packed) - Number(b.packed))
      );
    } else {
      setItems(items => [...items].sort((a, b) => b.quantity - a.quantity));
    }
  }
  return (
    <>
      <Logo />
      <Form addItems={addItems} />
      <PackingList
        items={items}
        deleteItems={deleteItems}
        toggleItem={toggleItem}
        onClearList={handleClearList}
        sortList={sortList}
      />
      <Stats items={items} />
    </>
  );
}

function Logo() {
  return (
    <header>
      <h1>🏝️ Far Away 💼</h1>
    </header>
  );
}

function Form({ addItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();

    const item = { quantity, description, packed: false, id: Date.now() };
    if (item.description === '') return;
    console.log(item);
    addItems(item);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>What do you need for your trip?</h2>
      <div className="selection-div">
        <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
          {numArray.map(num => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          className="input-item"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="add-btn">ADD</button>
      </div>
    </form>
  );
}
function PackingList({
  items,
  deleteItems,
  toggleItem,
  onClearList,
  sortList,
}) {
  return (
    <section className="packing-list">
      <ListedItems
        items={items}
        deleteItems={deleteItems}
        toggleItem={toggleItem}
      />
      <div className="manage-list">
        <select
          name="sort-list"
          id=""
          onChange={e => {
            console.log(e.target.value);
            sortList(e.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
          <option value="quantity">Sort by qunatity</option>
        </select>
        <button className="clear-list-btn" onClick={onClearList}>
          Clear
        </button>
      </div>
    </section>
  );
}
function ListedItems({ items, deleteItems, toggleItem }) {
  return (
    <ul className="listed-items">
      {items.map(item => (
        <Item
          itemObj={item}
          key={item.id}
          deleteItems={deleteItems}
          toggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}
function Item({
  itemObj: { description, packed, quantity, id },
  deleteItems,
  toggleItem,
}) {
  return (
    <li className={`listed-item `}>
      <input
        id={id}
        type="checkbox"
        checked={packed}
        onChange={() => {
          toggleItem(id);
        }}
      />
      <label
        htmlFor={id}
        style={packed ? { textDecoration: 'line-through' } : {}}
      >
        {quantity} {description}
      </label>
      <button className="close-btn" onClick={() => deleteItems(id)}>
        &times;
      </button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">Start adding items to your list 🥰</footer>
    );
  const count = items.length;
  const itemsPacked = items.filter(item => item.packed).length;
  const percentagePacked =
    count === 0 || itemsPacked === 0
      ? 0
      : Math.trunc((itemsPacked / count) * 100);
  return (
    <footer className="stats">
      {percentagePacked === 100 ? (
        "You got everything, let's go 🚗"
      ) : (
        <>
          💼 You have <span className="num-items">{count}</span> items in your
          list, and you already packed{' '}
          <span className="num-packed-items">{itemsPacked}</span> items (
          <span className="percentage-packed">{percentagePacked}%</span>)
        </>
      )}
    </footer>
  );
}
export default App;
