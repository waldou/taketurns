<template>
  <div id="app-container">
    <Navbar />
    <div id="app">
      <div v-if="columns" id="scrolling-wrapper">
        <TurnsColumn
          v-for="(column, index) in columns" :key="`data-${index}`" class="col-container"
          :data-ref="column.dataRef" />
        <AddColumn class="col-container" />
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
import Navbar from '@/components/Navbar'
import TurnsColumn from '@/components/TurnsColumn'
import AddColumn from '@/components/AddColumn'

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
    collection.on('value',
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
    Navbar,
    TurnsColumn,
    AddColumn
  }
}
</script>

<style lang="scss">
html {
  height: 100vh;
  margin: 0;
  background-color: #BDB8AD;
}

body {
  height: 100vh;
  margin: 0;
  background-color: #FFFFFF;
  overflow-y: hidden;
}
#app-container {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #44749D;
  width: 100%;
  height: 100%;
  z-index: 1;
}
#scrolling-wrapper {
  width: auto;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  .col-container {
    width: 360px;
    display: inline-block;
    vertical-align: top;
  }
}
.clickable {
  cursor: pointer;
}
</style>
