import { useState } from 'react';
import './style.css';
const numArray = [];
for (let i = 0; i <= 19; i++) {
  numArray.push(i + 1);
}
const listItems = [
  { description: 'Item1', packed: true, quantity: 3, id: 1 },
  { description: 'Item2', packed: false, quantity: 5, id: 2 },
];
console.log(numArray);
function App() {
  const [items, setItems] = useState([]);

  function addItems(item) {
    setItems(items => [...items, item]);
  }

  function deleteItems(id) {
    setItems(items => [...items].filter(item => item.id !== id));
  }
  return (
    <>
      <Logo />
      <Form addItems={addItems} />
      <PackingList items={items} deleteItems={deleteItems} />
      <Stats />
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
function PackingList({ items, deleteItems }) {
  return (
    <section className="packing-list">
      <ListedItems items={items} deleteItems={deleteItems} />
      <div className="manage-list">
        <select name="sort-list" id="">
          <option value="packed">Sort by packed</option>
          <option value="packed">Sort by packed</option>
          <option value="packed">Sort by packed</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button className="clear-list-btn">Clear</button>
      </div>
    </section>
  );
}
function ListedItems({ items, deleteItems }) {
  return (
    <ul className="listed-items">
      {items.map(item => (
        <Item itemObj={item} key={item.id} deleteItems={deleteItems} />
      ))}
    </ul>
  );
}
function Item({ itemObj: { description, packed, quantity, id }, deleteItems }) {
  return (
    <li className={`listed-item `}>
      <input id={id} type="checkbox" />
      <label style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </label>
      <button className="close-btn" onClick={() => deleteItems(id)}>
        &times;
      </button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      💼 You have <span className="num-items">0</span> items in your list, and
      you already packed <span className="num-packed-items">0</span> items (
      <span className="percentage-packed">0%</span>)
    </footer>
  );
}
export default App;
