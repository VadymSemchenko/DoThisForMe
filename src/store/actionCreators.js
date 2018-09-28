import { SET_MOTION } from './actionTypes';
import { database } from '../firebase';

const motionsRef = databse.ref('motions');

export const initMotion = (text, time) => {

}

export const startListeningForMotionChanges = () => {
    return (dispatch) => {
      messagesRef.on('child_added', (snapshot) => {
        dispatch(addMessage(snapshot.key, snapshot.val()));
      });

      messagesRef.on('child_changed', (snapshot) => {
        dispatch(addMessage(snapshot.key, snapshot.val()));
      });

      messagesRef.on('child_removed', (snapshot) => {
        dispatch(deleteMessage(snapshot.key));
      });
    };
  };