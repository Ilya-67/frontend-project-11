import './styles.scss';
import 'bootstrap';
import app from './app.js';

const component = () => {
  const container = document.createElement('section');
  container.classList.add('container-fluid', 'bg-dark', 'p-5');
  const div = document.createElement('div');
  const divCol = document.createElement('div');
  div.classList.add('row');
  divCol.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  const nameElement = document.createElement('h1');
  nameElement.classList.add('display-3', 'mb-0');
  nameElement.textContent = 'RSS агрегатор';
    
  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = 'Начните читать RSS сегодня! Это легко, это красиво.';
    
  const form = document.createElement('form');
  form.classList.add('rss-form', 'text-body');
  
  const divFormRow = document.createElement('div');
  divFormRow.classList.add('row');
  
  const divFormCol = document.createElement('div');
  divFormCol.classList.add('col');

  const divFormInput = document.createElement('div');
  divFormInput.classList.add('form-floating');

  const input = document.createElement('input');
  input.classList.add('form-control', 'w-100');
  input.setAttribute('id', 'url-input');
  input.setAttribute('name', 'url');
  input.setAttribute('placeholder', 'ссылка RSS');
  input.ariaLabel = 'url';
  input.setAttribute('autocomplete', 'off');

  const label = document.createElement('label');
  label.setAttribute('for', 'url-input');
  label.textContent = 'Ссылка RSS';
  
  divFormInput.append(input, label);
  divFormCol.appendChild(divFormInput);

  const divButton = document.createElement('div');
  divButton.classList.add('col-auto');
  
  const button = document.createElement('button');
  button.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
  button.ariaLabel = 'add';
  button.setAttribute('type', 'submit');
  button.textContent = 'Добавить';
  
  divButton.appendChild(button);
  divFormRow.append(divFormCol, divButton);
  form.append(divFormRow);
  
  const pExample = document.createElement('p');
  pExample.classList.add('mt-2', 'mb-0','text-secondary' );
  pExample.textContent = 'Пример: https://lorem-rss.hexlet.app/feed';
  
  const pFeedBack = document.createElement('p');
  pFeedBack.classList.add('feedback', 'm-8', 'position-absolute', 'small', 'text-danger');

  divCol.append(nameElement, p, form, pExample, pFeedBack);
  div.appendChild(divCol);
  container.appendChild(div);
  return container;
};

document.body.appendChild(component());
 app(document);