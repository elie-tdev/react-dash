const maskAccountNumber = accNumber => {
  return accNumber && <>&bull;&bull;&bull;&bull; {accNumber.slice(accNumber.length - 4)}</>;
};

export default maskAccountNumber;
