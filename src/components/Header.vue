<template>
    <header class="container home-header">
        <div class="row justify-content-around">
            <div class="col-lg-8 col-12">
                <div class="row justify-content-between py-5">
                    <h1 class="brand mx-3">O.S Man</h1>
                    <span class=" text-light mx-3 d-flex bg-light text-primary px-2 rounded">
                        <font-awesome-icon class="mx-2 my-auto" :icon="['fas', 'user']"/>
                        <router-link v-if="user.loggedIn" to="me" class="my-auto">{{user.data.name}}</router-link>
                    <a href="#" v-else @click.prevent="$bvModal.show('modal-scoped')" class="text-light">Sign in</a>
                </span>
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

    export default {
        name: 'Header',
        computed: {
            ...mapGetters({
                user: "user",
            })
        },
    }
</script>

