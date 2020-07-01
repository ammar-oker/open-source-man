<template>
    <div class="row justify-content-center post">
        <div class="col-lg-10 col-12">
            <h1 class="py-4">
                {{post.title}}
            </h1>
            <div class="img-block featured-image text-center">
                <img class="img-fluid mx-auto" :src="post.featuredImage" alt="">
            </div>

            <ul class="post-meta my-5 px-2">
                <li>By <strong>{{post.author.name}}</strong></li>
                <li>Last Modified <strong>{{post.createdAt}}</strong></li>
                <li>Topics
                    <div class="my-3">
                        <span v-for="(topic, index) in post.categories" :key="index" class="topic mx-2">{{topic}}</span>
                    </div>
                </li>
            </ul>
            <div class="content" v-html="post.content"></div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'Post',
        data() {
            return {
                id: this.$route.params.id,
                post: {}
            }
        },
        created() {
            const db = firebase.firestore();
            db.collection('posts').doc(this.id).get().then(result => {
                this.post = {...result.data(), createdAt: this.formatDate(result.data().createdAt)};
            })
        },
        methods: {
            formatDate(timestamp) {
                const d = new Date(timestamp);
                return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
            }
        }
    }
</script>
<style >
    .content img {
        max-width: 100% !important;
    }

    .content iframe {
        width: 100% !important;
        max-height: 800px;
    }

    .featured-image {
        width: 100%;
    }

    @media only screen and (min-width: 992px){
        .content iframe {
            /*width: 50% !important;*/
            /*max-height: 600px;*/
        }

        .featured-image {
            max-width: 50% ;
            /*max-height: 600px;*/
        }
    }
</style>
