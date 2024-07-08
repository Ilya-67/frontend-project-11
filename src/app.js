import i18next from "i18next";
import onChage from 'on-change';
import * as yup from 'yup';
import render from './render.js';
import renderModal from './modal.js';
import renderComponent from './componet.js';
import parse from './parse.js';
import resources from "./locales/resources.js";

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;
  state.lng = lng;
};

const app = () => {
  const state = {
    lng: 'en',
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
    lng: 'en',
    resources: resources,
  });
  
  const renderLng = () => {
    document.body.innerHTML = '';
    document.body.append(renderModal(), renderComponent(state));

    const watchedState = onChage(state, (path, value, previousValue = 'en') => {
      switch (path) {
        case 'lng': 
          state.lng = value;
          i18next.changeLanguage(value).then(() => {
            renderLng();
          });
          break;
        case 'request.errors':
          if (value[0] == 'url must be a valid URL') {
            state.feedBackMessage = 'notValidURL';     
          } else if (value[0] == 'url is invalid') {
            state.feedBackMessage = 'rendered';
          }
          break;
        case 'request.url':
          state.feedBackMessage = '';
          break;
        case 'response.status':
          if (value === 'received') {
            state.feedBackMessage = 'loaded';
          } else {
            state.feedBackMessage = 'notContain';
          }
      }
      render(state);
    });
    
    const radioChecks = document.querySelectorAll('.lng');
    radioChecks.forEach((i) => {
      i.addEventListener('click', handleSwitchLanguage(watchedState))
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
        if (validateResult) {
          return false;
        }
        return value;
      });
    });

    const schema = yup.object().shape({
      url: yup.string().url().required().myValidator(),
    });

    const form = document.querySelector('form');
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { url } = state.request;
      fetch(`https://allorigins.hexlet.app/get?url=${url}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        if (data.contents.slice(2, 5)=== 'xml') {
          const responseDocs = new DOMParser().parseFromString(data.contents, "text/xml");
          const { count } = state;
          state.count = count + 1;
          const id = count + 1;
          state.repliesURLs.push({ id: id, urlFeed: url });
          parse(responseDocs, state, url, id);
          watchedState.response.status = 'received';
        } else {
          watchedState.response.status = 'error';
        }
      })
      .catch(e => watchedState.response.status = 'error');
      e.target.reset();
    });
  };
  renderLng();
};

export default app;
