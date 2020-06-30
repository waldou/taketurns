<template>
  <div class="contributor d-flex flex-row order rounded shadow-sm clearfix" :class="{ 'clickable': first }" @click="onClick">
    <div class="name">
      {{ name }}
    </div>
    <div class="skip">
      <svg
        v-if="first" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-skip-forward-fill"
        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
        <path d="M7.596 8.697l-6.363 3.692C.693 12.702 0 12.322 0 11.692V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        <path d="M15.096 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contrinutor',
  props: {
    name: String,
    first: Boolean,
    onClickHandler: Function
  },
  methods: {
    onClick: function () {
      this.onClickHandler()
    }
  }
}
</script>

<style scoped lang="scss">
.contributor {
  margin: 10px;
  padding: 10px;
  background-color: #C6D4E1;
  font-size: 1.2em;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.name {
  flex: 9;
}
.skip {
  flex: 1;
}
</style>
