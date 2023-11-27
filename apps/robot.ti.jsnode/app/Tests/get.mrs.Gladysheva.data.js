const axios = require('axios');

const baseUrl = 'https://www.tinkoff.ru'
const profile = 'da512a0c-fa0f-4313-9840-b1753eaf809a'
const limit = 10
const sessionId = 't.uQOjgMNTCt39dD0IqOwYBIphu6cVwpAtPUQHuRHhPj6IYjTVpZECMhD_ujtO9qSMOJ5XX9ifa6ikJrkRKI3law'

axios.get(baseUrl+'/api/invest-gw/social/v1/profile/' + profile + '/instrument?limit=' + limit + '&sessionId=' + sessionId)
.then(response => {
    const firstItem = response.data.payload.items[0];
    console.log(firstItem);

    const classCode = response.data.payload.items[0].classCode

    axios.get(baseUrl + '/api/invest-gw/social/v1/profile/' + profile + '/operation/instrument/RASP/' + classCode + '?limit=30&sessionId=' + sessionId)
    .then(response => {
        const firstItem = response.data.payload.items[0];
        console.log(firstItem);
    })
    .catch(error => {
        console.log(error);
    });

})
.catch(error => {
    console.log(error);
});

//----


