
exports.psid = async (psid) => {
    if (psid) {
        console.log("This is my PSID: " + psid)
        const lastSocialLots = await require('./instrument.service').profile(psid)
        console.log(lastSocialLots)
        //...
    }
}

