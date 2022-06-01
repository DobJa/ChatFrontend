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
import chat from './WebSocket'
const signalR = require('@microsoft/signalr');

export default {
 props: {
   messid: String,
   user: String,
   timestamp: Number,
   text: String,
   image: String,
   mid: String
 },
       created(){
          this.$cookies.set("typing", false)
        this.user = this.$cookies.get("UserName");

        this.hubConnection = chat.createHub();
        
        this.hubConnection
        .start()
        .then(()=>console.log("connected to the hub"))
        .catch(err => console.log(err));

        this.hubConnection.on("messagusDeletus",(index) =>{
            this.$store.commit("MessusDeletus", index);
        });

                this.hubConnection.on("messageReceived",(msg) =>{
            //consume useless message
        });
    },
 computed: {
   isDisabled() {
     return this.user !== this.$cookies.get("UserName");
   }
 },
 methods: {
   deletus(){
     this.text = "<this message has been deleted>";
     this.$store.commit("MessusDeletus", this.mid);
     this.hubConnection.invoke("DeleteMessage", this.mid);
   //  this.$store.commit("MessusDeletus", this.mid);
      

   }
 }
};
</script>