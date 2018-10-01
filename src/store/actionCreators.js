import { SET_MOTION, START_LOADING, FINISH_LOADING, SIGN_IN, SIGN_OUT, SET_ERROR, DELETE_ERROR, SET_NEW_MOTION_KEY, SET_MOTIONS_ARRAY } from './actionTypes';
import { database, auth, googleAuthProvider } from '../firebase';
// import { persistor } from './';

const motionsRef = database.ref('motions');

export const initMotion = motion => dispatch => {
  dispatch({
    type: START_LOADING
  });
  const { uid } = motion;
  return motionsRef.push(motion)
    .then(({ key }) => {
      dispatch({
        type: SET_NEW_MOTION_KEY,
        payload: { key, uid }
      });
      dispatch({
        type: FINISH_LOADING
      });
      return true;
    })
    .catch(({ message }) => {
      dispatch({
        type: SET_ERROR,
        payload: message
      });
      dispatch({
        type: FINISH_LOADING
      });
      return false;
    });
};

export const attemptSignIn = () => dispatch => {
  dispatch({ type: START_LOADING });
  auth.signInWithPopup(googleAuthProvider)
    .catch(({ message }) => {
      dispatch({
        type: SET_ERROR,
        payload: message
      });
      dispatch({
        type: FINISH_LOADING
      });
    });
};

export const attemptSignOut = () => {
  auth.signOut();
  return { type: START_LOADING };
};

export const deleteAuthError = () => {
  return { type: DELETE_ERROR };
};

// export const startListeningForMotionsListChanges = () => dispatch => {
//       motionsRef.on('child_added', snapshot => {
//         const { uid, displayName, value, time } = snapshot.val();
//         dispatch({
//           type: SET_MOTION,
//           payload: {
//             key: snapshot.key,
//             uid,
//             displayName,
//             value,
//             time
//           }
//         });
//       })
// };

export const startListeningForMotionsListChanges = () => dispatch => {
        motionsRef.on('value', snapshot => {
          // persistor.purge();
          const motionsArray = [];
          Object.keys(snapshot.val()).map(key => {
            motionsArray.push({ ...snapshot.val()[key], key })
          });
          // motionsArray.forEach(item => {
          //   const { uid, displayName, value, time, key } = item;
          //   dispatch({
          //     type: SET_MOTION,
          //     payload: {
          //       key,
          //       uid,
          //       displayName,
          //       value,
          //       time
          //     }
          //   });
          // });
          dispatch({
            type: SET_MOTIONS_ARRAY,
            payload: motionsArray
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