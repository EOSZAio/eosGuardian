import { 
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS
} from '../actions/types';


const init = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = init, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      /*action.payload === {prop: 'name, value: 'name'} this is our object
      [action.payload.prop]: action.payload.value
      same as below
      const newState = {};
      newState[action.payload.prop] = action.payload.value;
      */
      return { ...state, [action.payload.prop]: action.payload.value };
    
      case EMPLOYEE_CREATE:
       return init;

      case EMPLOYEE_SAVE_SUCCESS:
       return init;
      
      case EMPLOYEE_DELETE_SUCCESS:
        return init;
    
      default : return state;
  }
};

