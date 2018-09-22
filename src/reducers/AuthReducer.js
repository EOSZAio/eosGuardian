import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    email: 'test@test.com',
    password: '12345678',
    error: '',
    code: '',
    user: null,
    loading: false
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
         return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
         return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { 
                ...state, 
                ...INITIAL_STATE
            };
        case LOGIN_USER_FAIL:
            return { 
                ...state, 
                error: action.payload.message, 
                code: action.payload.code,
                loading: false 
            };
        case LOGIN_USER:
            return {
                ...state, 
                loading: true, 
                error: '',
                code: ''
            };
        default: return state;
    }
};

export default AuthReducer;
