import onChange from 'on-change';
import i18next from 'i18next';
import * as yup from 'yup';
import renderModal from './getModalComponent';
import renderComponent from './getMainComponet';
import request from './request';
import render from './render';

const watcher = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'lng':
      i18next.changeLanguage(value).then(() => {
        render(state);
      });
      break;
    case 'request.errors':
      state.request.url = null;
      state.feedBackMessage = value;
      render(state);
      break;
    case 'request.url':
      state.feedBackMessage = '';
      render(state);
      break;
    default:
      break;
  }
});

const schema = (urls) => yup.object()
  .shape({ url: yup.string().url().required('not Empty').notOneOf(urls, 'already exists') });

const app = (state) => {
  document.body.replaceChildren(renderModal(), renderComponent(state));

  const watchedState = watcher(state);

  const handleSwitchLanguage = (wState) => (evt) => {
    wState.lng = evt.target.dataset.lng;
    app(state);
  };

  const radioChecks = document.querySelectorAll('.lng');
  radioChecks.forEach((i) => i.addEventListener('click', handleSwitchLanguage(watchedState)));

  const input = document.getElementById('url-input');
  input.addEventListener('change', ({ target: { value } }) => {
    const urls = state.repliesURLs.map(({ urlFeed }) => urlFeed);
    schema(urls).validate({ url: value }, { abortEarly: true })
      .then((context) => { watchedState.request.url = `${context.url}`; })
      .catch((e) => { watchedState.request.errors = e.message; });
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (state.request.url) {
      state.count += 1;
      request(state, state.count, true);
    }
    e.target.reset();
  });
};

export default app;
