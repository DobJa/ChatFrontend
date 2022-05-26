<template>
        <b-form-input id="message"
                      type="text"
                      v-model="message"
                      required
                      @keyup.native.enter="send"
                      @input ="isTyping"
                      placeholder="Type your message">
        </b-form-input>
</template>

<script src="~/lib/signalr/signalr.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script>
import { mapState, mapMutations } from "vuex";
import {snowflakeGenerator} from 'snowflake-id-js';
import Message from '../utils/Message'
import chat from './WebSocket'
const signalR = require('@microsoft/signalr');

const generator = snowflakeGenerator(512);
export default {
 data: () => ({
     drawer: true
 }),
      created(){
          this.$cookies.set("typing", false)
        this.user = this.$cookies.get("UserName");

        this.hubConnection = chat.createHub();
        
        this.hubConnection
        .start()
        .then(()=>console.log("connected to the hub"))
        .catch(err => console.log(err));

        this.hubConnection.on("messageReceived",(msg) =>{
            this.appendMsgToChat(msg);
        });
            this.hubConnection.on("ReceiveNotification", msg => {
                this.appendAlertToChat(msg);
        });
    },
  computed: {
   ...mapState(["user"])
 },
 methods: {
     ...mapMutations(["newMessage"]),
         appendMsgToChat(msg) {
         //  const mesag = new Message(msg.MessId,msg.User,msg.text, msg.timestamp);
    this.$store.commit("newMessage", msg)
    },
   send() {
            let msgId = generator.next().value;
            const mesag = new Message(msgId,this.$cookies.get("UserName"),this.message);
            this.hubConnection.invoke("SendMessage", mesag);
            //this.$store.commit("newMessage", mesag)
            console.log(mesag);
            
   },
   isTyping() {
       this.$cookies.set("typing", true);
      // alert("SAMSING CHANGED")
   }
 }
};
</script>