import Vue from 'vue';
import App from './App.vue';
import './style.css';
import VueRouter from "vue-router";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faHome, faPlus, faSearch, faTimes, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import routes from './routes';
import BootstrapVue from "bootstrap-vue";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import * as firebase from "firebase";
import store from './vuex.store';

// Initialize Firebase
const firebaseConfigs = {
  apiKey: "AIzaSyA-nR1xkqaKuXbD4PquQvz8Fx4WiXvjy8c",
  authDomain: "open-source-man.firebaseapp.com",
  databaseURL: "https://open-source-man.firebaseio.com",
  projectId: "open-source-man",
  storageBucket: "open-source-man.appspot.com",
  messagingSenderId: "643673953965",
  appId: "1:643673953965:web:7709c955e1ad52d1f39824",
  measurementId: "G-VJ47T01X0L"
};
firebase.initializeApp(firebaseConfigs);

// Get the user info from database when logged in
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(user.uid);
    docRef.onSnapshot(function(doc) {
      if (doc.exists) {
        store.dispatch("fetchUser", { id: user.uid, ...doc.data() })
            .then(() => store.dispatch("appIsLoaded", true));
      } else {
        console.log("No such user!");
      }
    })
  } else {
    store.dispatch("appIsLoaded", true);
  }

});

// Initialize FontAwesome icons
library.add(faHome);
library.add(faPlus);
library.add(faUser);
library.add(faFacebookSquare);
library.add(faSearch);
library.add(faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Disable production tip
Vue.config.productionTip = false;

// Use Swiper, Router and Bootstrap
Vue.use(VueAwesomeSwiper);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

// Initialize VueRouter
const router = new VueRouter({ routes, mode: 'history' });

new Vue({
  render: h => h(App),
  router,
  store, // Use Vuex store object from ./vuex.store.js
  firebase,
}).$mount('#app');
