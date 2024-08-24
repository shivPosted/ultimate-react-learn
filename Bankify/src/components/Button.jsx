export default function Button({
  handleClick = () => {},
  children,
  className,
}) {
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
