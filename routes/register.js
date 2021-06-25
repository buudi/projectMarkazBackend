const db = require("../db/index");
const router = require("express-promise-router")();
const { v4: uuidv4 } = require("uuid");
const sha256 = require("./crypto");

module.exports = router;

router.post("/", async (req, res) => {
  const { body } = req;
  const salt = uuidv4();
  const saltedPass = sha256(body.password + salt);
  try {
    await db.query(
      "INSERT INTO users (name, email, role, password, salt) VALUES ($1, $2, $3, $4, $5)",
      [body.name, body.email, body.role, saltedPass, salt]
    );
    await db.query("INSERT INTO sessions (email) VALUES ($1)", [body.email]);
    res.send("query made successfully");
  } catch (err) {
    if (err.code === "23505") {
      console.log("Duplicate Email");
    }
    console.log("error in register.js");
    res.send(`error: ${err}`);
  }
});
