import { getJson, postJson } from './request';

export function getJsonData(url, extraHeaders) {
  return getJson(url, extraHeaders)
    .then((response) => {
      if (response.ok) {
        return response.json().then(data => data);
      }
      throw Error(response.statusText);
    });
}

export function postJsonData(url, body, extraHeaders) {
  return postJson(url, body, extraHeaders)
    .then((response) => {
      if (response.ok) {
        return response.json().then(data => data);
      }
      throw Error(response.statusText);
    });
}
