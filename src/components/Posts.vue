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
                    <div class="widget row my-3">
                        <div class="col-md-4 col-12">
                            <a href="#">
                                <img src="../assets/images/image-01.png" class="img-fluid" alt="">
                            </a>
                        </div>
                        <div class="col-md-8 col-12 py-2">
                            <a href="#">
                                <h3 class="p-2">Post Title Goes Here</h3>
                            </a>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia assumenda
                                omnis.
                                Error, nemo. Doloremque ad commodi praesentium accusantium libero earum! Eaque
                                itaque
                                laudantium temporibus dolorum asperiores sed corporis molestias.</p>
                        </div>
                    </div>
                    <div class="widget row my-3">
                        <div class="col-md-4 col-12">
                            <a href="#">
                                <img src="../assets/images/image-01.png" class="img-fluid" alt="">
                            </a>
                        </div>
                        <div class="col-md-8 col-12 py-2">
                            <a href="#">
                                <h3 class="p-2">Post Title Goes Here</h3>
                            </a>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia assumenda
                                omnis.
                                Error, nemo. Doloremque ad commodi praesentium accusantium libero earum! Eaque
                                itaque
                                laudantium temporibus dolorum asperiores sed corporis molestias.</p>
                        </div>
                    </div>
                    <div class="widget row my-3">
                        <div class="col-md-4 col-12">
                            <a href="#">
                                <img src="../assets/images/image-01.png" class="img-fluid" alt="">
                            </a>
                        </div>
                        <div class="col-md-8 col-12 py-2">
                            <a href="#">
                                <h3 class="p-2">Post Title Goes Here</h3>
                            </a>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia assumenda
                                omnis.
                                Error, nemo. Doloremque ad commodi praesentium accusantium libero earum! Eaque
                                itaque
                                laudantium temporibus dolorum asperiores sed corporis molestias.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Categories from "@/components/Categories";

    export default {
        name: 'Posts',
        components: {
            Categories,
        }
    }
</script>

