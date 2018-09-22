import firebase from 'firebase';
import _ from 'lodash';
//import { getAccountInfo } from '../utils/eosio-client';
import { getAccountInfo } from '../utils/eosjs-client';
import { Actions } from 'react-native-router-flux';

import { 
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNT_UPDATE,
  CHECK_ACCOUNT_ON_BC,
  CHECK_ACCOUNT_ON_BC_FAIL,
  ACCOUNT_ADD,
  GET_ACCOUNT_BC_DATA_SUCCESS
 } from './types';

 export const accountUpdate = ({ prop, value }) => {
  return {
    type: ACCOUNT_UPDATE,
    payload: { prop, value }
  };
};

export const accountsBCFetch = (accountName) => {
  return (dispatch) => {
    let promise = getAccountInfo(accountName);
    promise.then(resp => {
      dispatch({ type: GET_ACCOUNT_BC_DATA_SUCCESS, payload: resp.data });
    });
  };
};

export const accountsFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/accounts`)
    .on('value', snapshot => {
      dispatch({ type: ACCOUNTS_FETCH_SUCCESS, payload: snapshot.val() });
  
      for (var uid in snapshot.val()) {
        // skip loop if the property is from prototype
        if (!snapshot.val().hasOwnProperty(uid)) continue;
    
        var obj = snapshot.val()[uid];
        getAccountInfo(obj.accountName, uid)
        .then(resp => {
              //debugger;
             
              const payload = {
                uid: resp.uid,
                data: resp.data
              }
              console.log('resp', resp);
              dispatch({ type: GET_ACCOUNT_BC_DATA_SUCCESS, payload });
            });

        /*for (var prop in obj) {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;
    
            // your code
            console.log("data",uid + " " + prop + " = " + obj[prop]);
            let promise = getAccountInfo(obj[prop]);
            promise.then(resp => {
              console.log("uid:", uid);
              const payload = {
                uid: uid,
                data: resp.data
              }
              dispatch({ type: GET_ACCOUNT_BC_DATA_SUCCESS, payload });
            });
        }*/
      }
    });
  };
};

export const accountAdd = ({ accountName }) => {  //passing in {accountName: andreas}
  return (dispatch) => {
    dispatch({type: CHECK_ACCOUNT_ON_BC});
    let promise = getAccountInfo(accountName);
    promise.then(data => {
      //console.log(JSON.stringify(data))
      //dispatch({ type: ACCOUNTS_FETCH_SUCCESS, payload: data.data });
      //debugger;
      if (data.response.data.account_name) {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/accounts`)
        .push({ accountName })
        .then(() => { 
          dispatch({ type: ACCOUNT_ADD });
          Actions.listAccounts();
        });
      }
      
    }).catch((resp) => {
      handleError(dispatch, resp);
    });
    

  };
};


const handleError = (dispatch, resp) => {
  console.log("ERROR", resp);
  dispatch({
      type: CHECK_ACCOUNT_ON_BC_FAIL,
      payload: resp
  });
  //this.setState({ error: errorDetail.message, code: errorDetail.code, loading: false });
};