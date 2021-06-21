export const prettyCurrency = (amount, currency = 'USD') => {
  if (amount == null) {
    return false;
  }
  if (amount < 0) {
    amount = 0;
  }
  return amount.toLocaleString('en', { style: 'currency', currency });
};

export const prettyDateTime = time => {
  if (time == null) {
    return false;
  }
  let d = new Date(time);
  return (
    d.toLocaleDateString('en', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    }) +
    ' at ' +
    d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }).replace(/^0(?:0:0?)?/, '')
  );
};

export const prettyDate = time => new Date(time).toLocaleDateString('en', {});

export const prettyTime = time =>
  new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const prettyHour = time =>
  new Date(time)
    .toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
    .replace(/^0(?:0:0?)?/, '');

export const prettyPhone = number =>
  number.substr(2).replace(/(\d{1,2})(\d{1})?(\d{1,3})?(\d{1,4})?/, function (_, p1, p2, p3, p4) {
    let output = '';
    if (p1) output = `${p1}`;
    if (p2) output += `${p2}-`;
    if (p3) output += `${p3}-`;
    if (p4) output += `${p4}`;
    return output;
  });

export const minimumDays = (date, numDays) => {
  const d = new Date(date);
  const totalNumDays = daysIntoYear(d) + numDays;
  return Boolean(daysIntoYear(d) >= totalNumDays || totalNumDays <= 365);
};

export const daysIntoYear = date => {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};

export const cleanAmountRegex = value => {
  return value.replace(/[^0-9]/g, '');
};

export const cleanAmount = value => {
  const pos = value.indexOf('.');
  let result;
  if (pos !== -1) {
    const part1 = value.substr(0, pos);
    const part2 = value.substr(pos + 1);
    result = cleanAmountRegex(part1) + '.' + cleanAmountRegex(part2);
  } else {
    result = cleanAmountRegex(value);
  }
  return result;
};
