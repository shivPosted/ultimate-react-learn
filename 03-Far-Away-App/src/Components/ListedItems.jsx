import Item from './Item';
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
export default ListedItems;
