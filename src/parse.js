import parsePosts from "./parsePosts";

export default (responseDocs, state, url, id) => {
  state.feeds[id] = {};
  state.feeds[id].url = `${url}`;
  state.feeds[id].content = {};
  state.feeds[id].content.items = [];
  const title = responseDocs.querySelector('title');
  state.feeds[id].content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const description = responseDocs.querySelector('description');
  state.feeds[id].content.feedDescription = description.firstChild.textContent ?? description.textContent;
  state.feeds[id].lastTime = '';
  parsePosts(responseDocs, state, url, id);
};
  