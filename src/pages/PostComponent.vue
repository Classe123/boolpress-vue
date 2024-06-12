<template>
    <div v-if="post">
        <img :src="getImage" class="postimg" :alt="post.title">
        <h1 class="my-4">{{ post.title }}</h1>
        <p>{{ post.content }}</p>
        <p>{{ post.category?.name }}</p>
        <RouterLink :to="{ name: 'single-post', params: { 'slug': 'eum-porro-sed-optio-quis-itaque-ex-harum' } }">Leggi
            altro articolo</RouterLink>
    </div>
</template>

<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'PostComponent',
    data() {
        return {
            store,
            post: null
        }
    },
    methods: {
        getPost() {
            console.log(this.$route);
            axios.get(`${this.store.apiBaseUrl}/posts/${this.$route.params.slug}`).then((res) => {
                console.log(res.data.results);
                this.post = res.data.results;
            }).catch((error) => {
                // console.log(error);
                // console.log(error.response.data);
                this.$router.push({ name: 'not-found' });
            }).finally();
        },

    },
    computed: {
        getImage() {
            return this.post.image ? this.store.imgBasePath + this.post.image : '/images/bar-neon.png';
        }
    },
    mounted() {
        this.getPost();
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                // react to route changes...
                this.getPost();
            }
        )

    }
}
</script>

<style lang="scss" scoped>
.postimg {
    object-fit: cover;
    width: 100%;
    height: 40vw;
}
</style>