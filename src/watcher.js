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
      state.feedBackMessage = value;
      render(state);
      break;
    case 'request.url':
      state.feedBackMessage = '';
      render(state);
      break;
    case 'response.status':
      state.response.status = '';
      render(state);
      break;
  }
});

export default watchedState;
