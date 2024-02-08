
const getActivityProfiles = async (profiles) => {
    const activityProfiles = []
    if (profiles) {
        for (let j = 0; j < 100; j++) {
            for (let i = 0; i < profiles.length; i++) {
                const object = profiles[i];
                if (j % 30 < object.activity) {
                    activityProfiles.push(object)
                }
            }
        }
    }

    return activityProfiles
}


exports.common = async () => {
    setInterval(async function () {

        const profiles = await require('../nsi/profiles.nsi').getProfiles();
        if (await require('./db/count.service').getCountStatus() === 0 && profiles) {
            await require('./db/count.service').saveCount(1)

            for (let profile of await getActivityProfiles(profiles)) {
                console.log("COMMON SERVICE: STARTING SOCIAL SERVICE...")
                console.log(await require('./social.service').getSocialInstruments([profile]))
            }

            await require('./db/count.service').saveCount(0)
        }

    }, 1000);
}
