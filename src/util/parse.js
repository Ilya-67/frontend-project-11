export default (state, url, idFeed, responseDocs) => {
  state.feeds[idFeed] = {};
  const feed = state.feeds[idFeed];
  feed.url = `${url}`;
  feed.lastTime = 0;
  feed.content = {};
  feed.content.items = [];
  const title = responseDocs.querySelector('title');
  feed.content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const remark = responseDocs.querySelector('description');
  feed.content.feedDescription = remark.firstChild.textContent ?? remark.textContent;

  const urlFeed = { id: idFeed, urlFeed: url };
  state.repliesURLs = [...state.repliesURLs, urlFeed];
};
