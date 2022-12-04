const validate = (row) => {
  if (row[1] > 33 && row[2] > 18) return true;
  return false;
};

module.exports = validate;
