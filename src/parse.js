import refresh from "./refresh";

export default (responseDocs, state, url, id) => {
  state.feeds[id] = {};
  state.feeds[id].timer = setInterval(refresh, 60000, state, url, id);
  state.feeds[id].url = `${url}`;
  state.feeds[id].content = {};
  const title = responseDocs.querySelector('title');
  state.feeds[id].content.feedTitle = title.firstChild.textContent ?? title.textContent;
  const description = responseDocs.querySelector('description');
  state.feeds[id].content.feedDescription = description.firstChild.textContent ?? description.textContent;
  const items = responseDocs.querySelectorAll('item');
  state.feeds[id].content.items = {};
  items.forEach((item, index) => {
    const idt = `${id}.${index}`;
    state.feeds[id].content.items[idt] = {};
    const titlePost = item.querySelector('title').textContent ?? item.querySelector('title').firstChild.textContent;
    state.feeds[id].content.items[idt].title = titlePost;
    const descriptionPost =  item.querySelector('description').textContent ?? item.querySelector('description').firstChild.textContent;
    state.feeds[id].content.items[idt].description = descriptionPost;
    const pubDate = item.querySelector('pubDate').textContent;
    state.feeds[id].content.items[idt].pubDate = pubDate;
    const link = item.querySelector('link').firstChild.textContent;
    state.feeds[id].content.items[idt].link = link;
    const datacreator = item.querySelector('creator') ?? item.querySelector('author');
    const creator = datacreator !== null ? datacreator.firstChild.textContent : datacreator;
    state.feeds[id].content.items[idt].creator = creator;    
  });
};
  