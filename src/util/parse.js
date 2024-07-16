import refresh from './refresh';

export default (state, url, id, responseDocs) => {
  state.feedBackMessage = 'loaded';
  state.feeds[id] = {};
  state.feeds[id].url = `${url}`;
  state.feeds[id].content = {};
  state.feeds[id].content.items = [];
  const item = { id: id, urlFeed: url };
  state.repliesURLs = [...state.repliesURLs, item];
  state.feeds[id].lastTime = 0;
  const title = responseDocs.querySelector('title');
  state.feeds[id].content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const remark = responseDocs.querySelector('description');
  state.feeds[id].content.feedDescription = remark.firstChild.textContent ?? remark.textContent;
  state.feeds[id].timer = setTimeout(refresh, 5000, state, id);
};
