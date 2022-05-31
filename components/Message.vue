<template>
 <div>
   <div class="msg-wrapper">
     <div class="msg">
       <div class="msg__information">
         <span class="msg_ID">{{messid}}</span>
         <!-- <span class="msg__name">{{ User }}</span>
         
         <span class="msg__date">{{ time }}</span> -->
       </div>
       <p class="msg__text"> <b-button variant="outline-light" :disabled="isDisabled" @click="deletus">Del</b-button> [ {{user}} ] {{ text }} </p>
       <img v-if(image) v-bind:src="image" />
       <!-- <p class="msg__date">{{ timestamp }}</p>
       <p class="msg_ID">{{MessId}}</p>
       <p class="msg__name">{{ User }}</p> -->
     </div>
   </div>
 </div>
</template>

<script>
import Message from '../utils/Message'
import { mapState, mapMutations } from "vuex";
export default {
 props: {
   messid: String,
   user: String,
   timestamp: Number,
   text: String,
   image: String
 },
 computed: {
   isDisabled() {
     return this.user !== this.$cookies.get("UserName");
   }
 },
 methods: {
   deletus(){
     this.text = "<REDACTED>";
     this.$store.commit("MessusDeletus", this.messid);
   }
 }
};
</script>