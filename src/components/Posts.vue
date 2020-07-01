<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-lg-10 col-12">
                <Categories/>
            </div>
        </div>

        <div class="row justify-content-around">
            <div class="col-lg-10 col-12">
                <div class="content">
                    <div v-if="loading" class="text-center py-5 w-100">
                        <img class="img-fluid mx-auto" src="../assets/images/loader-blue.svg" alt="loading icon" />
                    </div>
                    <div v-else v-for="(value, index) in posts" :key="index" class="widget row my-3">
                        <div class="col-md-4 col-12">
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
    import Categories from "@/components/Categories";
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
                loading: true
            }
        },
        components: {
            Categories,
        },
        created() {
            const db = firebase.firestore();
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
        }
    }
</script>

