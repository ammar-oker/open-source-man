<template>
    <div class="row justify-content-center">
        <div class="col-lg-10 col-12">
            <form class="post-form" @submit.prevent="uploadPost">
                <h2 class="text-primary my-4">New Post</h2>
                <input id="title" class="d-block w-100 title" type="text" v-model="post.title" placeholder="Title">
                <div class="image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                    <span v-if="!imageData" class="placeholder">
                      Choose an Image
                    </span>
                    <input class="file-input" ref="fileInput" type="file" accept="image/png, image/jpeg, image/gif"
                           @input="onSelectFile">
                </div>
                <ul class="ks-cboxtags">
                    <li v-for="(value, index) in topics" :key="index">
                        <input type="checkbox" :id="value.title" :value="value.title" v-model="post.categories">
                        <label :for="value.title">{{value.title}}</label>
                    </li>
                    <li>
                        <input
                                ref="topicTextBox"
                                v-model="topicText"
                                :class="open"
                                placeholder="Enter topic title"
                                type="text" id="topicText">
                    </li>
                    <li>
                        <input type="button" @click="handleNewTopic" id="newTopic" style="opacity: 0">
                        <label for="newTopic" class="bg-primary text-light">
                            <span v-if="this.open !== 'open'">Add a new topic</span>
                            <span v-else>Create</span>
                        </label>
                    </li>
                </ul>
                <MCE @mceUpdate="updateContent"/>
                <p class="text-danger py-4 text-center">{{error}}</p>
                <p class="text-success py-4 text-center">{{message}}</p>
                <button type="submit" :disabled="loading">
                    <span v-if="!loading">Post</span>
                    <img v-else style="width: 35px" src="../assets/images/loader.svg" alt="loading icon"/>
                </button>
            </form>

        </div>
    </div>
</template>

<script>
    import MCE from "@/components/MCE";
    import firebase from 'firebase';
    import store from '../vuex.store';

    function getDefaultData() {
        return {
            imageData: null,
            post: {
                content: '',
                title: '',
                categories: [],
            },
            error: '',
            loading: false,
            message: '',
            topics: [],
            open: '',
            topicText: '',
        }
    }

    export default {
        name: 'AddPost',
        components: {
            MCE,
        },
        data() {
            return getDefaultData()
        },
        methods: {
            chooseImage() {
                this.$refs.fileInput.click()
            },

            onSelectFile() {
                const input = this.$refs.fileInput;
                const files = input.files;
                if (files && files[0]) {
                    const reader = new FileReader;
                    reader.onload = e => {
                        this.imageData = e.target.result;
                    };
                    reader.readAsDataURL(files[0]);
                    this.$emit('input', files[0]);
                }
            },
            updateContent(content) {
                this.post.content = content;
            },
            uploadPost() {
                const input = this.$refs.fileInput;
                const files = input.files;
                const db = firebase.firestore();

                this.error = '';

                let error = false;
                if (!this.post.title.length) {
                    error = true;
                    this.error = 'title is not allowed to be empty';
                }
                if (!this.post.categories.length) {
                    error = true;
                    this.error = 'select at least one category or create new one';
                }
                if (!this.post.content.length) {
                    error = true;
                    this.error = 'content is not allowed to be empty';
                }
                if (!files.length) {
                    error = true;
                    this.error = 'Please select an featured image';
                }
                if (!error) {
                    this.loading = true;
                    const _this = this;
                    const post = this.post;
                    const attachmentsRef = firebase.storage().ref().child(`/attachments/${files[0].name}`);
                    attachmentsRef.put(files[0]).then(function (snapshot) {
                        snapshot.ref.getDownloadURL().then(url => {
                            db.collection('posts').doc().set({
                                ...post,
                                featuredImage: url,
                                author: {
                                    id: store.state.user.data.id,
                                    name: store.state.user.data.name
                                },
                                createdAt: Date.now()
                            }).then(() => {
                                window.location.reload();
                                _this.loading = false;
                                _this.message = 'Post uploaded successfully';
                            })
                        });
                    });
                }

            },
            handleNewTopic() {
                if (this.open === 'open') {
                    const db = firebase.firestore();
                    if (this.topicText.length) {
                        db.collection('topics').doc().set({
                            title: this.topicText
                        }).then(() => {
                            this.open = '';
                            this.topicText = '';
                        })
                    }
                } else {
                    this.open = 'open';
                }
            },
            resetData: function () {
                this.$data = getDefaultData();
            }
        },
        created() {
            if (!this.$store.state.user.loggedIn) {
                this.$router.push('/');
            }
            const db = firebase.firestore();
            db.collection('topics').onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === "added") {
                        this.topics.push(change.doc.data());
                    }
                })
            });
        },
    }
</script>

