<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="getImage" class="img-fluid rounded-start" :alt="item.title">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text" v-html="item.content.substring(0, 30) + '...'"></p>
                    <p class="card-text"><small class="text-body-secondary">Last updated: 3 {{ item.updated_at
                            }}</small>
                    </p>
                    <span class="badge rounded-pill text-bg-warning me-3">{{ item.category?.name }}</span>
                    <RouterLink :to="{ name: 'single-post', params: { 'slug': item.slug } }" class="btn btn-success">
                        Leggi articolo</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../store';
export default {
    name: 'CardComponent',
    props: ['item'],
    data() {
        return {
            store
        }
    },
    computed: {
        getImage() {
            return this.item.image ? this.store.imgBasePath + this.item.image : '/images/bar-neon.png';
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 0.1rem;
}

.card img {
    aspect-ratio: 1/1;
}
</style>