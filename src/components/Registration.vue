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
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="newUser.name" :rules="[rules.required]" label="Name" required></v-text-field>

          <v-text-field
            v-model="newUser.email"
            :rules="[rules.required, rules.emailMatch]"
            label="E-mail"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUser.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>

          <v-select v-model="newUser.role" :items="roles" label="Roles" required></v-select>

          <v-btn color="success" class="mr-4" @click="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from "@/db/index";
export default {
  name: "Registration",
  data() {
    return {
      alert: false,
      valid: true,
      show: false,
      usedEmail: false,
      message: "",
      roles: ["student", "staff"],
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters"
      },
      newUser: {
        email: "",
        password: "",
        name: "",
        role: "student"
      }
    };
  },
  methods: {
    submit: function() {
      if (this.valid) {
        try {
          auth.addUser(this.newUser);
        } catch (error) {
          this.message = error.message;
          this.alert = true;
        }
      }
    }
  }
};
</script>