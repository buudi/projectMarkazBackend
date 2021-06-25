const crypto = require("crypto");

const sha256 = (txt) => {
  const secret = process.env.SHA_SECRET;
  const hash = crypto.createHmac("sha256", secret).update(txt).digest("hex");
  return hash;
};

module.exports = sha256;
