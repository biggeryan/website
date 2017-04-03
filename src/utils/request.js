

function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  throw new Error('code: ' + response.status + ', text: ' + response.statusText)
}

function parseJSON(response) {
  return response.json()
}

let defaultOpts = {
  headers: {
    'credentials': 'include',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'mode': 'cors'
  }
}

/**
 * 封装fetch，对错误统一处理
 * @author: biggeryan 2017.2.10
 * @param url
 * @param options
 * @returns {Promise.<TResult>}
 */
function request(url, options) {
  return fetch(url, Object.assign({}, defaultOpts, options))
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      // 错误处理
      throw new Error(error.name + ': ' + error.message)
    })
}
export default request
