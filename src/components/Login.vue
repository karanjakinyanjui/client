<template>
  <v-container>
    <div>
      <v-alert
        v-model="alert"
        dismissible
        color="cyan"
        border="left"
        elevation="2"
        colored-border
      >{{message}}</v-alert>
    </div>
    <v-row align="center" class="text-center">
      <v-col cols="6">
        <v-form ref="form">
          <v-text-field v-model="email" label="E-mail" type="email" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            counter
            @click:append="show = !show"
          ></v-text-field>

          <v-btn color="success" class="mr-4" @click="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from "@/db/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      alert: false,
      show: false,
      message: ""
    };
  },
  methods: {
     submit: async function() {
      if (this.email && this.password) {
      console.log(this.email)
        //try {
          const l = await auth.login(this.email, this.password)
          if(l.data.role === 'staff'){
            this.$router.replace('/events')
          }
          else if(l.data.role === 'student'){
            this.$router.replace('/')
          }
        
      }
    }
  }
};
</script>
