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
export default Stats;
