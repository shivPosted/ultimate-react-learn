export const formatter = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'INR',
});
export function buildTable(userInput, table) {
  let totalInterest = 0;
  for (let i = 0; i < userInput.duration; i++) {
    // const investmentCapital = initialValue + (anualValue * i + anualValue);
    // totalInterest += (interestRate / 100) * investmentCapital;
    // newTable.push({
    //   investedCapital: investmentCapital,
    //   interestThisYear: (interestRate / 100) * investmentCapital,
    //   totalInterest: totalInterest,
    //   year: i + 1,
    //   investmentValue: investmentCapital + totalInterest,
    // });
    const investmentCapital =
      userInput.initialValue + (userInput.anual * i + userInput.anual);
    const interestThisYear = (userInput.interestRate / 100) * investmentCapital;
    totalInterest += (userInput.interestRate / 100) * investmentCapital;

    table.push({
      investmentCapital: investmentCapital,
      year: i + 1,
      interestThisYear: interestThisYear,
      totalInterest: totalInterest,
      investmentValue: totalInterest + investmentCapital,
    });
  }
}
