<template>
  <div class="column border-left rounded shadow">
    <div class="column-top clearfix">
      <div class="column-name">
        <h2>{{ name }}</h2>
      </div>
      <div class="column-options clickable nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </a>
        <ul class="dropdown-menu">
          <li class="dropdown-item">
            <a @click="onClickDelete">Delete</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="column-last-updated">
      <p v-if="lastupdated">
        Last updated: {{ lastupdated }}
      </p>
    </div>
    <div v-for="(contributor, index) in contributors" :key="`${contributor.name}`">
      <Contributor :name="contributor.name" :first="index === 0" :on-click-handler="contributor.onClickHandler" />
    </div>
  </div>
</template>

<script>
import Contributor from './components/Contributor'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'TurnsColumn',
  props: {
    dataRef: Object
  },
  components: {
    Contributor
  },
  data () {
    return { name: '', contributors: [], lastupdated: '' }
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
                this.skipContributor([ ...this.contributors ])
              }
            }
            newContributors.push({ name, onClickHandler })
          })
          this.contributors = newContributors

          // Update column last updated date
          this.lastupdated = snapshot.val().lastupdated
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
            const newContributors = [ ...actualContributors ]
            const elem = newContributors.shift()
            newContributors.push(elem)
            return { ...t, contributors: newContributors, lastupdated: moment().format(DATE_FORMAT) }
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
    background-color: #EBE7E0;
}
.column-top {
  border-bottom: 1px solid #BDB8AD;
  margin: 10px;
}
.column-last-updated {
  width: 100%;
}
.column-name {
  float: left;
  text-align: left;
  width: 80%;
}
.column-options {
  float: right;
}
</style>
