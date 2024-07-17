import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
import renderModal from './modal.js';
import renderComponent from './componet.js';
import request from './util/request.js';
import render from './render.js';

const watcher = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'lng':
      i18next.changeLanguage(value).then(() => {
        app(state);
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
      state.feedBackMessage = value;
      render(state);
      break;
    default:
      break;
  }
});

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;
  state.lng = lng;
};

yup.addMethod(yup.string, 'myValidator', function myValidator(state) {
  return this.test('RSS уже существует', (currentURL) => {
    const urls = state.repliesURLs.map(({ urlFeed }) => urlFeed);
    return urls.includes(currentURL) ? false : currentURL;
  });
});

const schema = (state) => yup.object().shape({
  url: yup.string().url().required('not Empty').myValidator(state),
});

const app = (state) => {
  document.body.replaceChildren(renderModal(), renderComponent(state));
  const watchedState = watcher(state);

  const radioChecks = document.querySelectorAll('.lng');
  radioChecks.forEach((i) => i.addEventListener('click', handleSwitchLanguage(watchedState)));

  const input = document.getElementById('url-input');
  input.addEventListener('change', ({ target: { value } }) => {
    schema(state).validate({ url: value }, { abortEarly: false })
      .then((result) => {
        state.request = { status: true, errors: '' };
        watchedState.request.url = `${result.url}`;
      })
      .catch((e) => {
        state.request = { status: false };
        watchedState.request.errors = e.message;
      });
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (state.request.status) {
      state.count += 1;
      request(state, state.count, true);
    }
    e.target.reset();
  });
};

export { watcher };
export default app;
