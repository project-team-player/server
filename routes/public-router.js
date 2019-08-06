const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Ciao Alla Pecorina');
})

module.exports = router;