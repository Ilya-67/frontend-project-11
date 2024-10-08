import i18n from 'i18next';
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
  document.getElementById('modalHeader').textContent = title.text;
  document.getElementById('redirect').firstChild.href = link;
  const aDescription = document.createElement('a');
  aDescription.innerHTML = description;
  const pCreator = document.createElement('p');
  pCreator.textContent = creator;
  document.getElementById('modalBody').replaceChildren(aDescription, pCreator);
};

const render = (state) => {
  const { feedBackMessage, repliesURLs } = state;
  const pFeedBack = document.getElementById('feedback');
  const [classOld, classNew] = (feedBackMessage === 'loaded')
    ? ['text-danger', 'text-success'] : ['text-success', 'text-danger'];
  pFeedBack.classList.replace(classOld, classNew);
  pFeedBack.textContent = i18n.t(`${feedBackMessage}`);
  const section = document.getElementById('container-xxl');
  const children = repliesURLs.length > 0 ? renderFeeds(state) : '';
  section.replaceChildren(children);

  const buttons = document.querySelectorAll('button');
  const aElements = document.querySelectorAll('a');
  [...buttons, ...aElements].forEach((button) => {
    button.addEventListener('click', (e) => {
      const { action, id } = e.target.dataset;
      if (action === 'deleteFeed') {
        deleteFeed(state, id);
      } else if (action === 'openPost') {
        openPost(state, id);
      }
      render(state);
    });
  });
};

export default render;
