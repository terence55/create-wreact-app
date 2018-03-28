import { get as getCookie, set as setCookie } from 'js-cookie';
import { getValue, getQueryValue, argumentsToArray, formatString } from './tools';

let defaultLocale = 'en-US';
let curLocale;
let curResource;

export default function localeText(key) {
  return localeTextFromRes(key, null, ...argumentsToArray(arguments, 1)); // eslint-disable-line prefer-rest-params
}

export function localeTextFromRes(key, localeResource) {
  if (key === undefined) {
    return '';
  }
  const localeConfig = localeResource || curResource || {};
  let value;
  if (localeConfig[curLocale]) {
    value = getValue(localeConfig[curLocale], key);
  }
  if (value === undefined && localeConfig[defaultLocale]) {
    value = getValue(localeConfig[defaultLocale], key);
  }
  if (value === undefined) {
    value = key;
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Missing locale key: '${key}'`); // eslint-disable-line no-console
    }
  }
  if (arguments.length > 2) {
    if (typeof arguments[2] === 'object') { // eslint-disable-line prefer-rest-params
      value = formatString(value, arguments[2]); // eslint-disable-line prefer-rest-params
    } else {
      value = formatString(value, ...argumentsToArray(arguments, 2)); // eslint-disable-line prefer-rest-params
    }
  }
  return value;
}

export function getUserLocale() {
  return parseLocale(
    getQueryValue('locale') ||
    getQueryValue('lang') ||
    getQueryValue('language') ||
    getCookie('locale') ||
    getCookie('lang') ||
    (navigator ? navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage || (navigator.languages && navigator.languages[0]) : defaultLocale)
  );
}

export function getLocale() {
  return curLocale;
}

export function setLocale(locale) {
  curLocale = locale;
}

export function setLocaleToCookie(locale) {
  setLocale(locale);
  setCookie('locale', locale, { expires: 999 });
}

export function collectResource(context) {
  if (!context) {
    return {};
  }
  const keys = context.keys();
  const locale = {};
  for (let i = 0; i < keys.length; i++) {
    locale[keys[i].substring(keys[i].lastIndexOf('/') + 1, keys[i].lastIndexOf('.js'))] = context(keys[i]).default || context(keys[i]);
  }
  return locale;
}

export function init(globalResource, customDefaultLocale) {
  if (curLocale) {
    return;
  }
  if (globalResource) {
    curResource = globalResource;
  }
  if (customDefaultLocale) {
    defaultLocale = customDefaultLocale;
  }
  curLocale = getUserLocale();
}

function parseLocale(input) {
  if (input === undefined) {
    return defaultLocale;
  }
  let output = input.replace(/_/g, '-');
  if (output.indexOf('-') > -1) {
    const infos = output.split('-');
    output = `${infos[0].toLowerCase()}-${infos[1].toUpperCase()}`;
  }
  if (output.toUpperCase() === 'EN') {
    output = 'en-US';
  }
  if (output.toUpperCase() === 'CN' || output.toUpperCase() === 'ZH') {
    output = 'zh-CN';
  }
  return output;
}
