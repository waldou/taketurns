<template>
  <div class="column border-left rounded shadow">
    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
      <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AddColumn',
  components: {

  },
  data () {
    return { }
  },
  created () {
  },
  methods: {
    skipContributor: function (contributors) {
      try {
        this.dataRef.transaction(t => {
          // Map to contributor names array
          const actualContributors = contributors.map(item => {
            return item.name
          })

          // Check race conditions and ignore if someone updated before
          if (this.arrayEquals(t.contributors, actualContributors)) {
            const newContributors = [ ...actualContributors ]
            const elem = newContributors.shift()
            newContributors.push(elem)
            return { ...t, contributors: newContributors }
          }
        })
      } catch (e) {
        console.error('Error while updating remote data:', e)
      }
    },
    arrayEquals: function (a, b) {
      return Array.isArray(a) && Array.isArray(b) &&
        a.length === b.length && a.every((val, index) => {
        return val === b[index]
      })
    },
    onClickDelete: function () {
      try {
        this.dataRef.transaction(() => {
          return {}
        })
      } catch (e) {
        console.error('Error while deleting remote data:', e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.column {
    margin: 10px;
    padding: 10px;
    background-color: #BDB8AD;
}
</style>
