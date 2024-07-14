import request from './request';
import watchedState from './watcher';

const refresh = (state, url, id) => {
  state.response.status = '';
  clearTimeout(state.feeds[id].timer);
  state.feeds[id].timer = setTimeout(refresh, 5000, state, url, id);
  request(state, url, id, watchedState(state));
};

export default refresh;
