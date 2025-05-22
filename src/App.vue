<template>
  <div id="app">
    <!-- Navigation bar -->
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <a class="navbar-brand" href="/">Trivia Quiz</a>
    </nav>

    <!-- Main content container -->
    <div class="container py-4">
      <!-- Render the matched route component -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRoot' // Root component name
}
</script>

<style>
/* nothing extra here—Bootstrap covers it */
</style>
