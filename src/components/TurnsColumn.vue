<template>
    <div class="column border-left rounded shadow-sm">
        <h2>{{ name }}</h2>
        <div v-for="(contributor, index) in contributors" :key="`${contributor.name}`">
            <Contributor :name="contributor.name" :first="index === 0" :onClickHandler="contributor.onClickHandler" />
        </div>
    </div>
</template>

<script>
import Contributor from './Contributor'

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
    this.dataRef.on('value', (snapshot) => {
      if (snapshot.val()) {
        this.name = snapshot.val().name

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
    })
  },
  methods: {
    skipContributor: function (contributors) {
      this.dataRef.transaction(t => {
        const actualContributors = contributors.map(item => {
          return item.name
        })

        if (this.arrayEquals(t.contributors, actualContributors)) {
          const newContributors = [...actualContributors]
          const elem = newContributors.shift()
          newContributors.push(elem)
          return { ...t, contributors: newContributors }
        }

        return Promise.reject(new Error('Data changed'))
      }).then(result => {
        console.log('Transaction success!')
      }).catch(err => {
        console.log('Transaction failure:', err)
      })
    },
    arrayEquals: function (a, b) {
      return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => {
          return val === b[index]
        })
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
