<template>
  <div>
    <!-- Show selected category ID -->
    <h2 class="mb-4">Category ID: {{ categoryId }}</h2>

    <!-- Show loading spinner while fetching questions -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Show error message if loading fails -->
    <div v-else-if="error" class="alert alert-danger">
      Failed to load questions. Please try again.
    </div>

    <!-- Show quiz questions when loaded -->
    <div v-else>
      <!-- Progress Bar -->
      <div class="mb-3">
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            :style="{ width: `${Math.floor((answeredCount/questions.length)*100)}%` }"
            :aria-valuenow="answeredCount"
            :aria-valuemin="0"
            :aria-valuemax="questions.length"
          >
            {{ answeredCount }} / {{ questions.length }}
          </div>
        </div>
      </div>

      <!-- Quiz Form -->
      <form @submit.prevent="submitQuiz">
        <!-- Loop through each question -->
        <div 
          v-for="(q, i) in questions"
          :key="q.question"
          class="card mb-4 shadow-sm"
        >
          <div class="card-body">
            <!-- Show question text -->
            <p class="font-weight-medium">{{ i+1 }}. {{ decode(q.question) }}</p>

            <!-- Show answer options as checkboxes for multi-choice -->
            <div v-for="opt in q.all_answers" :key="opt" class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :id="'q'+i+opt"
                :value="opt"
                v-model="answers[i]"
                @change="updateProgress"
              />
              <label class="form-check-label" :for="'q'+i+opt">
                {{ decode(opt) }}
              </label>
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <button 
          type="submit"
          class="btn btn-success btn-block"
          :disabled="answeredCount < questions.length"
        >
          Submit Answers
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// Decode HTML entities in strings
function htmlDecode(str) {
  const e = document.createElement('textarea')
  e.innerHTML = str
  return e.value
}

// Shuffle answers randomly
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default {
  name: 'QuizPage',
  props: ['categoryId'],  // get selected category ID from router
  data() {
    return {
      questions: [],     // quiz questions
      answers: [],       // array of arrays for multi-choice answers
      loading: true,     // loading status
      error: false,      // error status
      answeredCount: 0   // how many questions are answered
    }
  },
  created() {
    // Fetch quiz questions from API when component loads
    this.$http
      .get(`https://opentdb.com/api.php?amount=10&category=${this.categoryId}`)
      .then(res => {
        this.questions = res.data.results.map(q => ({
          ...q,
          all_answers: shuffle([q.correct_answer, ...q.incorrect_answers])
        }))
        // Initialize each answer as an empty array
        this.answers = this.questions.map(() => [])
      })
      .catch(() => { this.error = true })  // handle error
      .finally(() => { this.loading = false })  // finish loading
  },
  methods: {
    decode: htmlDecode,  // decode text for display
    updateProgress() {
      // Count how many questions have at least one checkbox selected
      this.answeredCount = this.answers.filter(arr => arr.length > 0).length
    },
    submitQuiz() {
      // Calculate score: +1 for each question where correct answer is selected
      let score = 0
      this.questions.forEach((q, i) => {
        if (this.answers[i].includes(q.correct_answer)) {
          score++
        }
      })
      // Navigate to results page with score
      this.$router.push({ name: 'Results', query: { score } })
    }
  }
}
</script>

<style scoped>
/* Style for medium weight text */
.font-weight-medium { font-weight: 500; }
</style>
