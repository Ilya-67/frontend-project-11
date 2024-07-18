import i18next from 'i18next';

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
 
  const { feeds, repliesURLs } = state;
  const section = document.getElementById('container-xxl');
  const pFeedBack = document.getElementById('feedback');
  if (state.feedBackMessage === 'loaded') {
    pFeedBack.classList.replace('text-danger', 'text-success');
  } else {
    pFeedBack.classList.replace('text-success', 'text-danger');
  }
  pFeedBack.textContent = i18next.t(`${state.feedBackMessage}`);
  if (repliesURLs.length > 0) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('row');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = i18next.t('feeds');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.appendChild(cardTitle);
    const ulCard = document.createElement('ul');
    ulCard.classList.add('list-group', 'border-0', 'border-end-0');
    const divCard = document.createElement('div');
    divCard.classList.add('card', 'border-0');
    divCard.append(cardBody, ulCard);
    const divCardPosts = divCard.cloneNode(false);
    const cardBodyPosts = cardBody.cloneNode(false);
    const cardTitlePosts = cardTitle.cloneNode(false);
    cardTitlePosts.textContent = i18next.t('posts');
    const ulCardPosts = document.createElement('ul');
    ulCardPosts.classList.add('list-group', 'border-0', 'rounded-0');
    cardBodyPosts.append(cardTitlePosts);
    divCardPosts.append(cardBodyPosts, ulCardPosts);

    Object.entries(feeds).forEach((i) => {
      const id = i[0];
      const { content } = i[1];
      const liCard = document.createElement('li');
      liCard.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0',
      );
      const liTitle = document.createElement('h3');
      liTitle.classList.add('h6', 'm-0');
      liTitle.textContent = content.feedTitle;
      const liDescription = document.createElement('p');
      liDescription.classList.add('m-0', 'small', 'text-black-50');
      liDescription.textContent = content.feedDescription;
      const buttonClouseFeed = document.createElement('button');
      buttonClouseFeed.type = 'button';
      buttonClouseFeed.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
      buttonClouseFeed.dataset.id = id;
      buttonClouseFeed.dataset.action = 'deleteFeed';
      buttonClouseFeed.textContent = i18next.t('delete');
      const divLi = document.createElement('div');
      divLi.append(liTitle, liDescription);
      liCard.append(divLi, buttonClouseFeed);
      ulCard.append(liCard);
      const { items } = content;
      items.forEach(({ ids, post }) => {
        const { link, title } = post;
        const liPost = document.createElement('li');
        liPost.classList.add(
          'list-group-item',
          'd-flex',
          'justify-content-between',
          'align-items-start',
          'border-0',
          'border-end-0',
        );
        ulCardPosts.append(liPost);
        const aPost = document.createElement('a');
        aPost.className = `${title.class}`; // if you add class 'w-75', it looks better
        aPost.target = '_blank';
        aPost.textContent = title.text;
        aPost.href = link;
        aPost.dataset.id = ids;
        const buttonOpen = buttonClouseFeed.cloneNode(false);
        buttonOpen.classList.replace('btn-outline-secondary', 'btn-outline-primary');
        buttonOpen.dataset.bsToggle = 'modal';
        buttonOpen.dataset.bsTarget = '#modal';
        buttonOpen.dataset.action = 'openPost';
        buttonOpen.textContent = i18next.t('open');
        buttonOpen.dataset.id = ids;
        liPost.append(aPost, buttonOpen);
      });
    });
    const divFeeds = document.createElement('div');
    divFeeds.classList.add('col-md-10', 'col-lg-4', 'mx-auto', 'order-0', 'order-lg-1', 'feeds');
    divFeeds.append(divCard);
    const divPosts = document.createElement('div');
    divPosts.classList.add('col-md-10', 'col-lg-8', 'order-1', 'mx-auto', 'posts');
    divPosts.append(divCardPosts);
    divContainer.append(divFeeds, divPosts);
    if (section.hasChildNodes()) {
      section.removeChild(section.firstChild);
    }
    section.appendChild(divContainer);
    appFeeds(state);
  } else {
    section.innerHTML = '';
  }
};

export default render;
