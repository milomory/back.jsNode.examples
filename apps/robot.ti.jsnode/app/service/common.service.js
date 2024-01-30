
const getActivityProfiles = async (profiles) => {
    const activityProfiles = []
    for (let j = 0; j < 100; j++) {
        for (let i = 0; i < profiles.length; i++) {
            const object = profiles[i];
            if (j % 30 < object.activity) {
                activityProfiles.push(object)
            }
        }
    }
    return activityProfiles
}



exports.common = async () => {
    setInterval(async function () {

        const profiles = await require('../nsi/profiles.nsi').getProfile();
        if (await require('./count.service').getCountStatus() === 0) {
            await require('./count.service').saveCount(1)

            for (let profile of await getActivityProfiles(profiles)) {
                const lastSocialLots = await require('./social.service').getSocialInstruments([profile])
                console.log(lastSocialLots)
                const robot = await require('./robot.service').run(lastSocialLots)
                console.log(robot)
            }

            await require('./count.service').saveCount(0)
        }

    }, 1000);
}
