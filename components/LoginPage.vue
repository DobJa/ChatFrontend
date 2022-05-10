<template>
    <div>
  <div class="jumbotron text-center">
     <h1>Whale cum to the chat app</h1>
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





          <b-button class="mt-2" squared type="submit" @click="LogIn(this.form.name)">Enter the chat as: "{{ form.name }}"</b-button>
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
    let urlname = "http://user/users/" + this.$v.form[name];
    let result = axios.get(urlname)
    .then((result) => {
      if (result == "NotFound")
      {
        let result2 = axios.post(urlname)
        .then((result2) =>{
          Name:this.$v.form[name],
          this.$router.push('/ChatView');
        })
        .catch((err) =>{
          alert(err);
        })
      }
    })
    .catch((err) =>{
      alert(err);
    })
  } // TU JUŻ NIE JAK COŚ
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
