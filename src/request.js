import parsePosts from "./parsePosts";
import parse from "./parse";

export default (state, id, watchedState, newfeed = false) => {
  const { url } = state.request;
  fetch(`https://allorigins.hexlet.app/get?url=${url}`, { cache: "no-cache" })
  .then(response => {
    if (response.ok) return response.json();
  })
  .then(data => {
    if (data.contents.slice(2, 5)=== 'xml') {  
      return new DOMParser().parseFromString(data.contents, "text/xml");
    }
    throw new Error('no rss');
  })
  .then((value) => {
    if (newfeed) parse(state, url, id, value);
    parsePosts(state, url, id, value);
    state.request.errors = '';
    watchedState.response.status = 'received';
  })
  .catch(e => watchedState.request.errors = e.message);
};
