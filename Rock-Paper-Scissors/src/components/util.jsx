export default function calculateResult(yourChoice, computerChoice) {
  if (
    (yourChoice === 0 && computerChoice === 1) ||
    (yourChoice === 1 && computerChoice === 2) ||
    (yourChoice === 2 && computerChoice === 0)
  )
    return 0;
  else if (yourChoice === computerChoice) return 1;
  else return 2;
}
