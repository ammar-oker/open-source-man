<template>
    <div class="row justify-content-center post">
        <div class="col-lg-10 col-12">
            <div class="profile-wrapper">
                <div class="profile-block border p-3">
                    <div class="img-block mx-auto position-relative">
                        <img :src="profile.photo" class="img-fluid" alt="">
                        <div class="image-input">
                    <span class="placeholder">
                      Change Photo
                    </span>
                            <input class="file-input" ref="fileInput" type="file"
                                   accept="image/png, image/jpeg, image/gif"/>
                        </div>
                    </div>
                    <h1 class="text-center mt-4">{{ profile.name }}</h1>
                    <h5 class="text-center mb-4 text-primary">{{ profile.jobTitle }}</h5>
                    <form class="my-5">
                        <div v-if="edit" class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-group row  justify-content-center">
                                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-10 col-12">
                                        <input id="name" type="text" v-model="profile.name"
                                               class="form-control-plaintext">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group row  justify-content-center">
                                    <label for="job-title" class="col-sm-2 col-form-label">Job Title</label>
                                    <div class="col-sm-10 col-12">
                                        <input id="job-title" type="text" class="form-control-plaintext"
                                               v-model="profile.jobTitle">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-group row  justify-content-center">
                                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-10 col-12">
                                        <input id="email" type="email" disabled class="form-control-plaintext"
                                               v-model="profile.email">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group row  justify-content-center">
                                    <label for="location" class="col-sm-2 col-form-label">Location</label>
                                    <div class="col-sm-10 col-12">
                                        <input type="text" id="location" :disabled="!edit"
                                               class="form-control-plaintext"
                                               v-model="profile.location">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="textarea">Bio</label>
                            <textarea spellcheck="false" :disabled="!edit" class="form-control-plaintext p-3"
                                      id="textarea" rows="4"
                                      @input="handleInput" v-model="profile.bio"></textarea>
                        </div>

                        <div v-if="edit" class="ml-auto" style="width: fit-content">
                            <button type="button" @click="edit = false" class="ml-auto mx-3 btn-light">Cancel</button>
                            <button type="button" :disabled="loading" class="ml-auto mx-3" @click="updateProfile">
                                <span v-if="!loading">Save</span>
                                <img v-else style="width: 35px" src="../assets/images/loader.svg" alt="loading icon" />
                            </button>
                        </div>
                        <div v-else class="ml-auto" style="width: fit-content">
                            <button type="button" @click="edit = true" class="ml-auto mx-3">Edit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../vuex.store';
    import firebase from 'firebase';

    String.prototype.lines = function () {
        return this.split(/\r*\n/);
    };
    String.prototype.lineCount = function () {
        return this.lines().length;
    };

    export default {
        name: 'Profile',
        data() {
            return {
                loading: false,
                edit: false,
                profile: store.state.user.data
            }
        },
        watch: {
            userInfo() {
                this.profile = store.state.user.data
            }
        },
        methods: {
            handleInput: function (e) {
                this.setRowsNumber(e.target);
            },
            setRowsNumber: function (element) {
                if (this.profile.bio.lineCount() > 4) {
                    element.style.height = `${element.scrollHeight}px`;
                }
            },
            updateProfile: function () {
                this.loading = true;
                const db = firebase.firestore();
                const docRef = db.collection("users").doc(this.profile.id);
                docRef.set({ ...this.profile })
                    .then(() => {
                        this.loading = false;
                        this.edit = false;
                    })
                    .catch(err => {
                    //TODO Handle error
                    console.log(err)
                });
            }
        },
        computed: {
            userInfo () {
                return store.state.user.data
            }
        },

        mounted() {
            this.setRowsNumber(document.getElementById('textarea'));
        }
    }
</script>

