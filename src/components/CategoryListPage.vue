<template>
  <div>
    <h2 class="mb-4 text-center">Select a Quiz Category</h2>

    <!-- Show loading spinner when data is loading -->
    <div v-if="loading" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading…</span>
      </div>
    </div>

    <!-- Show error message if loading fails -->
    <div v-else-if="error" class="alert alert-danger text-center">
      <strong>Oops!</strong> Failed to load categories.<br />
      <button class="btn btn-sm btn-outline-light mt-2" @click="fetchCategories">
        Retry
      </button>
    </div>

    <!-- Show category cards when data is loaded -->
    <div v-else class="row">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="col-6 col-md-4 col-lg-3 mb-4"
      >
        <div
          class="card h-100 shadow-sm clickable"
          @click="goQuiz(cat.id)"
        >
          <div class="card-body d-flex align-items-center justify-content-center text-center px-2">
            {{ cat.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryListPage',
  data() {
    return {
      categories: [],  // store quiz categories
      loading: false,  // show loading spinner
      error: false     // show error message if loading fails
    }
  },
  created() {
    this.fetchCategories()  // fetch categories when page loads
  },
  methods: {
    fetchCategories() {
      this.loading = true
      this.error = false
      // send GET request to get categories from API
      this.$http
        .get('https://opentdb.com/api_category.php')
        .then(res => {
          // check if valid data exists
          if (res.data && res.data.trivia_categories) {
            this.categories = res.data.trivia_categories
          } else {
            throw new Error('Invalid response structure')
          }
        })
        .catch(() => {
          this.error = true  // show error message if request fails
        })
        .finally(() => {
          this.loading = false  // stop loading
        })
    },
    goQuiz(id) {
      // navigate to quiz page with selected category
      this.$router.push({ name: 'Quiz', params: { categoryId: id } })
    }
  }
}
</script>

<style scoped>
/* Make card look clickable */
.clickable {
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
}

/* Add hover effect */
.clickable:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

/* Style for card text */
.card-body {
  font-weight: 500;
  font-size: 1rem;
}
</style>
