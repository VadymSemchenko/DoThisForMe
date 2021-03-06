import * as actionTypes from './actionTypes';
import { database, auth, googleAuthProvider, timestamp } from '../firebase';
import { OPERATOR, REQUESTOR } from '../constants/routes';

const motionsRef = database.ref('motions');
const dealsRef = database.ref('deals');

export const initMotion = ({ newMotion, history }) => (dispatch) => {
  dispatch({ type: actionTypes.START_LOADING });
  return motionsRef.push(newMotion)
    .then(({ key }) => {
      const { operatorID, deadline } = newMotion;
      history.push(`${OPERATOR}?motionID=${key}&operatorID=${operatorID}&deadline=${deadline}`);
      dispatch({ type: actionTypes.FINISH_LOADING });
    })
    .catch(({ message }) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
      dispatch({ type: actionTypes.FINISH_LOADING });
    });
};

export const attemptSignIn = () => (dispatch) => {
  dispatch({ type: actionTypes.START_LOADING });
  auth.signInWithPopup(googleAuthProvider)
    .catch(({ message }) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
      dispatch({ type: actionTypes.FINISH_LOADING });
    });
};

export const attemptSignOut = () => {
    auth.signOut();
    return { type: actionTypes.SIGN_OUT };
};

export const startListeningForMotionsListChanges = () => (dispatch) => {
  motionsRef.on('value', (snapshot) => {
    const motionsArray = [];
    const snapshotValue = snapshot.val();
    for (let key in snapshotValue) {
      motionsArray.push({
        ...snapshotValue[key],
        key,
      });
    }
    dispatch({
      type: actionTypes.SET_MOTIONS_ARRAY,
      payload: motionsArray,
    });
  });
};

export const startListeningToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const { uid, displayName } = user;
      dispatch({ type: actionTypes.FINISH_LOADING });
      dispatch({
        type: actionTypes.SIGN_IN,
        payload: {
          userID: uid,
          userName: displayName
        }
      });
    } else {
      dispatch({ type: actionTypes.FINISH_LOADING });
      dispatch({ type: actionTypes.SIGN_OUT });
    }
  });
};

export const removeMotion = (key) => {
  motionsRef.child(key).remove();
};

export const joinMotion = ({ key, history, uid } ) => dispatch => {
  history.push(`${REQUESTOR}?motionID=${key}`);
};

export const getMotion = (motionID) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  motionsRef.child(motionID).once('value')
    .then((snapshot) => {
      const { key } = snapshot;
      dispatch({ type: actionTypes.GET_NEW_MOTION_ITEM, payload:{ ...snapshot.val(), key }});
      dispatch({ type: actionTypes.FINISH_LOADING });
    })
    .catch(({ message }) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: message
      });
      dispatch({
        type: actionTypes.FINISH_LOADING
      });
    })
}

export const throwError = (message) => ({
  type: actionTypes.SET_ERROR,
  payload: message
});

export const initDeal = ({ newDeal, history }) => (dispatch) => {
  dispatch({
    type: actionTypes.START_LOADING
  });
  const { motionReference, requestorID } = newDeal;
  dealsRef.child(`/${motionReference}/${requestorID}`).set({ ...newDeal, timestamp, operatorBid: '' })
    .then(() => {
        history.push(`${REQUESTOR}?motionID=${motionReference}&requestorID=${requestorID}`);
        dispatch({ type: actionTypes.FINISH_LOADING });
      })
    .catch(({ message }) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
      dispatch({ type: actionTypes.FINISH_LOADING });
    });
};
export const checkMotionForRequestorDeals = ({ key, userID }) => (dispatch) => {
  dispatch({ type: actionTypes.START_LOADING });
  dispatch({ type: actionTypes.START_CHECKING_DEALS })
  dealsRef.child(`${key}/${userID}`).on('value', snapshot => {
    if(snapshot.exists()){
      const snapVal = snapshot.val();
      const { requestorID } = snapVal;
      const isRequestor = userID === requestorID;
      if(isRequestor){
        dispatch({
          type: actionTypes.GET_CURRENT_DEAL,
          payload: snapVal
         });
        dispatch({ type: actionTypes.FINISH_LOADING });
        dispatch({ type: actionTypes.FINISH_CHECKING_DEALS });
        return true;
      }
      dispatch({ type: actionTypes.FINISH_LOADING });
      dispatch({ type: actionTypes.FINISH_CHECKING_DEALS });
      return false;
    } else{
      dispatch({ type: actionTypes.FINISH_LOADING });
      dispatch({ type: actionTypes.FINISH_CHECKING_DEALS });
      return false;
    }
  });
};

export const startListeningForDeals = (motionID = '') => dispatch => {
    if(!!motionID) {
      dealsRef.child(motionID).on('value', (snapshot) => {
        if(snapshot.exists()) {
          const snapVal = snapshot.val();
          const deals = [];
          for (let key in snapVal){
            deals.push(snapVal[key]);
          }
          dispatch({
            type: actionTypes.SET_DEALS_ARRAY,
            payload: deals
          });
        };
      })
    } else {
      throwError('Select a motion!');
    }
};

export const stopListeningForDeals = (motionID) => {
  dealsRef.child(motionID).off('value')
};

export const unsetNewMotionItem = () => ({
  type: actionTypes.UNSET_NEW_MOTION_ITEM
});

export const unsetCurrentDeal = () => ({
  type: actionTypes.UNSET_CURRENT_DEAL
});

export const listenToDealStatusChanges = (pathname) => dispatch => {
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  if(pathname){
    urlRef.on('value', (snapshot) => {
      if(!snapshot.exists()){
        const message = 'This deal has been removed';
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: message
        })
      }
      const snapVal = snapshot.val();
      dispatch({
        type: actionTypes.GET_CURRENT_DEAL,
        payload: snapVal
      });
    })
  } else{
    urlRef.off('value');
  }
};

export const updateBid = (args) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const { motionReference, requestorID, ...rest } = args;
  dealsRef.child(`${motionReference}/${requestorID}`).update(rest)
    .then(() => { dispatch({ type: actionTypes.FINISH_LOADING }) })
    .catch(({message}) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: message
      });
      dispatch({ type: actionTypes.FINISH_LOADING });
  });
};

export const deleteDeal = ({ motionReference, requestorID }) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  dealsRef.child(`${motionReference}/${requestorID}`).remove()
    .then(() => {
      dispatch({ type: actionTypes.FINISH_LOADING });
    })
    .catch(({ message }) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: message
      });
      dispatch({
        type: actionTypes.FINISH_LOADING
      });
    })
};

export const acceptBid = ({ dealReference, finalBid, motionReference }) => dispatch => {
  dealsRef.child(`${motionReference}/${dealReference}`).update({
    accepted: true,
    finalBid
  })
    .then(() => dispatch({ type: actionTypes.FINISH_LOADING }))
    .catch(({ message }) => throwError(message));
};

export const unsetDeals = () => ({
  type: actionTypes.SET_DEALS_ARRAY,
  payload: []
});

export const deleteError = () => {
  return { type: actionTypes.DELETE_ERROR };
}

export const selectLang = code => ({
  type: actionTypes.SELECT_LANG,
  payload: code
});