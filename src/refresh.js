import onChage from 'on-change';
import render from "./render";
import request from './request';

const refresh = (state, url, id) => {
  const watchedState = onChage(state, (path, value) => {
    switch (path) {
      case 'request.errors':
        if (value === 'network error') state.feedBackMessage = 'netError';
        break;
      case 'response.status':
        if (value === 'received') state.feedBackMessage = 'viewing';
        break;
      default:
        break;
    }
    render(state);
  });
  request(state, url, id, watchedState);
  watchedState.response.status = 'viewing';
};

export default refresh;
