import { 
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';


const init = {};

export default (state = init, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      console.log(action);
      return action.payload;
    
      default : return state;
  }
};

