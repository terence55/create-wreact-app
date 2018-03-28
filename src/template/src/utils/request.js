const jsonHeaders = new Headers({
  Accept: 'application/json'
});

export function getJson(url, extraHeaders) {
  return get(url, createHeaders(jsonHeaders, extraHeaders));
}

export function postJson(url, body, extraHeaders) {
  return post(url, createHeaders(jsonHeaders, extraHeaders), JSON.stringify(body));
}

export function delJson(url, extraHeaders) {
  return del(url, createHeaders(jsonHeaders, extraHeaders));
}

export function get(url, headers) {
  return request(url, 'GET', headers);
}

export function post(url, headers, body) {
  return request(url, 'POST', headers, body);
}

export function del(url, headers) {
  return request(url, 'DELETE', headers);
}

function request(url, method, headers, body) {
  const params = {
    method: method,
    headers: headers
  };
  if (body !== undefined) {
    params.body = body;
  }
  return fetch(url, params)
    .catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Request to ${url} failed, error is ${err}`); // eslint-disable-line no-console
      }
      return err;
    });
}

function createHeaders(baseHeaders, extraHeaders) {
  if (!extraHeaders || Object.keys(extraHeaders).length < 1) {
    return baseHeaders;
  }
  const requestHeaders = new Headers(baseHeaders);
  Object.keys(extraHeaders).forEach(key => requestHeaders.append(key, extraHeaders[key]));
  return requestHeaders;
}
