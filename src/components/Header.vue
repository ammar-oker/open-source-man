<template>
    <header class="container home-header">
        <div class="row justify-content-around">
            <div class="col-lg-8 col-12">
                <div class="row justify-content-between py-5">
                    <h1 class="brand mx-3">O.S Man</h1>
                    <b-dropdown v-if="user.loggedIn" size="sm" variant="light" class="mx-3" no-caret>
                        <template v-slot:button-content>
                            <font-awesome-icon class="mx-2 my-auto text-primary" :icon="['fas', 'user']"/>
                            <span v-if="user.loggedIn" class="my-auto text-primary">{{user.data.name}}</span>
                        </template>
                        <b-dropdown-item href="#" @click.prevent="">
                            <router-link :to="`/user/${user.data.id}`">Profile</router-link>
                        </b-dropdown-item>
                        <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
                    </b-dropdown>
                    <button v-else class="text-primary bg-light mx-3" @click.prevent="$bvModal.show('modal-scoped')">
                        <font-awesome-icon class="mx-2 my-auto text-primary" :icon="['fas', 'user']"/>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from "vuex";
    import firebase from 'firebase';
    import store from '../vuex.store';

    export default {
        name: 'Header',
        methods: {
            logout: function () {
                firebase.auth().signOut()
                .then(() => {
                    store.dispatch("logOut")
                });
            }
        },
        computed: {
            ...mapGetters({
                user: "user",
            })
        },
    }
</script>

