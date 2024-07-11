import './styles.scss';
import 'bootstrap';
import app from './app.js';
import i18next from 'i18next';
import resources from './locales/resources.js';

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
    resources: resources,
  });
  
  app(state);
};

runApp();
