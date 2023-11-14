const Router = require("express-promise-router");
const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
    res.send("HI bro");
});
