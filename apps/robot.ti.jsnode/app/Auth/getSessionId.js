const {stringify} = require("qs");
exports.getCId = () => {
    const method = 'get';
    const url = 'https://www.tinkoff.ru/api/common/v1/session/authorize/';
    const headers = {};
    const data = {};
    (async () => {
        const response = await require('../service').request(method, url, headers, data);
        const cid = response.request.socket._httpMessage._redirectable._options.query.slice(4);
        //console.log(cid)
        get1(cid)
    })()
}

const get1 = (cid) => {
    const method = 'get';
    const url = 'https://id.tinkoff.ru/auth/step?cid='+cid;
    const headers = {};
    const data = {
        pin: '3728',
        step: 'pin'
    };
    (async () => {
        const response = await require('../service').request(method, url, headers, data);
        //console.log(response)
        //console.log(response.headers['set-cookie']);
        get2(cid)
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

const getSessionId = () => {

}

