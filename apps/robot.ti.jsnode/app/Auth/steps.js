
exports.getCId = async () => {
    const method = 'get';
    const url = 'https://www.tinkoff.ru/api/common/v1/session/authorize/';
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'accept-language': 'en',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    return await require('../service').authRequest(method, url, headers, null); //getCId
}

exports.postCode = async (TINKOFF_SECRET_KEY, res) => {

    let __P__wuid = ''
    let sso_uaid = ''
    for (const cookie of res.headers['set-cookie']) {
        const name = cookie.split(';')[0].split('=')[0];
        if (name === '__P__wuid') {
            __P__wuid = cookie.split(';')[0].split('=')[1]
        }
        if (name === 'sso_uaid') {
            sso_uaid = cookie.split(';')[0].split('=')[1]
        }
    }

    const method = 'post';
    const url = 'https://id.tinkoff.ru/auth/step?cid='+res.data.cid;
    const headers = {
        //'accept': 'application/json',
        //'accept': 'application/form-variables+json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept-language': 'en',
        'authority': 'id.tinkoff.ru',
        'cookie': 'SSO_CONVERSATION_CSRF_uc0YX=s3l7PYJfr-9b7e4wsQrPxXmbhj0.1703089182; pwaPinKeyboardShown=false; vIdUid=4cc7930b-1d80-44d4-a479-0935f1f0b412; stSeStTi=1703089099509; __P__wuid=' + __P__wuid + '; dco.id=f3f57e01-95a3-4a7c-84de-00007f32da16; userType=Visitor; dsp_click_id=no%20dsp_click_id; pageLanding=https%3A%2F%2Fwww.tinkoff.ru%2F; __P__wuid_visit_id=v1%3A0000001%3A1703089100232%3A1a881f1589d7e069b23b114eeddf790d; __P__wuid_visit_persistence=1703089100232; __P__wuid_last_update_time=1703089100230; sso_uaid=' + sso_uaid + '; stDeIdU=14219712-f531-463e-899b-5daddfe256b8; tmr_lvid=cab82b6850075ddb388d4a61393b91ac; tmr_lvidTS=1703029166012; _ym_uid=1703029167664547367; _ym_d=1703089101; _ym_isad=2; tmr_reqNum=38; stLaEvTi=1703089279956',
        'dnt': '1',
        'origin': 'https://id.tinkoff.ru',
        'referer': 'https://id.tinkoff.ru/',
        'sec-chUa': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const data = {
        pin: TINKOFF_SECRET_KEY,
        step: 'pin'
    };
    return await require('../service').authRequest(method, url, headers, data);
}

const postCode = (cid) => {
    const method = 'get';//&&&&?????
    const url = 'https://id.tinkoff.ru/auth/step?cid='+cid;
    const headers = {
        'authority': 'id.tinkoff.ru',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const data = new URLSearchParams({
        pin: '3728', // Замените на актуальный PIN-код
        step: 'pin'
    });
    (async () => {
        const response = await require('../service').request(method, url, headers, data);
        //console.log(response)
        //console.log(response.headers['set-cookie']);
        //get2(cid)
    })()
}

const get2 = (cid) => {
    const method = 'get';
    const url = 'https://id.tinkoff.ru/auth/step?cid='+cid;
    const headers = {};
    const data = {
        step: 'complete'
    };
    (async () => {
        const response = await require('../service').request(method, url, headers, data);
        //console.log(response)
        console.log(response.headers['set-cookie']);
        get3(cid)
    })()
}

const get3 = (cid) => {
    const method = 'get';
    const url = 'https://id.tinkoff.ru/auth/step?cid='+cid;
    const headers = {};
    const data = {
        step: 'complete'
    };
    (async () => {
        const response = await require('../service').request(method, url, headers, data);
        //console.log(response)
        console.log(response.headers['set-cookie']);
    })()
}

const steps = () => {

}

