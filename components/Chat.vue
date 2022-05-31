<template>
 <div class="chat-wrapper">

    <div class="chat__form">
     <ChatForm />
   </div>

  <div v-if="isTyping" class="d-flex align-items-center">
    <strong>Someone is typing      </strong>
    <b-spinner small label = "Small Spinner" type = "grow" variant = "info"></b-spinner>
  </div>
  <div v-else>
    <strong>pls chat I'm lonely</strong>
  </div>

   <div class="chat" ref="chat">
     <Message
       v-for="(misag) in messages.slice().reverse()"

       :key="misag.messid"
       :user="misag.user"
       :text="misag.text"
       :timestamp="misag.timestamp"
       :image="misag.image"
        :messid="misag.messid"
        :mid="misag.mid"
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
      if (messages.filter(m => m.messid === msg.messid).length === 0) {
        this.$store.commit("newMessage", msg)
      }
      else{

      }
    
    }
 },
 computed: {
   ...mapState(["user", "messages"]),
   isTyping(){
    // return this.$cookies.get("typing");
    return false;


   }
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
