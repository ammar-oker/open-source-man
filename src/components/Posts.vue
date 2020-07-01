<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-lg-10 col-12">
<!--                <Categories/>-->
                <ul class="ks-cboxtags">
                    <li v-for="(value, index) in topics"  :key="index">
                        <input type="checkbox" :id="value.title" :value="value.title" @change="getPosts" v-model="selectedTopics">
                        <label :for="value.title">{{value.title}}</label>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row justify-content-around">
            <div class="col-lg-10 col-12">
                <div class="content">
                    <div v-if="loading" class="text-center py-5 w-100">
                        <img class="img-fluid mx-auto" src="../assets/images/loader-blue.svg" alt="loading icon" />
                    </div>
                    <div v-else v-for="(value, index) in filteredPosts" :key="index" class="widget row my-3">
                        <div class="col-md-4 col-12 px-0 ">
                            <router-link :to="`/post/${value.id}`" class="d-block post-thumbnail" :style="`background: url(${value.featuredImage});`"></router-link>
                        </div>
                        <div class="col-md-8 col-12 py-2 ">
                            <router-link :to="`/post/${value.id}`">
                                <h3 class="p-2">{{value.title}}</h3>
                            </router-link>
                            <ul class="post-meta text-dark px-2">
                                <li>By <strong>{{value.author.name}}</strong></li>
                            </ul>
                            <p>{{(value.content)}}</p>
                                <div>Topics
                                    <div class="my-3">
                                        <span v-for="(topic, index) in value.categories" :key="index" class="topic mx-2">{{topic}}</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import {EventBus} from "@/event.bus";

    const stripHtml = (html) => {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    export default {
        name: 'Posts',
        data() {
            return {
                posts: [],
                topics: [],
                selectedTopics: [],
                loading: true,
                s: ""
            }
        },
        methods: {
            getPosts: function () {
                this.posts = [];
                this.loading = true;
                const db = firebase.firestore();
                if(this.selectedTopics.length === 0) {
                    db.collection("posts").limit(10).onSnapshot(snapshot => {
                        let changes = snapshot.docChanges();
                        changes.forEach(change => {
                            if (change.type === "added") {

                                let _content = stripHtml(change.doc.data().content);
                                if (_content.length > 200) _content = _content.slice(0, 150) + '...';
                                this.posts.push({...change.doc.data(), content: _content, id: change.doc.id })
                            }
                        });
                        this.loading = false;
                    });
                } else {
                    db.collection("posts").where('categories', 'array-contains-any', this.selectedTopics)
                        .onSnapshot(snapshot => {
                        let changes = snapshot.docChanges();
                        changes.forEach(change => {
                            if (change.type === "added") {
                                let _content = stripHtml(change.doc.data().content);
                                if (_content.length > 200) _content = _content.slice(0, 150) + '...';
                                this.posts.push({...change.doc.data(), content: _content})
                            }
                        });
                        this.loading = false;
                    });
                }
            }
        },
        created() {
            const db = firebase.firestore();
            db.collection('topics').onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if (change.type === "added") {
                        this.topics.push(change.doc.data());
                    }
                })
            });
            this.getPosts();
            EventBus.$on('sChange', e => {
                this.s = e;
            })
        },
        watch: {
            updateQuery() {
                this.s = this.$route.query.s;
            }
        },
        computed: {
            updateQuery() {
                return this.$route.query.s;
            },
            filteredPosts() {
                return this.posts.filter(post => {
                    return post.title.match(this.s)
                });
            }
        },
    }
</script>

