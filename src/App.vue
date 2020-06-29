<template>
  <div id="app" class="container">
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
import TurnsColumn from '@/components/TurnsColumn'

const firebaseApp = Firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()
const collection = db.ref('data')

export default {
  name: 'App',
  data () {
    return { columns: [], errorMessage: undefined }
  },
  created () {
    // Read remote data
    collection.once('value',
      snapshot => {
        if (snapshot.val() && snapshot.val().columns) {
          // Setup columns and pass column data references
          const newColumns = []
          snapshot.val().columns.forEach((data, index) => {
            const dataRef = db.ref(`data/columns/${index}`)
            newColumns.push({ dataRef })
          })
          this.columns = newColumns
        }
      },
      error => {
        // TODO: Show error on UI
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
