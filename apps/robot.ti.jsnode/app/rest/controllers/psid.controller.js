const express = require('express');
const router = express.Router();

router.get('/:psid', (req, res) => {
    const psid = req.params.psid;
    res.send({psid});
    require('../../service/psid.service').psid(psid).then()
});

module.exports = router;

