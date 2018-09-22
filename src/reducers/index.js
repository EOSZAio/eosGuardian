import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AccountsReducer from './AccountsReducer';
import AccountFormReducer from './AccountFormReducer';
import BlockChainReducer from './BlockChainReducer';
import DataListReducer from './DataListReducer';

export default combineReducers({
    auth: AuthReducer,
    accountForm: AccountFormReducer,
    accounts: AccountsReducer,
    blockChainData: BlockChainReducer
    notification: DataListReducer;
});
