import i18next from 'i18next';

export default (state) => {
  const main = document.createElement('main');
  main.classList.add('flex-grow-1');
  const container = document.createElement('section');
  container.classList.add('container-fluid', 'bg-dark', 'p-5');
  const div = document.createElement('div');
  div.classList.add('row');

  const divCol = document.createElement('div');
  divCol.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  const nameAppElement = document.createElement('h1');
  nameAppElement.classList.add('display-3', 'mb-0');
  nameAppElement.textContent = i18next.t('rss');
  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = i18next.t('motto');

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
  input.type = 'text';
  input.setAttribute('autofocus', '');
  input.setAttribute('required', '');
  input.id = 'url-input';
  input.name = 'url';
  input.placeholder = 'ссылка RSS';
  input.ariaLabel = 'url';
  input.autocomplete = 'off';
  const label = document.createElement('label');
  label.for = 'url-input';
  label.textContent = i18next.t('ref');

  divFormInput.append(input, label);
  divFormCol.appendChild(divFormInput);
  const divButton = document.createElement('div');
  divButton.classList.add('col-auto');
  const button = document.createElement('button');
  button.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
  button.ariaLabel = 'add';
  button.type = 'submit';
  button.textContent = i18next.t('submit');

  divButton.appendChild(button);
  divFormRow.append(divFormCol, divButton);
  form.append(divFormRow);

  const pExample = document.createElement('p');
  pExample.classList.add('mt-2', 'mb-0', 'text-secondary');
  pExample.textContent = i18next.t('example');

  const pFeedBack = document.createElement('p');
  pFeedBack.classList.add('feedback', 'm-8', 'position-absolute', 'small', 'text-danger');
  pFeedBack.id = 'feedback';
  divCol.append(nameAppElement, p, form, pExample, pFeedBack);
  const divLng = document.createElement('div');
  divLng.classList.add('col-auto', 'h-75');
  divLng.id = 'block-lng';
  const groupLng = document.createElement('div');
  groupLng.classList.add('btn-group-vertical');
  groupLng.role = 'group';
  groupLng.ariaLabel = 'Basic radio toggle button group';
  const languages = ['en', 'ru', 'cz'];
  languages.forEach((i) => {
    const inputRadio = document.createElement('input');
    inputRadio.type = 'radio';
    inputRadio.classList.add('btn-check');
    inputRadio.name = 'btnradio';
    inputRadio.id = `btnradio${i}`;
    inputRadio.autocomplete = 'off';
    if (i === state.lng) inputRadio.checked = true;
    const labelRadio = document.createElement('label');
    labelRadio.classList.add('btn', 'btn-outline-secondary', 'lng');
    labelRadio.for = `btnradio${i}`;
    labelRadio.dataset.lng = i;
    labelRadio.textContent = i;
    groupLng.append(inputRadio, labelRadio);
  });
  divLng.append(groupLng);
  div.append(divCol, divLng);

  container.appendChild(div);
  const sectionFeedback = document.createElement('section');
  sectionFeedback.classList.add('container-fluid', 'container-xxl', 'p-5');
  sectionFeedback.id = 'container-xxl';
  main.append(container, sectionFeedback);
  return main;
};
