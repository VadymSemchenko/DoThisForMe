import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAvrm6_Db0J_2p6snwK-HGDTUGf5S5VNaM",
    authDomain: "squire-delivery.firebaseapp.com",
    databaseURL: "https://squire-delivery.firebaseio.com",
    projectId: "squire-delivery",
    storageBucket: "squire-delivery.appspot.com",
    messagingSenderId: "541308684378"
  };
  firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
// export const auth = firebase.auth();
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();