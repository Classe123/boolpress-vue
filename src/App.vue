<template>
  <h1 class="text-center">Ciao</h1>
  <i class="fa fa-solid fa-home"></i>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}
      <img :src="store.imgBasePath + post.image" :alt="post.title">
    </li>
  </ul>
  <button @click="getAllPosts()" class="btn btn-primary">cambia pagina</button>
</template>

<script>
import { store } from './store';
import axios from 'axios';
export default {
  name: 'App',
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

<style lang="scss" scoped></style>