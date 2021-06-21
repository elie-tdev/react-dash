const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const parseFloat = (str, val = 2) => {
  str = str && str.toString();
  str = str && str.indexOf('.') > -1 ? str.slice(0, str.indexOf('.') + val + 1) : str;
  return Number(str);
};

export const formatDollar = number => formatter.format(parseFloat(number, 2));
