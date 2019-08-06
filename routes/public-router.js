const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Ciao Mafiosa e Mafioso');
})

module.exports = router;