import i18next from 'i18next';
import renderFeeds from './renderFeeds';

const deleteFeed = (state, id) => {
  const { feeds, repliesURLs } = state;
  const { url } = feeds[id];
  clearTimeout(state.feeds[id].timer);
  delete feeds[id];
  state.repliesURLs = repliesURLs.filter(({ urlFeed }) => urlFeed !== url);
  state.feedBackMessage = 'deleted';
};

const openPost = (state, id) => {
  const idt = id.split('.').map((i) => +i);
  const currentFeed = state.feeds[idt[0]];
  const [{ post }] = currentFeed.content.items.filter((i) => i.ids === id);
  post.title.class = 'fw-normal, link-secondary';
  const {
    title,
    description,
    creator,
    link,
  } = post;
  const modalHeader = document.getElementById('modalHeader');
  modalHeader.textContent = title.text;
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = '';
  const modalRedirect = document.getElementById('redirect');
  modalRedirect.firstChild.href = link;
  const aDescription = document.createElement('a');
  aDescription.innerHTML = description;
  const pCreator = document.createElement('p');
  pCreator.textContent = creator;
  modalBody.append(aDescription, pCreator);
};

const render = (state) => {
  const appFeeds = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((elButton) => {
      elButton.addEventListener('click', (e) => {
        const { action } = e.target.dataset;
        const { id } = e.target.dataset;
        switch (action) {
          case 'deleteFeed':
            deleteFeed(state, id);
            render(state);
            break;
          case 'openPost':
            openPost(state, id);
            break;
          default:
            break;
        }
      });
    });
  };
  const pFeedBack = document.getElementById('feedback');
  if (state.feedBackMessage === 'loaded') {
    pFeedBack.classList.replace('text-danger', 'text-success');
  } else {
    pFeedBack.classList.replace('text-success', 'text-danger');
  }
  pFeedBack.textContent = i18next.t(`${state.feedBackMessage}`);
  const section = document.getElementById('container-xxl');
  const { repliesURLs } = state;
  if (repliesURLs.length > 0) {
    const container = renderFeeds(state);
    if (section.hasChildNodes()) {
      section.removeChild(section.firstChild);
    }
    section.appendChild(container);
  } else {
    section.innerHTML = '';
  }
  appFeeds(state);
};

export default render;
