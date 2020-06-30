
<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide> <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide>
        <swiper-slide>
            <a href="#" class="topic">Topic</a>
        </swiper-slide>
    </swiper>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    export default {
        name: 'swiper-example-free-mode',
        title: 'Free mode / No fixed positions',
        components: {
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 7,
                    spaceBetween: 30,
                    freeMode: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .swiper {
        /*height: 300px;*/
        /*width: 100%;*/
    }

    .swiper .swiper-slide {
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*text-align: center;*/
        /*font-weight: bold;*/
        /*!*font-size: $font-size-huge * 2;*!*/
        /*background-color: #ffffff;*/
    }
</style>