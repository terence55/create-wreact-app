import FetchMock from 'fetch-mock';
import pathToRegexp from 'path-to-regexp';
import { getPathParams } from '../utils/tools';

export const MockHost = 'https://mock.react'; // eslint-disable-line import/prefer-default-export

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => (item !== './index.js'));
const mocks = [];
for (let i = 0; i < keys.length; i++) {
  mocks.push(context(keys[i]));
}

FetchMock.config.warnOnFallback = process.env.NODE_ENV !== 'production';
FetchMock.fallbackResponse = (url, options) => FetchMock.getNativeFetch(url, options);

mocks.forEach((mock) => {
  const model = mock.default || mock;
  Object.keys(model).forEach((key) => {
    if (model[key] && typeof model[key] === 'function') {
      const pattern = `${MockHost}${key.startsWith('/') ? '' : '/'}${key}`;
      FetchMock.mock(pathToRegexp(pattern), (url, options) => {
        const params = getPathParams(url, pattern);
        options.params = params;
        return model[key](url, options);
      });
    }
  });
});
