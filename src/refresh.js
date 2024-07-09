import parsePosts from "./parsePosts";
import render from "./render";

const refresh = (state, url, id) => {
  fetch(`https://allorigins.hexlet.app/get?url=${url}`, { cache: "no-cache" })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    const responseDocs = new DOMParser().parseFromString(data.contents, "text/xml");
    parsePosts(responseDocs, state, url, id);
  });  
  render(state);  
};
export default refresh;