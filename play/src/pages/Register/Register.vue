<template>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column shadow-8">
      <div class="row justify-center items-center">
        <h5 class="text-h5 text-white q-my-md text-weight-bolder">LIVE & LEARN Register</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" @click="login" size="lg" class="full-width" label="Register" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">{{gettersTest}}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('login', ['gettersTest']),
    ...mapState('login', ['stateTest'])
  },
  methods: {
    ...mapActions([
      'login/actionsTest',
      'login/testApi'
    ]),
    login () {
      console.log(this.stateTest)
      const gettersTest = this.gettersTest ? this.gettersTest + '1' : ''
      this['login/actionsTest']({ test: `hi ${gettersTest}` })
      this['login/testApi']({ test: `hi ${gettersTest}` })
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
