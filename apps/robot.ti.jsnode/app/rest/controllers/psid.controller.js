const express = require('express');
const router = express.Router();

router.get('/:psid', async (req, res) => {
    const psid = req.params.psid;
    res.send({psid});
    console.log(psid)
    await require('../../service/db/psid.service').savePsid(psid).then()
});

module.exports = router;

