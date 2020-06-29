<template>
    <div class="column border-left rounded shadow-sm">
        <h2>{{ name }}</h2>
        <div v-for="(contributor, index) in contributors" :key="`${contributor.name}`">
            <Contributor :name="contributor.name" :first="index === 0" :onClickHandler="contributor.onClickHandler" />
        </div>
    </div>
</template>

<script>
import Contributor from './components/Contributor'

export default {
  name: 'TurnsColumn',
  props: {
    dataRef: Object
  },
  components: {
    Contributor
  },
  data () {
    return { name: '', contributors: [] }
  },
  created () {
    // Listen to changes to column values
    this.dataRef.on('value',
      snapshot => {
        if (snapshot.val()) {
          // Update column name
          this.name = snapshot.val().name

          // Update column contributors and set new onclick handlers
          const newContributors = []
          snapshot.val().contributors.forEach((name, index) => {
            let onClickHandler = () => {}
            if (index === 0) {
              onClickHandler = () => {
                this.skipContributor([...this.contributors])
              }
            }
            newContributors.push({ name, onClickHandler })
          })
          this.contributors = newContributors
        }
      }
    )
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
            const newContributors = [...actualContributors]
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
        a.length === b.length && a.every((val, index) => { return val === b[index] })
    }
  }
}
</script>

<style scoped lang="scss">
.column {
    margin: 10px;
    padding: 10px;
    background-color: #EBE7E0;
}
</style>
