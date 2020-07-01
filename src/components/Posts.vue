<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-lg-10 col-12">
<!--                <Categories/>-->
                <ul class="ks-cboxtags">
                    <li>
                        <input type="checkbox" id="checkboxOne" value="Rainbow Dash 0" @change="getPosts" v-model="topics">
                        <label for="checkboxOne">Topic 1</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxTwo" value="Rainbow Dash 1"  @change="getPosts" v-model="topics">
                        <label for="checkboxTwo">Topic 2</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxThree" value="Rainbow Dash 2"  @change="getPosts" v-model="topics">
                        <label for="checkboxThree">Topic 3</label>
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
                    <div v-else v-for="(value, index) in posts" :key="index" class="widget row my-3">
                        <div class="col-md-4 col-12 px-0 ">
                            <a href="#">
                                <img :src="value.featuredImage" class="img-fluid" alt="">
                            </a>
                        </div>
                        <div class="col-md-8 col-12 py-2">
                            <a href="#">
                                <h3 class="p-2">{{value.title}}</h3>
                            </a>
                            <p>{{(value.content)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import Categories from "@/components/Categories";
    import firebase from 'firebase';

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
                loading: true
            }
        },
        components: {
            // Categories,
        },
        methods: {
            getPosts: function () {
                this.posts = [];
                this.loading = true;
                const db = firebase.firestore();
                if(this.topics.length === 0) {
                    db.collection("posts").onSnapshot(snapshot => {
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
                } else {
                    db.collection("posts").where('categories', 'array-contains-any', this.topics)
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
            this.getPosts();
        }
    }
</script>

