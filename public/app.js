const log = console.log;

document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  log(app);

  const db = firebase.firestore();
  const mypost = db.collection('posts').doc('firstpost');

  mypost.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

});


// Google Login
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      log(user);

      $('#user').text(`Hello ${user.displayName}`);
    })
    .catch(log());
}

$('#google_login').click(() => {
  googleLogin();
});

// Google login