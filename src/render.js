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
  pFeedBack.textContent = i18next.t(`${feedBackMessage}`);
  const section = document.getElementById('container-xxl');
  if (repliesURLs.length > 0) {
    section.replaceChildren(renderFeeds(state));
  } else {
    section.innerHTML = '';
  }
  const buttons = document.querySelectorAll('button');
  buttons.forEach((elButton) => {
    elButton.addEventListener('click', (e) => {
      const { action, id } = e.target.dataset;
      if (action === 'deleteFeed') {
        deleteFeed(state, id);
        render(state);
      } else if (action === 'openPost') {
        openPost(state, id);
      }
    });
  });
};

export default render;
