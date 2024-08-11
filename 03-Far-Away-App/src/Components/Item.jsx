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
export default Item;
