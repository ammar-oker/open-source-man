<template>
  <div id="app">
    <Header />
    <Main />
    <Footer/>
    <b-modal ref="modal-scoped" id="modal-scoped" centered>
      <h3 class="text-primary text-center brand mt-5 mb-2">Sign in to continue</h3>
      <hr class="mb-5 w-75 mx-auto"/>
      <a href="#" class="btn-face m-b-20">
        <font-awesome-icon :icon="['fab', 'facebook-square']"/>
        Continue with facebook
      </a>

      <button @click="signInWithGoogle" class="btn-google m-b-20">
        <img src="./assets/images/icon-google.png" alt="GOOGLE">
        Continue with Google
      </button>
    </b-modal>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer,
  },
  methods: {
    signInWithGoogle: function () {
      const db = firebase.firestore();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        const docRef = db.collection("users").doc(user.uid);


        docRef.get().then(function(doc) {
          if (!doc.exists) {
            docRef.set({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              jobTitle: '',
              location: '',
              bio: '',
            }).catch(err => {
              //TODO Handle error
              console.log(err)
            });
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });

      })
              .then(() => {
                this.$refs['modal-scoped'].hide()
              })
              .catch(err => {
        //TODO Handle error
        console.log(err);
      });
    }
  }
}
</script>
