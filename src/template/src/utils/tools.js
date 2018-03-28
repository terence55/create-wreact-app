import pathToRegexp from 'path-to-regexp';

const nargs = /\{([0-9a-zA-Z_]+)\}/g;

export function openWindow(url) {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.click();
}

export function getValue(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

export function getPathParams(url, pattern) {
  if (!url || !pattern) {
    return {};
  }
  const keys = [];
  const re = pathToRegexp(pattern, keys);
  if (!keys || keys.length === 0) {
    return {};
  }
  const match = re.exec(url);
  if (!match) {
    return {};
  }
  const values = match.slice(1);
  const params = keys.reduce((memo, key, index) => {
    memo[key.name] = values[index];
    return memo;
  }, {});
  return params;
}

export function getQueryValue(param) {
  let params = window.location.hash.substr(1);
  let val = params.substr(params.indexOf(`${param}=`)).split('&')[0].split('=');
  if (val && val.length > 1) {
    return val[1];
  }
  params = window.location.search.substr(1);
  val = params.substr(params.indexOf(`${param}=`)).split('&')[0].split('=');
  if (val && val.length > 1) {
    return val[1];
  }
  return null;
}

export function argumentsToArray(input, fromIndex = 0) {
  const args = [];
  for (let i = fromIndex; i < input.length; i++) {
    args.push(input[i]);
  }
  return args;
}

export function formatString(string) {
  let args;
  if (arguments.length === 2 && typeof arguments[1] === 'object') { // eslint-disable-line prefer-rest-params
    args = arguments[1]; // eslint-disable-line prefer-rest-params
  } else {
    args = new Array(arguments.length - 1);
    for (let i = 1; i < arguments.length; ++i) {
      args[i - 1] = arguments[i]; // eslint-disable-line prefer-rest-params
    }
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return string.replace(nargs, (match, i, index) => {
    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i;
    }
    const result = Object.prototype.hasOwnProperty.call(args, i) ? args[i] : null;
    if (result === null || result === undefined) {
      return '';
    }
    return result;
  });
}
