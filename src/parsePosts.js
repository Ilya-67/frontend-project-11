export default (state, id, responseDocs) => {
  const itemsDoc = responseDocs.querySelectorAll('item');
  const controlTime = state.feeds[id].lastTime;
  itemsDoc.forEach((item, index) => {
    const items = state.feeds[id].content.items;
    const pubDate = item.querySelector('pubDate').textContent;
    if (index === 0) state.feeds[id].lastTime = pubDate;
    if (new Date(pubDate) > new Date(controlTime)) {
      const idt = `${id}.${new Date(pubDate).getTime()}`;
      const itPost = {};
      const titlePost = item.querySelector('title').textContent ?? item.querySelector('title').firstChild.textContent;
      itPost.title = {};
      itPost.title.text = titlePost;
      itPost.title.class = 'fw-bold';
      const descriptionPost =  item.querySelector('description').textContent ?? item.querySelector('description').firstChild.textContent;
      itPost.description = descriptionPost;
      itPost.pubDate = pubDate;
      const link = item.querySelector('link').firstChild.textContent;
      itPost.link = link;
      const datacreator = item.querySelector('creator') ?? item.querySelector('author');
      const creator = datacreator !== null ? datacreator.firstChild.textContent : datacreator;
      itPost.creator = creator;
      const result = {ids: idt, post: itPost};
      state.feeds[id].content.items = controlTime === 0 ? [...items, result] : [result, ...items ];
      state.feeds[id].content.items = state.feeds[id].content.items.filter((i, index) => index < 15);
    }  
  });
};
