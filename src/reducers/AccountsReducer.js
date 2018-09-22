import { 
  ACCOUNTS_FETCH_SUCCESS,
} from '../actions/types';

const init = {}

export default (state = init, action) => {
  switch (action.type) {
    case ACCOUNTS_FETCH_SUCCESS:
      return action.payload;

    default : return state;
  }
};


