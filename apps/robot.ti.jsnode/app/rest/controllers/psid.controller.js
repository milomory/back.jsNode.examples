const express = require('express');
const router = express.Router();

router.get('/:psid', async (req, res) => {
    const psid = req.params.psid;
    res.send({psid});
    await require('../../service/psid.service').psidSave(psid).then()
});

module.exports = router;

