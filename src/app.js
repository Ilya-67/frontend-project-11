import * as yup from 'yup';
import renderModal from './modal.js';
import renderComponent from './componet.js';
import request from "./request.js";

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;
  state.lng = lng;
};

const app = (state, watchedState) => {
  document.body.innerHTML = '';
  document.body.append(renderModal(), renderComponent(state));

  const radioChecks = document.querySelectorAll('.lng');
  radioChecks.forEach((i) => {
    i.addEventListener('click', handleSwitchLanguage(watchedState));
  });

  const input = document.getElementById('url-input');
  input.addEventListener('change', (err) => {
    const currentUrl = err.target.value;
    schema.validate({ url: currentUrl }, { abortEarly: false })
    .then((value) => {
      state.request.errors = [];
      state.response.status = '';
      watchedState.request.url = `${value.url}`;
    })
    .catch((e) => {
      err.target.value = '';
      watchedState.request.errors = [e.errors];
      });
  });

  yup.addMethod(yup.string, "myValidator", function myValidator() {
    return this.test('RSS уже существует', (value) => {
      const urls = state.repliesURLs.map(({ urlFeed }) => urlFeed);
      const validateResult = urls.includes(value);
      return validateResult ? false : value;
    });
  });

  const schema = yup.object().shape({
    url: yup.string().url().required().myValidator(),
  });

  const form = document.querySelector('form');
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { url } = state.request;
    const { count } = state;
    const id = count + 1;
    state.count = id;
    request(state, url, id, watchedState, true);
    e.target.reset();
  });
};

export default app;
