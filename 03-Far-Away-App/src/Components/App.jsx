import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';
import './style.css';

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
    const confirmed = window.confirm(
      'Are you sure you want to clear the entire list?'
    );
    if (confirmed) setItems([]);
  }

  // function sortList(type) {
  //   console.log('inside sorting function');
  //   if (type === 'input')
  //     setItems(items => [...items].sort((a, b) => a.id - b.id));
  //   else if (type === 'description')
  //     setItems(items =>
  //       [...items].sort((a, b) => a.description.localeCompare(b.description))
  //     );
  //   else if (type === 'packed') {
  //     setItems(items =>
  //       [...items].sort((a, b) => Number(a.packed) - Number(b.packed))
  //     );
  //   } else {
  //     setItems(items => [...items].sort((a, b) => b.quantity - a.quantity));
  //   }
  // }
  return (
    <>
      <Logo />
      <Form addItems={addItems} />
      <PackingList
        items={items}
        deleteItems={deleteItems}
        toggleItem={toggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </>
  );
}

export default App;
