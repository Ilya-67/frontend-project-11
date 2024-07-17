import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import app from './app.js';
import resourcesLng from './locales/resources.js';

const runApp = () => {
  const state = {
    lng: 'ru',
    count: 0,
    repliesURLs: [],
    feedBackMessage: '',
    feeds: {},
    response: {
      status: '',
      errors: [],
    },
    request: {
      status: false,
      url: '',
      errors: [],
    },
  };

  i18next.init({
    lng: 'ru',
    resources: resourcesLng,
  });
  app(state);
};

runApp();
