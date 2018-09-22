import { 
  ACCOUNT_UPDATE,
  ACCOUNT_CREATE,
  ACCOUNT_ADD,
  CHECK_ACCOUNT_ON_BC,
  CHECK_ACCOUNT_ON_BC_FAIL
} from '../actions/types';


const init = {
  accountName: '',
  loading: false,
  error: '',
  code:''
};

export default (state = init, action) => {
  switch (action.type) {
    case ACCOUNT_CREATE: return init;
    case ACCOUNT_ADD: return init;
    case CHECK_ACCOUNT_ON_BC:
      return {...init, loading: true };
    case CHECK_ACCOUNT_ON_BC_FAIL:
      return { 
        ...state, 
        error: "Account does not exist or contains errors.", 
        code: action.payload.message,
        loading: false 
       };

    case ACCOUNT_UPDATE:
      /*action.payload === {prop: 'name, value: 'name'} this is our object
      [action.payload.prop]: action.payload.value
      same as below
      const newState = {};
      newState[action.payload.prop] = action.payload.value;
      */
      return { ...state, [action.payload.prop]: action.payload.value };
    
      default : return state;
  }
};




