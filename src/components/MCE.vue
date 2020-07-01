<template>
    <div>
        <editor
                v-model="content"
                @input="mceUpdate"
                apiKey="bdpyk8ns2jooxxj26b87kwmspgfcp9w0s2alkci1oh48c6nq"
                initialValue=""
                :init="{
                  height: 500,
                  menubar: false,
                   menu: {
        menu: {
            format: {
                title: 'format', items: 'forecolor backcolor'
        }
        }
        },
        plugins: [
        'advlist autolink lists link image charmap',
        'searchreplace visualblocks code fullscreen',
        'print preview anchor insertdatetime media',
        'paste code help wordcount table'
        ],
        toolbar:
        'undo redo | media | formatselect | bold italic | fontsizeselect | forecolor backcolor | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | help'
        }"
        >
        </editor>
    </div>
</template>
<script>
    import Editor from '@tinymce/tinymce-vue'

    export default {
        name: 'MCE',
        data() {
            return {
                content: "",
            }
        },
        components: {
            editor: Editor
        },
        methods: {
            mceUpdate() {
                this.$emit('mceUpdate', this.content)
            }
        }
    }
</script>