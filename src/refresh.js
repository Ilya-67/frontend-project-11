import request from './request';
import watchedState from './watcher';

const refresh = (state, url, id) => {
  state.response.status = '';
  request(state, url, id, watchedState(state));
};

export default refresh;
