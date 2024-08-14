export default function DiceImage({ imgNo }) {
  return <img className={`dice-image`} src={`./dice-${imgNo}.png`}></img>;
}
