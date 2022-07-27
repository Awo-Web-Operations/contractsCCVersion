module.exports = (age = 24 * 60 * 60 * 7) => ({
  httpOnly: true,
  signed: true,
  maxAge: age,
});
