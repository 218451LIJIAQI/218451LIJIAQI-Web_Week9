<template>
  <!-- Centered results card -->
  <div class="text-center">
    <div class="card mx-auto my-5" style="max-width: 400px;">
      <div class="card-body">
        <!-- Show final score -->
        <h1 class="display-4">{{ score }} / 10</h1>
        <p class="lead">Your final score</p>

        <!-- Button to go back to category selection -->
        <button class="btn btn-primary mt-3" @click="$router.push('/')">
          Try Another Category
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsPage',
  props: ['score']  // get quiz score from query params
}
</script>

<style scoped>
/* Large bold text for score */
.display-4 { font-size: 3rem; font-weight: 700; }
</style>
