import * as firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/auth";

export const initializeLogInFrameWork = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      return signedInUser;
      console.log(displayName, photoURL, email);
    })
    .catch(err => {
      console.log(err);
    })
  }

  export const handleFbSignIn = ()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      return user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
    const signedOutUser = {
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
    }
    return signedOutUser;
}).catch(err =>{

});
  }


//   export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//     const newUserInfo = {...user};
//     newUserInfo.error = '';
//     newUserInfo.success = true;
//     setUser(newUserInfo);
//     updateUserName(user.name);
//     })
//     .catch( error => {
//     // Handle Errors here.
//     const newUserInfo = {...user};
//     newUserInfo.error = error.message;
//     newUserInfo.success = false;
//     setUser(newUserInfo);
//     });
//   }

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//       .then(res=>{
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);
//       console.log('sign in user info' ,res.user);
//       })
//       .catch(function(error) {
//         // Handle Errors here.
//         const newUserInfo = {...user};
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//       });
// }

// const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name
//     }).then(function() {
//       console.log('User Name Updated Successfully');
//     }).catch(function(error) {
//       console.log(error);
//     });
//   }