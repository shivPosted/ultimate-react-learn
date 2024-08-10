import { useState } from 'react';
const numArray = [];
for (let i = 0; i <= 19; i++) {
  numArray.push(i + 1);
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

export default Form;
