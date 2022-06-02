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
import axios from "axios";

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
     	updateOnlineStatus(e) {
    	const { type } = e;
      this.onLine = type === 'online';
    },
        handler: function handler(event) {
        const url = "http://user.test/users" + "/" + this.$cookies.get("UserName");
        let result = axios.delete(url, {
          userName: this.$cookies.get("UserName")
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) =>{
          console.log(err)
        });
    }
 },
 computed: {
   ...mapState(["user", "messages"])
 },
 watch: {
  	onLine(v) {
    	if(v) 
      {
      }
      else
      {
        const url = "http://user.test/users" + "/" + this.$cookies.get("UserName");
        let result = axios.delete(url, {
          userName: this.$cookies.get("UserName")
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) =>{
          console.log(err)
        });
        alert("you have lost connection, log again");
        this.$router.push("");
      }
    }
 },
     mounted() {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
  created(){
    window.addEventListener('beforeunload', this.handler);
    document.addEventListener('beforeunload', this.handler);

    let url = "http://chat.test/messages";
    let result = axios.get(url)
    .then((result) => {
      let data = result.data;
      for(let i = 0; i < data.length; i++)
      {
        this.$store.commit("newMessage", data[i]);
      }
    })
  }
};
</script>
