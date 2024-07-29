export default (state, url, idFeed, responseDocs, newFeed = false) => {
  if (newFeed) {
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
  } else {
    clearTimeout(state.feeds[idFeed].timer);
  }
  const itemsDoc = responseDocs.querySelectorAll('item');
  const controlTime = state.feeds[idFeed].lastTime;
  itemsDoc.forEach((item, index) => {
    const { items } = state.feeds[idFeed].content;
    const pubDate = item.querySelector('pubDate').textContent;
    if (index === 0) state.feeds[idFeed].lastTime = pubDate;
    if (new Date(pubDate) > new Date(controlTime)) {
      const idt = `${idFeed}.${new Date(pubDate).getTime()}`;
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
      state.feeds[idFeed].content.items = posts.filter((i, idx) => idx < 15);
    }
  });
};
