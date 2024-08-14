export default function Button({ className, children, handleClick }) {
  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {children}
    </button>
  );
}
