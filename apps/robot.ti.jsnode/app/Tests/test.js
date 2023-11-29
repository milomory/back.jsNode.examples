

const axios = require('axios');

const cid = () => {
  axios({
    method: 'get',
    url: 'https://www.tinkoff.ru/api/common/v1/session/authorize/',
    data: {}
  })
      .then(response => {
        // console.log('currentUrl:', response.request.socket._httpMessage._redirectable._currentUrl);
        // console.log('path:', response.request.socket._httpMessage._redirectable._options.path);
        // console.log('query:', response.request.socket._httpMessage._redirectable._options.query);
        let responseCid = response.request.socket._httpMessage._redirectable._options.query;
        let cid = responseCid.slice(4);
        return cid
      })
      .catch(error => {
        console.error('Error at processTicksAndRejections:', error);
      });
}

exports.getCID = () => {
  console.log(cid)
  return cid
}

// ====
// const config = {
//   headers: { Authorization: `Bearer ${tiENV.token}` },
//   params: { userID: tiENV.userID }
// };
//
// axios.post('https://www.tinkoff.ru/api/common/v1/session', {}, config)
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });


