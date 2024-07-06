import refresh from "./refresh";
import parsePosts from "./parsePosts";

export default (responseDocs, state, url, id) => {
  state.feeds[id] = {};
  state.feeds[id].timer = setInterval(refresh, 60000, state, url, id);
  state.feeds[id].url = `${url}`;
  state.feeds[id].content = {};
  const title = responseDocs.querySelector('title');
  state.feeds[id].content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const description = responseDocs.querySelector('description');
  state.feeds[id].content.feedDescription = description.firstChild.textContent ?? description.textContent;
  parsePosts(responseDocs, state, id);
};
  