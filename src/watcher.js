import i18next from 'i18next';
import onChange from 'on-change';
import app from './app.js';
import render from './render.js';

const watchedState = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'lng':
      i18next.changeLanguage(value).then(() => {
        app(state, watchedState(state));
        render(state);
      });
      break;
    case 'request.errors':
      if (value[0] == 'url must be a valid URL') {
        state.feedBackMessage = 'notValidURL';
      } else if (value[0] == 'url is invalid') {
        state.feedBackMessage = 'rendered';
      } else if (value == 'Failed to fetch') {
        state.feedBackMessage = 'netError';
      }
      break;
    case 'request.url':
      state.feedBackMessage = '';
      break;
    case 'response.status':
      state.feedBackMessage = value === 'received' ? 'loaded' : 'notContain';
  }
  render(state);
});

export default watchedState;
