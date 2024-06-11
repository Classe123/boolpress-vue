<template>
    <h1>All Posts</h1>
    <div class="row">
        <div class="col-12 col-lg-6" v-for="post in posts" :key="post.id">
            <CardComponent :item="post" />
        </div>
    </div>

</template>

<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue';

export default {
    name: 'PostList',
    components: {
        CardComponent
    },
    data() {
        return {
            store,
            posts: [],

        }
    },
    methods: {
        getAllPosts() {
            axios.get(this.store.apiBaseUrl + '/posts').then((res) => {
                console.log(res.data);
                this.posts = res.data.results;
                //se paginazione
                //this.posts = res.data.results.data;
                //this.currentPage = res.data.results.current_page;
            });
        },
    },
    mounted() {
        this.getAllPosts();
    }
}

</script>

<style lang="sass" scoped>

</style>