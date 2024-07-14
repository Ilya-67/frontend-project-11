import refresh from "./refresh";

export default (state, url, id, responseDocs) => {
  state.feeds[id] = {};
  state.feeds[id].url = `${url}`;
  state.feeds[id].content = {};
  state.feeds[id].content.items = [];
  state.repliesURLs= [...state.repliesURLs, { id: id, urlFeed: url }];
  state.feeds[id].lastTime = 0;
  const title = responseDocs.querySelector('title');
  state.feeds[id].content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const description = responseDocs.querySelector('description');
  state.feeds[id].content.feedDescription = description.firstChild.textContent ?? description.textContent;
  state.feeds[id].timer = setTimeout(refresh, 5000, state, url, id);
};
  