<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/events">Events</router-link> | 

      <a @click="logout" v-if='loggedIn'>Logout</a>
      <router-link to="/register" v-else>Register</router-link>
    </div>
    <v-container >
      <v-row>
        <v-col cols="12">
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
import auth from "@/db/auth";
// import Registration from "./components/Registration";

export default {
  name: "App",

  components: {
    // Registration
  },

  data: () => ({

  }),
  computed: {
    loggedIn () {
      return auth.getToken()
    }
  },
  methods: {
  logout() {
  auth.logout();
  this.$router.replace('/login')
  }
  }
};
</script>
