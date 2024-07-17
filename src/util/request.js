import axios from 'axios';
import parsePosts from './parsePosts';
import parse from './parse';
import watched from './watcher';

const proxy = (inputURL, base = 'https://allorigins.hexlet.app/get') => {
  const requestURL = new URL(base);
  const newURL = encodeURI(inputURL);
  requestURL.searchParams.set('disableCache', true);
  requestURL.searchParams.set('url', newURL);
  return requestURL;
};

const request = (state, id, newfeed = false) => {
  const { url } = newfeed ? state.request : state.feeds[id];
  const watchedState = watched(state);
  axios.get(proxy(url))
    .then((response) => {
      if (response.status === 200) return response.data;
      throw new Error('Network Error');
    })
    .then((data) => {
      if (data.contents.slice(2, 5) === 'xml') {
        return new DOMParser().parseFromString(data.contents, 'text/xml');
      }
      throw new Error('no rss');
    })
    .then((value) => {
      if (newfeed) {
        parse(state, url, id, value);
      } else {
        clearTimeout(state.feeds[id].timer);
        state.feeds[id].timer = setTimeout(request, 5000, state, id);
      }
      parsePosts(state, id, value);
      state.request.errors = '';
      watchedState.response.status = 'received';
    })
    .catch((e) => {
      watchedState.request.errors = e.message;
    });
};

export default request;
