import { useState } from 'react';
import ListedItems from './ListedItems';
function PackingList({ items, deleteItems, toggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;
  switch (sortBy) {
    case 'quantity':
      sortedItems = [...items].sort((a, b) => b.quantity - a.quantity);
      break;
    case 'description':
      sortedItems = [...items].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    case 'packed':
      sortedItems = [...items].sort(
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      break;
    default:
      sortedItems = [...items];
  }
  return (
    <section className="packing-list">
      <ListedItems
        items={sortedItems}
        deleteItems={deleteItems}
        toggleItem={toggleItem}
      />
      <div className="manage-list">
        <select
          name="sort-list"
          id=""
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
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
export default PackingList;
