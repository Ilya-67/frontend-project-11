import request from './request';
import watchedState from './watcher';

const refresh = (state, id) => {
  clearTimeout(state.feeds[id].timer);
  state.feeds[id].timer = setTimeout(refresh, 5000, state, id);
  request(state, id, watchedState(state));
};

export default refresh;
