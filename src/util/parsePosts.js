export default (state, id, responseDocs) => {
  const itemsDoc = responseDocs.querySelectorAll('item');
  const controlTime = state.feeds[id].lastTime;
  itemsDoc.forEach((item, index) => {
    const { items } = state.feeds[id].content;
    const pubDate = item.querySelector('pubDate').textContent;
    if (index === 0) state.feeds[id].lastTime = pubDate;
    if (new Date(pubDate) > new Date(controlTime)) {
      const idt = `${id}.${new Date(pubDate).getTime()}`;
      const post = {};

      post.pubDate = pubDate;

      const titlePost = item.querySelector('title').textContent ?? item.querySelector('title').firstChild.textContent;
      post.title = {};
      post.title.text = titlePost;
      post.title.class = 'fw-bold';

      const descriptionPost = item.querySelector('description').textContent ?? item.querySelector('description').firstChild.textContent;
      post.description = descriptionPost;

      const link = item.querySelector('link').firstChild.textContent;
      post.link = link;

      const datacreator = item.querySelector('creator') ?? item.querySelector('author');
      const creator = datacreator !== null ? datacreator.firstChild.textContent : datacreator;
      post.creator = creator;

      const itemPost = { ids: idt, post: post };
      state.feeds[id].content.items = controlTime === 0 ? [...items, itemPost] : [itemPost, ...items];
      state.feeds[id].content.items = state.feeds[id].content.items.filter((i, idx) => idx < 15);
    }
  });
};
