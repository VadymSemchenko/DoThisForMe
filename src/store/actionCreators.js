import * as actionTypes from './actionTypes';
import { database, auth, googleAuthProvider } from '../firebase';
// import { persistor } from './';

const motionsRef = database.ref('motions');

export const initMotion = (motion) => (dispatch) => {
  const { uid } = motion;
  dispatch({ type: actionTypes.START_LOADING });
  return motionsRef.push(motion)
    .then(({ key }) => {
      dispatch({ type: actionTypes.SET_NEW_MOTION_KEY, payload: { key, uid } });
      dispatch({ type: actionTypes.FINISH_LOADING });
      return true;
    })
    .catch(({ message }) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: message });
      dispatch({ type: actionTypes.FINISH_LOADING });
      return false;
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

export const deleteAuthError = () => {
  return { type: actionTypes.DELETE_ERROR };
};

export const startListeningForMotionsListChanges = () => (dispatch) => {
  motionsRef.on('value', (snapshot) => {
    // persistor.purge();
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
