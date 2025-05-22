import Vue from 'vue'
import VueRouter from 'vue-router'

// Import page components
import CategoryListPage from '@/components/CategoryListPage.vue'
import QuizPage         from '@/components/QuizPage.vue'
import ResultsPage      from '@/components/ResultsPage.vue'

// Enable Vue Router
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // Use clean URLs without hash (#)
  routes: [
    {
      path: '/', // Home page
      name: 'Home',
      component: CategoryListPage
    },
    {
      path: '/quiz/:categoryId', // Quiz page with dynamic category ID
      name: 'Quiz',
      component: QuizPage,
      props: true // Pass route params as props to the component
    },
    {
      path: '/results', // Results page
      name: 'Results',
      component: ResultsPage,
      // Convert query param 'score' to number and pass as prop
      props: route => ({ score: Number(route.query.score) })
    }
  ]
})
