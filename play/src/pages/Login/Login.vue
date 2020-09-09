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
            <p class="text-grey-6" @click="$router.push('/register')">Not reigistered? Created an Account </p>
          </q-card-section>
          <q-card-section class="text-center q-pa-none">
          <q-btn round size="sm" color="secondary" @click="showNotif('top-right')">
            <q-icon name="arrow_forward" class="rotate-135" />
          </q-btn>
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
import io from 'socket.io-client'
const alerts = [
  { color: 'negative', message: 'Woah! Danger! You are getting good at this!', icon: 'report_problem' },
  { message: 'You need to know about this!', icon: 'warning' },
  { message: 'Wow! Nice job!', icon: 'thumb_up' },
  { color: 'teal', message: 'Quasar is cool! Right?', icon: 'tag_faces' },
  { color: 'purple', message: 'Jim just pinged you', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png' },
  { multiLine: true, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quisquam non ad sit assumenda consequuntur esse inventore officia. Corrupti reiciendis impedit vel, fugit odit quisquam quae porro exercitationem eveniet quasi.' }
]
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
    const socket = io('http://localhost:10010')
    console.log(socket)
    socket.on('connect', function () {
      console.log('Connected')

      socket.emit('events', { test: 'test' })
      socket.emit('identity', 0, response =>
        console.log('Identity:', response)
      )
      socket.emit('initClientServer', { clientName: 'message' }, response =>
        console.log(response)
      )
    })
    socket.on('initClientServer', { clientName: 'message' }, response =>
      console.log(response)
    )
    socket.on('events', function (data) {
      console.log('event', data)
    })
    socket.on('exception', function (data) {
      console.log('event', data)
    })
    socket.on('disconnect', function () {
      console.log('Disconnected')
    })
    socket.on('toClient', (data) => {
      console.log('toClient')
      console.log(data)
      this.showNotif('top-left', JSON.stringify(data))
      console.log('toClient')
    })
  },
  methods: {
    ...mapActions([
      'login/login'
    ]),
    async login () {
      const user = {
        email: this.email,
        password: window.btoa(this.password)
      }
      const res = await this['login/login'](user)
      console.log(res)
      if (!res.code) {
        this.showNotif('center', res.msg)
      }
    },
    showNotif (position, message = 'success') {
      const { color, textColor, multiLine, icon, avatar } = alerts[
        1
      // Math.floor(Math.random(alerts.length) * 10) % alerts.length
      ]
      const random = 100 // Math.random() * 100

      const twoActions = random > 70
      const buttonColor = color ? 'white' : '0'

      this.$q.notify({
        color,
        textColor,
        icon: random > 30 ? icon : null,
        message,
        position,
        avatar,
        multiLine,
        actions: twoActions
          ? [
            { label: 'Reply', color: buttonColor, handler: () => { /* console.log('wooow') */ } },
            { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
          ]
          : (random > 40
            ? [{ label: 'Reply', color: buttonColor, handler: () => { /* console.log('wooow') */ } }]
            : null
          ),
        timeout: Math.random() * 5000 + 3000
      })
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
