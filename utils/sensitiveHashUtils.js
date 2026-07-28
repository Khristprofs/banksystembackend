const bcrypt = require("bcryptjs");

const hashSensitive = async (value) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(value, salt);
};

module.exports = { hashSensitive };