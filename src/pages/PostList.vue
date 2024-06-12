<template>
    <div class="d-flex justify-content-between align-items-center">
        <h1>All Posts</h1>
        <select name="categories" id="categories" class="form-select" @change="setParams(1)" v-model="cat">
            <option value="">Tutte le categorie</option>
            <option :value="category.id" v-for="category in store.categories" :key="category.id">{{ category.name }}
            </option>
        </select>
    </div>

    <div class="row">
        <div class="col-12 col-lg-6" v-if="posts.length < 1">
            <h3>Nessun post trovato per la categoria: {{ selectedCategory }} </h3>
        </div>
        <div class="col-12 col-lg-6" v-for="post in posts" :key="post.id">
            <CardComponent :item="post" />
        </div>
    </div>
    <nav>
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" :class="{ 'disabled': currentPage <= 1 }" href="#"
                    @click.prevent="setParams(currentPage - 1)">Previous</a>
            </li>

            <li class="page-item" v-for="page in totalPage" :key="page">
                <a class="page-link" :class="{ 'active': currentPage == page }" href="#"
                    @click.prevent="setParams(page)">{{ page }}</a>
            </li>

            <li class="page-item">
                <a class="page-link" :class="{ 'disabled': currentPage >= totalPage }" href="#"
                    @click.prevent="setParams(currentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
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
            currentPage: 0,
            totalPage: 0,
            cat: '',
            params: null
        }
    },
    methods: {
        setParams(numpage) {
            //console.log(this.category);
            this.currentPage = numpage;
            this.params = {
                page: this.currentPage,
            }
            if (this.cat) {
                this.params.category = this.cat;
            }
            this.getAllPosts();
        },
        getAllPosts() {
            axios.get(this.store.apiBaseUrl + '/posts', { params: this.params }).then((res) => {
                console.log(res.data);
                this.posts = res.data.results.data;
                //se paginazione
                //this.posts = res.data.results.data;
                this.currentPage = res.data.results.current_page;
                this.totalPage = res.data.results.last_page;
                this.params = null;
            });
        },

    },
    computed: {
        selectedCategory() {
            const category = this.store.categories.find(category => category.id == this.cat);
            return category ? category.name : '';
        }
    },
    mounted() {
        this.getAllPosts();
    }
}

</script>

<style lang="scss" scoped>

.form-select {
    width: auto;
    }
</style>