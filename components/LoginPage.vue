<template>
    <div>
  <div class="jumbotron text-center">
     <h1>Welcome to the chat app</h1>
     </div>
    <div class="w-25 pb-1 mx-auto">
        <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
        <b-form-input
          id="example-input-1"
          name="example-input-1"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          aria-describedby="input-1-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback
          id="input-1-live-feedback"
        >This is a required field and must be at least 3 characters, but no longer than 12 cahracters.</b-form-invalid-feedback>
      </b-form-group>





          <b-button class="mt-2" squared type="submit" @click="LogIn(form.name)">Enter the chat as: "{{ form.name }}"</b-button>
    </div>
</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
import url from 'vuelidate/lib/validators/url';


  export default {
      mixins: [validationMixin],
    data() {
      return {
        text: '',
        form:{
            name: ""
        }
      }
    },
    methods: {
  say(message) {
     let AlertText = 'henlo '
      AlertText += this.form.name
      alert(AlertText)
    this.$router.push('/ChatView');

  },
  validateState(name){
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
  }, // TU W DÓŁ XD
  LogIn(pass){
    let url = this.$config.userURL + "/users";
    let result = axios.get(url + "/" + this.form.name)
    .then((result) => {
      alert("Username taken, please choose another one");
    })
    .catch((err) =>{
              let result2 = axios.post(url, {
                name: this.form.name
              })
        .then((result2) =>{
          let urlauth = this.$config.userURL + "/authenticate";
          let result3 = axios.post(urlauth, {
                name: this.form.name
              })
        .then((result3) =>{
          console.log(result3)
        })
        .catch((err) =>{
          alert(err);
        });
          this.$cookies.set("UserName", this.form.name);
          this.$cookies.set("control", 1);
          this.$router.push('/ChatView');
        })
        .catch((err) =>{
          this.$cookies.set("UserName", this.form.name);
          this.$cookies.set("control", 1);
          this.$router.push('/ChatView');
          alert(err);
        })

    })
  },
},
validations: {
    form:{
        name:{
            required,
            minLength: minLength(3),
            maxLength: maxLength(12)
        }
    }
}
}

</script>
