import parsePosts from "./parsePosts";
import parse from "./parse";

export default (state, url, id, watchedState, newfeed = false) => {
  fetch(`https://allorigins.hexlet.app/get?url=${url}`, { cache: "no-cache" })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('network error');
  })
  .then(data => {
    if (data.contents.slice(2, 5)=== 'xml') {  
      return new DOMParser().parseFromString(data.contents, "text/xml"); 
    } 
    watchedState.response.status = 'no rss';
    throw new Error('no rss');
  })
  .then((value) => {
    if (newfeed) parse(state, url, id, value);
    parsePosts(state, url, id, value);
    watchedState.response.status = 'received';
  })
  .catch(e => watchedState.request.errors = e.message);  
};
