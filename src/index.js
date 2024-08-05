import './styles.scss';
import 'bootstrap';
import i18n from 'i18next';
import app from './app';
import resourcesLng from './locales/resources';

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

  i18n.init({
    lng: 'ru',
    resources: resourcesLng,
  });
  app(state);
};

runApp();
