<template>
 <div class="chat-wrapper">

    <div class="chat__form">
     <ChatForm />
   </div>

   <div class="chat" ref="chat">
     <Message
       v-for="(misag) in messages.slice().reverse()"

       :key="misag.messid"
       :user="misag.user"
       :text="misag.text"
       :timestamp="misag.timestamp"
     />
   </div>

   <div>{{messages}}</div>

 </div>
</template>

<script src="~/lib/signalr/signalr.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script>
import { mapState, mapMutations } from "vuex";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";

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
