<template>
 <div class="chat-wrapper">

    <div class="chat__form">
     <ChatForm />
   </div>

   <div class="chat" ref="chat">
     <Message
       v-for="(misag) in messages.slice().reverse()"
       :key="misag.MessId"
       :User="misag.User"
       :text="misag.text"
       :timestamp="misag.timestamp"
     />
   </div>

 </div>
</template>

<script src="~/lib/signalr/signalr.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script>
import { mapState, mapMutations } from "vuex";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";
// import chat from './WebSocket'
// const signalR = require('@microsoft/signalr');

export default {
 components: {
   Message,
   ChatForm
 },
 head() {
   return {
     title: `Chat Room`
   };
 },
    //  created(){
    //     this.user = this.$cookies.get("UserName");

    //     this.hubConnection = chat.createHub();
        
    //     this.hubConnection
    //     .start()
    //     .then(()=>console.log("connected to the hub"))
    //     .catch(err => console.log(err));

    //     this.hubConnection.on("messageReceived",(msg) =>{
    //         this.appendMsgToChat(msg);
    //     });
    //         this.hubConnection.on("ReceiveNotification", msg => {
    //             this.appendAlertToChat(msg);
    //     });
    // },
  methods: {
   ...mapMutations(["newMessage"]),
    appendMsgToChat(msg) {
    this.$store.commit("newMessage", msg)
    }
 },
 computed: {
   ...mapState(["user", "messages"])
 },
 watch: {
   messages() {
     setTimeout(() => {
       if (this.$refs.chat) {
         this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
       }
     }, 0);
   }
 }
};
</script>
