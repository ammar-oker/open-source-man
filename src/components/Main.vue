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
                        <a href="#" class="d-md-none" @click.prevent="$refs.navbar.classList.add('search')">
                            <font-awesome-icon :icon="['fas', 'search']"/>
                        </a>
                    </div>
                    <form role="search">
                        <input type="text" placeholder="search"/>
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

    export default {
        name: 'Main',
        computed: {
            ...mapGetters({
                user: "user",
            })
        },
    }
</script>

