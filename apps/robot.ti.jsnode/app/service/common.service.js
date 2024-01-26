
exports.common = async () => {
    setInterval(async function () {
        if ((await require('./psid.service').getPsid()) && (await require('./count.service').getCountStatus() === 0)) {

            await require('./count.service').saveCount(1)

            // ===============================
            // Начинаем работать с Social-Api
            // ===============================
            const lastSocialLots = await require('./social.service').getSocialInstruments(await require('./psid.service').getPsid())
            console.log(lastSocialLots)

            // ===============================
            // Начинаем работать с ИНВЕСТ-АПИ
            // ===============================
            const robot = await require('./robot.service').run(lastSocialLots)
            console.log(robot)

            await require('./count.service').saveCount(0)

        }
    }, 1000);
}
