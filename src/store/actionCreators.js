import * as actionTypes from './actionTypes';
import { database, auth, googleAuthProvider } from '../firebase';
import { REQUESTOR_START } from '../constants/routes';

const motionsRef = database.ref('motions');

export const initMotion = (motion) => (dispatch) => {
  dispatch({ type: actionTypes.START_LOADING });
  return motionsRef.push(motion)
    .then(({ key }) => {
      dispatch({ type: actionTypes.SET_NEW_MOTION_KEY, payload: key });
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

export const joinMotion = ({ key, history } ) => {
  console.log('KEY', typeof key);
  history.push(`${REQUESTOR_START}/?motionkey=${key}`);
  return { type: actionTypes.SET_NEW_MOTION_KEY, payload: key }
};

export const getMotion = (key) => dispatch => {
  dispatch({ type: actionTypes.START_LOADING });
  const result = motionsRef.child(key).once('value')
    .then(snapshot => {
      dispatch({ type: actionTypes.FINISH_LOADING });
      return snapshot.val();
    })
    .catch(({ message }) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: message
      })
    })
  return result;
};

export const throwError = message => ({
  type: actionTypes.SET_ERROR,
  payload: message
});