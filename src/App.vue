<template>
  <div id="app" class="container">
    <div class="alert alert-danger alert-dismissible fade" role="alert" v-bind:class="{ show: errorMessage }">
      <strong>Holy arepa!</strong> {{errorMessage}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div v-if="columns" class="row">
      <div v-for="(column, index) in columns" :key="`data-${index}`" class="col-sm">
        <TurnsColumn :dataRef="column.dataRef" />
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
import TurnsColumn from './components/TurnsColumn'

const firebaseApp = Firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()
const collection = db.ref('data')

export default {
  name: 'App',
  data () {
    return { columns: [], errorMessage: undefined }
  },
  created () {
    collection.on('value',
      snapshot => {
        if (snapshot.val() && snapshot.val().columns) {
          const newColumns = []
          snapshot.val().columns.forEach((data, index) => {
            const dataRef = db.ref(`data/columns/${index}`)
            newColumns.push({ dataRef })
          })
          this.columns = newColumns
        }
      },
      error => {
        this.errorMessage = error
      }
    )
  },
  components: {
    TurnsColumn
  }
}
</script>

<style lang="scss">
body {
  background-color: #FFFFFF;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #44749D;
}
.clickable {
  cursor: pointer;
}
</style>
