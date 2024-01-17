const express = require('express');
const router = express.Router();

router.get('/:psid', async (req, res) => {
    const psid = req.params.psid;
    res.send({psid});
    await require('../../service/psid.service').savePsid(psid).then()
});

module.exports = router;

