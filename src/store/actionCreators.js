import * as actionTypes from './actionTypes';
import { database, auth, googleAuthProvider, timestamp } from '../firebase';
import { MOTIONS, DEALS, HOME } from '../constants/routes';

const motionsRef = database.ref('motions');
const dealsRef = database.ref('deals');

export const initMotion = ({ newMotion, history }) => (dispatch) => {
  dispatch({ type: actionTypes.START_LOADING });
  return motionsRef.push({
    ...newMotion,
    time: {
      ...newMotion.time,
      creationTime: timestamp
    }
  })
    .then(({ key }) => {
      const { operator: { uid } } = newMotion;
      history.push(`${DEALS}/${key}?operator=${uid}`);
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
    return { type: actionTypes.START_LOADING };
};

export const deleteError = () => {
  return { type: actionTypes.DELETE_ERROR };
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
      const { uid, displayName, photoUrl } = user;
      dispatch({ type: actionTypes.FINISH_LOADING });
      dispatch({
        type: actionTypes.SIGN_IN,
        payload: { uid, displayName, photoUrl }
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
  history.push(`${MOTIONS}/${key}`);
};

export const getMotion = (pathname) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  urlRef.once('value')
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
  const { motionReference, requestor } = newDeal;
  dealsRef.child(`/${motionReference}/${requestor.uid}`).set({ ...newDeal, timestamp })
    .then(() => {
        history.push(`${DEALS}/${motionReference}/${requestor.uid}`);
        dispatch({ type: actionTypes.FINISH_LOADING });
      })
    .catch(({ message }) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
      dispatch({ type: actionTypes.FINISH_LOADING });
    });
};

export const checkMotionForRequestorDeals = ({ key, history, uid }) => (dispatch) => {
  dispatch({ type: actionTypes.START_LOADING });
  const result = dealsRef.child(`${key}/${uid}`).once('value')
    .then(snapshot => {
      if(snapshot.exists()){
        const snapVal = snapshot.val();
        const { requestor } = snapVal;
        const isRequestor = uid === requestor.uid;
        if(isRequestor){
          history.push(`${DEALS}/${key}/${uid}`);
          dispatch({ type: actionTypes.FINISH_LOADING });
          return true;
        }
        dispatch({ type: actionTypes.FINISH_LOADING });
        return false;
      } else{
        dispatch({ type: actionTypes.FINISH_LOADING });
        return false;
      }
    })
    .catch(({ message }) => {
      dispatch({ type: actionTypes.FINISH_LOADING });
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
      return false;
    });
    return result;
};

export const getDeal = ({ pathname, history }) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  urlRef.once('value')
    .then((snapshot) => {
      const { key } = snapshot;
      if(snapshot.exists()) {
        const deal = { ...snapshot.val(), key };
        dispatch({
          type: actionTypes.GET_CURRENT_DEAL,
          payload: deal
        });
        dispatch({ type: actionTypes.FINISH_LOADING });
      } else{
        const message = 'This deal has been removed';
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: message
        });
        history.push(HOME);
      }
    })
    .catch(({ message }) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: message
      });
      dispatch({ type: actionTypes.FINISH_LOADING });
    })
}

export const listenForDeals = (pathname) => dispatch => {
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  if(pathname){
    urlRef.on('value', (snapshot) => {
      const snapVal = snapshot.val();
      const deals = [];
      for (let key in snapVal){
        deals.push(snapVal[key]);
      }
      dispatch({
        type: actionTypes.SET_DEALS_ARRAY,
        payload: deals
      });
    })
  } else{
    urlRef.off('value');
  }
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

export const setBid = ({ pathname, value, userStatus }) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  urlRef.child('currentBid').set({
    value,
    authorStatus: userStatus
  })
    .then(() => { dispatch({ type: actionTypes.FINISH_LOADING }) })
    .catch(({message}) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: message
      });
      dispatch({ type: actionTypes.FINISH_LOADING });
  });
};

export const deleteDeal = (pathname) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  urlRef.remove()
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
    });
};

export const acceptBid = ({ pathname, userStatus }) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const urlRef = database.refFromURL(`${process.env.REACT_APP_DB_URL}/${pathname}`);
  urlRef.child('status').set({
    accepted: true
  });
  dispatch({ type: actionTypes.FINISH_LOADING });
};