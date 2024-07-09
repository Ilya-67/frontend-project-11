import { Alert } from "bootstrap";
import render from "./render";

export default (state) => {
  const buttons = document.querySelectorAll('button');
  const { feeds, repliesURLs } = state;
  buttons.forEach(element => {
    element.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      switch(action) {
        case 'delete':
        const id = e.target.dataset.id;
        const { url } = feeds[id];
          clearTimeout(state.feeds[id].timer);
          delete feeds[e.target.dataset.id];
          state.repliesURLs = repliesURLs.filter(({ urlFeed }) => urlFeed !== url);
          render(state);
          break;
        case 'open':
          const idt = e.target.dataset.id;
          const idts = idt.split('.').map(i => +i);
          state.feeds[idts[0]].content.items.filter((i) => i.ids === idt)[0].post.title.class = 'fw-normal';
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
      }
    });
  });
};
