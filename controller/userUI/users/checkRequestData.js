module.exports = ({ name, password }) => {
  //checking for undefined,0, nan,null,undefined,empty string,false and length min/max
  if (!name || !password) return false;
  const dataArray = [name, password];
  return dataArray.every((e) => e.length >= 4 && e.length <= 30);
};
