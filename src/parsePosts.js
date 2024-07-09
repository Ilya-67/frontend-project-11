import refresh from "./refresh";

export default (responseDocs, state, url, id) => {
  const itemsDoc = responseDocs.querySelectorAll('item');
  const controlTime = state.feeds[id].lastTime;
  itemsDoc.forEach((item, index) => {
    const items = state.feeds[id].content.items;
    const pubDate = item.querySelector('pubDate').textContent;
    if (index === 0) state.feeds[id].lastTime = pubDate;
    if (pubDate > controlTime) {
      const idt = `${id}.${new Date(pubDate).getTime()}`;
      const itPost = {};
      const titlePost = item.querySelector('title').textContent ?? item.querySelector('title').firstChild.textContent;
      itPost.title = titlePost;
      const descriptionPost =  item.querySelector('description').textContent ?? item.querySelector('description').firstChild.textContent;
      itPost.description = descriptionPost;
      itPost.pubDate = pubDate;
      const link = item.querySelector('link').firstChild.textContent;
      itPost.link = link;
      const datacreator = item.querySelector('creator') ?? item.querySelector('author');
      const creator = datacreator !== null ? datacreator.firstChild.textContent : datacreator;
      itPost.creator = creator;
      const result = {ids: idt, post: itPost};
      state.feeds[id].content.items = controlTime === '' ? [...items, result] : [result, ...items ];
      state.feeds[id].content.items = state.feeds[id].content.items.filter((i, index) => index < 10);
    }  
  });
  clearTimeout(state.feeds[id].timer);
  state.feeds[id].timer = setTimeout(refresh, 10000, state, url, id);
};
