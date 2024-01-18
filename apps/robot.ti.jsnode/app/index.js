
const init = async () => {
    await require('./service/psid.service').initPsid();
    await require('./service/count.service').initCount();
    await require('./rest')

    setInterval(async function () {
        if (await require('./service/count.service').getCountStatus() === 0) {
            if (await require('./service/psid.service').getPsid()) {
                await require('./service/common.service').runCommon(await require('./service/psid.service').getPsid());
            }
        }
    }, 1000);
}

init().then(r => {console.log("init start")})








