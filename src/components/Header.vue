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
                        <router-link :to="`/user/${user.data.id}`">Profile</router-link>
                        <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
                    </b-dropdown>
                    <button v-else class="text-primary bg-light mx-3" @click.prevent="$bvModal.show('modal-scoped')">
                        <font-awesome-icon class="mx-2 my-auto text-primary" :icon="['fas', 'user']"/>
                        SignIn
                    </button>
                </div>
            </div>
        </div>
        <svg class="svg">
            <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                <path
                        d="M0,1 L0.056,0.896 C0.111,0.793,0.222,0.582,0.333,0.583 C0.444,0.582,0.556,0.793,0.667,0.792 C0.778,0.793,0.889,0.582,0.944,0.479 L1,0.375 L1,0 L0.944,0 C0.889,0,0.778,0,0.667,0 C0.556,0,0.444,0,0.333,0 C0.222,0,0.111,0,0.056,0 L0,0">
                </path>
            </clipPath>
        </svg>
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

