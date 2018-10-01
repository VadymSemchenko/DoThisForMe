import { SET_MOTION, START_LOADING, FINISH_LOADING, SIGN_IN, SIGN_OUT } from './actionTypes';
import { database, auth, googleAuthProvider } from '../firebase';

const motionsRef = database.ref('motions');

export const initMotion = motion => {
  motionsRef.push(motion);
}

export const attemptSignIn = () => {
  auth.signInWithPopup(googleAuthProvider).catch(err => console.log(err));
  return { type: START_LOADING };
};

export const attemptSignOut = () => {
  auth.signOut();
  return { type: START_LOADING };
};

export const startListeningForMotionChanges = () => dispatch => {
      motionsRef.on('child_added', snapshot => {
        const { uid, displayName, value, time } = snapshot.val();
        dispatch({
          type: SET_MOTION,
          payload: {
            key: snapshot.key,
            uid,
            displayName,
            value,
            time
          }
        });
      })
};

export const startListeningToAuthChanges = () => dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: FINISH_LOADING });
        const { uid, displayName, photoUrl } = user;
        dispatch({
          type: SIGN_IN,
          payload: { uid, displayName, photoUrl }
        });
      } else {
        dispatch({ type: FINISH_LOADING });
        dispatch({ type: SIGN_OUT });
      }
    });
  };