
const indexInit = async () => {
    await require('./service/psid.service').initPsid();
    await require('./service/count.service').initCount();

    await require('./rest')

    console.log("===== indexInit =====")

    let i = 0;
    setInterval(async function () {
        const countStatus = await require('./service/count.service').getCountStatus();
        //console.log('countStatus: ' + countStatus)

        if (countStatus === 0) {
            //console.log('countStatus === 0, check: ' + countStatus)
            const psid = await require('./service/psid.service').getPsid()
            //console.log('psid: ' + psid)
            if (psid) {
                console.log('psid: ' + psid)
                await require('./service/count.service').runCount(psid);
            }
        }

        //console.log('Прошла секунда N: ' + i++);
    }, 1000);

}

indexInit()








