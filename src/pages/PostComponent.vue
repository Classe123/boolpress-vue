<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <img :src="store.imgBasePath + post.image" :alt="post.title">
        <p>{{ post.content }}</p>
        <span>{{ post.category?.name }}</span>
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

<style lang="scss" scoped></style>