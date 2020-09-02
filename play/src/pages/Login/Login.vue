<template>
  <q-page class="bg-light-green window-height window-width row justify-center items-center">
    <div class="column shadow-8">
      <div class="row justify-center items-center">
        <h5 class="text-h5 text-white q-my-md text-weight-bolder">LIVE & LEARN</h5>
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
            <q-btn unelevated color="light-green-7" @click="login" size="lg" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account </p>
          </q-card-section>
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
import io from 'socket.io'

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
  created () {
    const socket = io('http://localhost:8080')
    socket.on('connect', function () {
      console.log('Connected')

      socket.emit('events', { test: 'test' })
      socket.emit('identity', 0, response =>
        console.log('Identity:', response)
      )
    })
    socket.on('events', function (data) {
      console.log('event', data)
    })
    socket.on('exception', function (data) {
      console.log('event', data)
    })
    socket.on('disconnect', function () {
      console.log('Disconnected')
    })
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
