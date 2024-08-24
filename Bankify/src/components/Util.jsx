function addUserName(accounts) {
  accounts.forEach(account => {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .reduce((accum, val) => accum + val[0], '');
  });
}

function setBody(className = '') {
  document.body.classList.remove('b-login');
  document.body.classList.add(className);
}

const dateFormatter = function (date, locale = 'en-IN') {
  return new Intl.DateTimeFormat(locale).format(date);
};

const numFormatter = function (num, currency = '', locale) {
  return new Intl.NumberFormat(locale, {
    style: currency ? 'currency' : '',
    currency: currency,
  }).format(num);
};

const curDateTime = function (locale) {
  const date = new Date();
  console.log(locale);
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export { addUserName, setBody, dateFormatter, numFormatter, curDateTime };
