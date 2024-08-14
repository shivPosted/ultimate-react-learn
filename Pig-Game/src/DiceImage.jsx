export default function DiceImage({ imgNo }) {
  return (
    <img className={`dice-image`} src={`../public/dice-${imgNo}.png`}></img>
  );
}
