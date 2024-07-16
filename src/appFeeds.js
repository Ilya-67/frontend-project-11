import render from './render';

export default (state) => {
  const buttons = document.querySelectorAll('button');
  const { feeds, repliesURLs } = state;
  buttons.forEach(elButton => {
    elButton.addEventListener('click', (e) => {
      const { action } = e.target.dataset;
      switch (action) {
        case 'deleteFeed':
          const { id } = e.target.dataset;
          const { url } = feeds[id];
          clearTimeout(state.feeds[id].timer);
          delete feeds[id];
          state.repliesURLs = repliesURLs.filter(({ urlFeed }) => urlFeed !== url);
          state.feedBackMessage = 'deleted';
          state.response.status = '';
          render(state);
          break;
        case 'openPost':
          const idt = e.target.dataset.id;
          const idts = idt.split('.').map(i => +i);
          state.feeds[idts[0]].content.items.filter((i) => i.ids === idt)[0].post.title.class = 'fw-normal, link-secondary';
          const [{ post }] = state.feeds[idts[0]].content.items.filter((i) => i.ids === idt);
          const { title, description, creator, link } = post;
          const modalHeader = document.getElementById('modalHeader');
          const modalBody = document.getElementById('modalBody');
          const modalRedirect = document.getElementById('redirect');
          modalRedirect.firstChild.href = link;
          modalHeader.textContent = title.text;
          modalBody.innerHTML = '';
          const aDescription = document.createElement('a');
          const pCreator = document.createElement('p');
          aDescription.innerHTML = description;
          pCreator.textContent = creator;
          modalBody.append(aDescription, pCreator);
          break;
        default: 
          break;
      }
    });
  });
};
