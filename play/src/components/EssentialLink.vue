<template>
  <q-item clickable @click="push" :tag="tag" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    tag: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    push () {
      this.path && this.$router.push(this.path)
    }
  }
}
</script>
