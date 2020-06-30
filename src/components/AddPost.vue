<template>
    <div class="row justify-content-center">
        <div class="col-lg-10 col-12">
            <form class="post-form">
                <h2 class="text-primary my-4">New Post</h2>
                <input id="title" class="d-block w-100 title" type="text" placeholder="Title">
                <div class="image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                    <span v-if="!imageData" class="placeholder">
                      Choose an Image
                    </span>
                <input class="file-input" ref="fileInput" type="file" accept="image/png, image/jpeg, image/gif" @input="onSelectFile">
                </div>
                <ul class="ks-cboxtags">
                    <li>
                        <input type="checkbox" id="checkboxOne" value="Rainbow Dash">
                        <label for="checkboxOne">Topic 1</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxTwo" value="Rainbow Dash">
                        <label for="checkboxTwo">Topic 2</label>
                    </li>
                    <li>
                        <input type="checkbox" id="checkboxThree" value="Rainbow Dash">
                        <label for="checkboxThree">Topic 3</label>
                    </li>
                </ul>
                <MCE/>

                <button type="submit">Post</button>
            </form>
        </div>
    </div>
</template>

<script>
    import MCE from "@/components/MCE";

    export default {
        name: 'AddPost',
        components: {
            MCE,
        },
        data() {
            return {
                imageData: null,
            }
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
            }
        }
    }
</script>

