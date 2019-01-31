<template>
  <div>
    <b-container class="login" style="padding:10px">
      <b-row align-h="center" class>
        <b-col md="4" class="form">
          <h3>LOGIN</h3>
          <b-form @submit="onSubmit">
            <b-form-group>
              <b-form-input
                type="email"
                id="email"
                required
                v-model="email"
                @blur="$v.email.$touch()"
                placeholder="Enter Email"
              ></b-form-input>
              <!-- <p v-if="!$v.email.email">Please provide a valid email address.</p>
              <p v-if="!$v.email.required">This field must not be empty.</p>-->
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="password"
                id="password"
                required
                v-model="password"
                @blur="$v.password.$touch()"
                placeholder="Enter Password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary" :size="'lg'" :block="true">Submit</b-button>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
      <br>
      <div class="fixed-bottom">KEHKASHAN @ 2019</div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "home",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    this.$toasted.show("Please Login", {
      icon: {
        name: "check"
      },
      theme: "outline",
      position: "top-right",
      duration: 2000,
      type: "info"
    });
    if (this.$store.getters.getAuth) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.email === "admin@admin.com" && this.password === "123456") {
        this.$store.dispatch("setAuth");
        //alert(this.$store.getters.getAuth)
        this.$router.push("/");
      } else {
        this.toast("Please enter correct login details", "ban");
      }
    },
    toast(msg, icon) {
      this.$toasted.show(msg, {
        icon: {
          name: icon
        },
        theme: "outline",
        position: "top-right",
        duration: 3000,
        type: "error"
      });
    }
  },
  computed: {
    isAuth() {
      return this.$store.getAuth;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  components: {}
};
</script>

<style scoped>
.login {
  margin-top: 30px;
}
.form {
  border: 1px solid teal;
  padding: 30px;
  background-color: "#EAEACD";
}
</style>