module.exports = ({ res, error }) => {
  //any logger can be connected here
  console.log(error);
  if (res) return res.status(500).json({ error });
};
