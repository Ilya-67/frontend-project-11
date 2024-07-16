export default (state, id, responseDocs) => {
  const itemsDoc = responseDocs.querySelectorAll('item');
  const controlTime = state.feeds[id].lastTime;
  itemsDoc.forEach((item, index) => {
    const { items } = state.feeds[id].content;
    const pubDate = item.querySelector('pubDate').textContent;
    if (index === 0) state.feeds[id].lastTime = pubDate;
    if (new Date(pubDate) > new Date(controlTime)) {
      const idt = `${id}.${new Date(pubDate).getTime()}`;
      const itemPost = {};
      const titlePost = item.querySelector('title').textContent ?? item.querySelector('title').firstChild.textContent;
      itemPost.title = {};
      itemPost.title.text = titlePost;
      itemPost.title.class = 'fw-bold';
      const descriptionPost = item.querySelector('description').textContent ?? item.querySelector('description').firstChild.textContent;
      itemPost.description = descriptionPost;
      itemPost.pubDate = pubDate;
      const link = item.querySelector('link').firstChild.textContent;
      itemPost.link = link;
      const datacreator = item.querySelector('creator') ?? item.querySelector('author');
      const creator = datacreator !== null ? datacreator.firstChild.textContent : datacreator;
      itemPost.creator = creator;
      const res = { ids: idt, post: itemPost };
      state.feeds[id].content.items = controlTime === 0 ? [...items, res] : [res, ...items];
      state.feeds[id].content.items = state.feeds[id].content.items.filter((i, idx) => idx < 15);
    }
  });
};
