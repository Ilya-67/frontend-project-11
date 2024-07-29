import axios from 'axios';
import onChange from 'on-change';
import parse from './parse';
import render from './render';

const watcher = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'request.errors':
      state.feedBackMessage = value;
      render(state);
      break;
    case 'response.status':
      state.response.status = '';
      state.feedBackMessage = value;
      render(state);
      break;
    default:
      break;
  }
});

const getProxy = (inputURL, base = 'https://allorigins.hexlet.app/get') => {
  const requestURL = new URL(base);
  const newURL = encodeURI(inputURL);
  requestURL.searchParams.set('disableCache', true);
  requestURL.searchParams.set('url', newURL);
  return requestURL;
};

const request = (state, id, newfeed = false) => {
  const { url } = newfeed ? state.request : state.feeds[id];
  const watchedState = watcher(state);
  axios.get(getProxy(url))
    .then((response) => {
      if (response) return response.data;
      throw new Error('Network Error');
    })
    .then((data) => {
      const parseDoc = new DOMParser().parseFromString(data.contents, 'application/xml');
      if (!parseDoc.querySelector('parsererror')) return parseDoc;
      throw new Error('no rss');
    })
    .then((value) => {
      parse(state, url, id, value, newfeed);
      const timeout = 5000;
      state.feeds[id].timer = setTimeout(request, timeout, state, id);
      watchedState.response.status = 'loaded';
    })
    .catch((e) => {
      watchedState.request.errors = e.message;
    });
};

export default request;
