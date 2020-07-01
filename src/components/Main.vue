<template>
    <main class="container">

        <div class="row justify-content-center">
            <div class="col-lg-10 col-12">
                <nav class="creative-navbar row" ref="navbar">
                    <div class="links">
                        <router-link exact to="/">
                            <font-awesome-icon :icon="['fas', 'home']"/>
                        </router-link>
                        <router-link v-if="user.loggedIn" exact to="/new">
                            <font-awesome-icon :icon="['fas', 'plus']"/>
                        </router-link>
                        <a v-else href="#" @click.prevent="$bvModal.show('modal-scoped')">
                            <font-awesome-icon :icon="['fas', 'plus']"/>
                        </a>
                        <router-link v-if="user.loggedIn" to="me">
                            <font-awesome-icon :icon="['fas', 'user']"/>
                        </router-link>
                        <a v-else href="#" @click.prevent="$bvModal.show('modal-scoped')">
                            <font-awesome-icon :icon="['fas', 'user']"/>
                        </a>
                        <a href="#" class="d-md-none" @click.prevent="() => {$refs.navbar.classList.add('search'); $refs.searchBox.focus()}">
                            <font-awesome-icon :icon="['fas', 'search']"/>
                        </a>
                    </div>
                    <form role="search" @submit.prevent="() => {$router.push(`/?s=${s}`); $refs.searchBox.blur();}">
                        <input ref="searchBox" type="text" placeholder="search" v-model="s" @input="updateS"/>
                        <a href="#" class="d-md-none" @click.prevent="$refs.navbar.classList.remove('search')">
                            <font-awesome-icon :icon="['fas', 'times']"/>
                        </a>
                    </form>
                </nav>
            </div>
        </div>
        <router-view></router-view>
    </main>
</template>

<script>

    import {mapGetters} from "vuex";
    import { EventBus } from "@/event.bus";

    export default {
        name: 'Main',
        data() {
            return {
                s: "",
            }
        },
        computed: {
            ...mapGetters({
                user: "user",
            })
        },
        methods: {
            updateS: function () {
                EventBus.$emit('sChange', this.s)
            }
        }
    }
</script>

