<template>
  <div id="app">
    <h4><u>KEHKAHSAN AUTOMATIONS</u></h4>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/report">Report</router-link> |
      <router-link v-if="!gAuth" to="/login">Login</router-link>
      <router-link v-else to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        auth : false
      }
    },
    computed:{
      gAuth(){
        return this.$store.getters.getAuth
      }
    },
    created(){
      this.auth = this.$store.getters.getAuth
    }
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
