<template>
  <div class="container">
      <div class="row row-cols-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card" style="width: 100%;">
            <div class="image-container">
                <img :src="product.img_url" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title font-weight-bolder">{{ product.name }}</h5>
                <p class="card-text">{{ product.color }}</p>
                <p class="card-text">{{ product.capacity }}</p>
                <p class="card-text font-weight-bolder">{{ product.price }}</p>
                <p class="card-text text-success" v-if="product.stock > 0">Available stock: {{ product.stock }}</p>
                <p class="card-text text-danger" v-else >Out of stock</p>
            </div>
            <div class="card-body">
                <a class="card-link" @click.prevent="addToCart(product.id)" style="cursor: pointer;">Add to cart</a>
                <a class="card-link" @click.prevent="addToWishlist(product.id)" style="cursor: pointer;">Add to wishlist</a>
            </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Card',
  props: ['products'],
  methods: {
    addToCart (productId) {
      if (this.$store.state.isLogin) {
        this.$store.dispatch('addToCart', productId)
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    addToWishlist (productId) {
      if (this.$store.state.isLogin) {
        Swal.fire({
          title: 'Add this product to your wishlist?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Add to to wishlist'
        })
          .then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('addToWishlist', productId)
            }
          })
      } else {
        Swal.fire({
          title: 'Create your wishlist',
          text: "Don't miss out on the products you love. Login / Register now to continue.",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login/Register'
        })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'Login' })
            }
          })
      }
    }
  }
}
</script>

<style>
.col {
    padding: 10px;
}
.image-container {
    height: 250px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
