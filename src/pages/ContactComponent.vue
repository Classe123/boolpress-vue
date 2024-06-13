<template>
    <h1>Contact Us</h1>
    <div v-if="success" class="alert alert-success text-start" role="alert">
        Messaggio inviato con successo!
    </div>
    <div class="row">
        <form @submit.prevent="sendForm()" class="col-12 text-start">
            <div class="mb-3">
                <input type="text" class="form-control border-0 border-bottom" :class="{ 'is-invalid': errors.name }"
                    placeholder="Name" v-model="name" required>
                <p v-for="(error, index) in errors.name" :key="`message-error-${index}`" class="invalid-feedback">
                    {{ error }}
                </p>
            </div>
            <div class="mb-3">
                <input type="email" class="form-control border-0 border-bottom" placeholder="Email" v-model="email"
                    :class="{ 'is-invalid': errors.address }" required>
                <p v-for="(error, index) in errors.address" :key="`message-error-${index}`" class="invalid-feedback">
                    {{ error }}
                </p>
            </div>
            <div class="mb-3">
                <label for="message">Your message</label>
                <textarea id="message" class="form-control border-0 border-bottom" cols="30" rows="10" v-model="message"
                    :class="{ 'is-invalid': errors.message }">{{ message }}</textarea>
                <p v-for="(error, index) in errors.message" :key="`message-error-${index}`" class="invalid-feedback">
                    {{ error }}
                </p>
            </div>
            <button class="btn btn-lg btn-primary text-white" type="submit" :disabled="loading">{{ loading ?
                'Sending...'
                : 'Send' }}</button>
        </form>
    </div>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
export default {
    name: 'ContactComponent',
    data() {
        return {
            store,
            name: '',
            email: '',
            message: '',
            errors: {},
            loading: false,
            success: false
        }
    },
    methods: {
        sendForm() {
            this.success = false;
            this.loading = true;
            this.errors = {};
            const data = {
                name: this.name,
                address: this.email,
                message: this.message
            }
            axios.post(`${this.store.apiBaseUrl}/contacts`, data).then((res) => {
                console.log(res.data.status);
                this.success = true;
                this.name = '';
                this.email = '';
                this.message = '';
            }).catch((error) => {
                //console.log(error);
                //this.errors = error.response.data.errors;
                console.log(this.errors);
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>