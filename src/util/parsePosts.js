export default (state, id, responseDocs) => {
  const itemsDoc = responseDocs.querySelectorAll('item');
  const controlTime = state.feeds[id].lastTime;
  itemsDoc.forEach((item, index) => {
    const { items } = state.feeds[id].content;
    const pubDate = item.querySelector('pubDate').textContent;
    if (index === 0) state.feeds[id].lastTime = pubDate;
    if (new Date(pubDate) > new Date(controlTime)) {
      const idt = `${id}.${new Date(pubDate).getTime()}`;
      const currentPost = {};

      currentPost.pubDate = pubDate;

      const titlePost = item.querySelector('title').textContent ?? item.querySelector('title').firstChild.textContent;
      currentPost.title = {};
      currentPost.title.text = titlePost;
      currentPost.title.class = 'fw-bold';

      const descriptionPost = item.querySelector('description').textContent ?? item.querySelector('description').firstChild.textContent;
      currentPost.description = descriptionPost;

      const link = item.querySelector('link').firstChild.textContent;
      currentPost.link = link;

      const datacreator = item.querySelector('creator') ?? item.querySelector('author');
      const creator = datacreator !== null ? datacreator.firstChild.textContent : datacreator;
      currentPost.creator = creator;

      const itemPost = { ids: idt, post: currentPost };
      const posts = controlTime === 0 ? [...items, itemPost] : [itemPost, ...items];
      state.feeds[id].content.items = posts.filter((i, idx) => idx < 15);
    }
  });
};
