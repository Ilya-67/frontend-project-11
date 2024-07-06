import onChage from 'on-change';
import * as yup from 'yup';
import render from './render.js';
import renderModal from './modal.js';
import renderComponent from './componet.js';
import parse from './parse.js';

export default () => {
  document.body.append(renderModal(), renderComponent());

  const state = {
    count: 0,
    repliesURLs: [],
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

  const watchedState = onChage(state, (path, value) => {
    const pFeedBack = document.getElementById('feedback');
    switch (path) {
      case 'request.errors':
        if (value[0] == 'url must be a valid URL') {
          pFeedBack.classList.remove('text-success');
          pFeedBack.classList.add('text-danger');
          pFeedBack.textContent = 'Ссылка должена быть валидным URL';        
        } else if (value[0] == 'url is invalid') {
          pFeedBack.classList.remove('text-success');
          pFeedBack.classList.add('text-danger');
          pFeedBack.textContent = 'RSS уже существует';
        }  
        break;
      case 'request.url':
        pFeedBack.classList.remove('text-success');
        pFeedBack.classList.add('text-danger');
        pFeedBack.textContent = '';
        break;
      case 'response.status':
        if (value === 'received') {
          pFeedBack.classList.remove('text-danger');
          pFeedBack.classList.add('text-success');
          pFeedBack.textContent = 'RSS успешно загружен';
        } else {
          pFeedBack.classList.remove('text-success');
          pFeedBack.classList.add('text-danger');
          pFeedBack.textContent = 'Ресурс не содержит валидный RSS';
        }
        render(state);
    }
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
