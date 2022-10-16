const minLength = (value, length) => {
  return value.match(/\d/gm).length + 3 === length;
};

export default minLength;
