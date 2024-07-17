export default (state, url, idFeed, responseDocs) => {
  state.feeds[idFeed] = {};
  state.feeds[idFeed].url = `${url}`;
  state.feeds[idFeed].content = {};
  state.feeds[idFeed].content.items = [];
  const item = { id: idFeed, urlFeed: url };
  state.repliesURLs = [...state.repliesURLs, item];
  state.feeds[idFeed].lastTime = 0;
  const title = responseDocs.querySelector('title');
  state.feeds[idFeed].content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const remark = responseDocs.querySelector('description');
  state.feeds[idFeed].content.feedDescription = remark.firstChild.textContent ?? remark.textContent;
};
