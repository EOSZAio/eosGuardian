import { 
  GET_ACCOUNT_BC_DATA_SUCCESS
} from '../actions/types';

const init = {}

export default (state = init, action) => {
  switch (action.type) {

    case GET_ACCOUNT_BC_DATA_SUCCESS:
      //return { ...state, [action.payload.uid]: action.payload.data };
      return { ...state, [action.payload.uid]: action.payload.data };
    default : return state;
  }
};
