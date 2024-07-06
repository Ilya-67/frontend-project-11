import appFeeds from "./appFeeds";

export default (state) => {
  const { feeds, repliesURLs } = state;
  const section = document.getElementById('container-xxl');
  if (repliesURLs.length > 0) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('row');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = 'Фиды';
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
    cardTitlePosts.textContent = 'Посты';
    const ulCardPosts = document.createElement('ul');
    ulCardPosts.classList.add('list-group', 'border-0', 'rounded-0');
    cardBodyPosts.append(cardTitlePosts);
    divCardPosts.append(cardBodyPosts, ulCardPosts);

    Object.entries(feeds).forEach((i) => {
      const id = i[0];
      const { content } = i[1];
      const liCard = document.createElement('li');
      liCard.classList.add('list-group-item', 'd-flex', 'justify-content-between',
        'align-items-start', 'border-0', 'border-end-0'
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
      buttonClouseFeed.dataset.action = 'delete';
      buttonClouseFeed.textContent = 'Удалить ленту';
      const divLi = document.createElement('div');
      divLi.append(liTitle, liDescription);
      liCard.append(divLi, buttonClouseFeed);
      ulCard.append(liCard);

      const items = Object.entries(content.items);
      items.forEach((item) => {
        const idt = item[0];
        const { link, title } = item[1];
        const liPost = document.createElement('li');
        liPost.classList.add('list-group-item', 'd-flex', 'justify-content-between',
          'align-items-start', 'border-0', 'border-end-0'
        );
        ulCardPosts.append(liPost);
        const aPost = document.createElement('a');
        aPost.classList.add('fw-bold');
        aPost.target = '_blank';
        aPost.textContent = title;
        aPost.href = link;
        aPost.dataset.id = idt;
        const buttonOpen = buttonClouseFeed.cloneNode(false);
        buttonOpen.classList.replace('btn-outline-secondary', 'btn-outline-primary');
        buttonOpen.dataset.bsToggle = 'modal';
        buttonOpen.dataset.bsTarget = '#modal';
        buttonOpen.dataset.action = 'open';
        buttonOpen.textContent = 'Посмотреть';
        buttonOpen.dataset.id = idt;
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