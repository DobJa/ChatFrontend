<template>
    <div>
            <b-input-group class="mb-2">
                
                <b-input-group-prepend>{{this.$cookies.get("UserName")}}</b-input-group-prepend>

                <b-form-input 
                      id="message"
                      type="text"
                      v-model="message"
                      required
                      @keyup.native.enter="send"
                      @input ="isTyping"
                      placeholder="Type your message">
                </b-form-input>

                <b-form-file
                ref="file-input"
                     id="file"
                     v-model="file1"
                     :state="Boolean(file1)"
                     @keyup.native.enter="send"
                     placeholder="Choose a file or drop it here..."
                     drop-placeholder="Drop file here..."
                     accept="image/jpeg, image/png"
                ></b-form-file>
            </b-input-group>

          <div v-if="Chatting" class="d-flex align-items-center">
    <strong>Someone is typing      </strong>
    <b-spinner small label = "Small Spinner" type = "grow" variant = "info"></b-spinner>
  </div>
  <div v-else>
    <strong></strong>
  </div>

    </div>
    
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
     drawer: true,
     message: "",
     file: null,
     Chatting: false,
 }),
      created(){

          this.$cookies.set("typing", false)
        this.user = this.$cookies.get("UserName");

        if(this.user == "")
        {
            this.$router.push("");
        }
        else
        {
        }

        if(this.$cookies.get("control") == 1)
        {
            this.$cookies.set("control", 0);
        }
        else{
            this.$router.push("");
        }

        this.hubConnection = chat.createHub(this.$config.relayURL);
        
        this.hubConnection
        .start()
        .then(()=>console.log("connected to the hub"))
        .catch(err => console.log(err));

        this.hubConnection.on("messageReceived",(msg) =>{
            this.appendMsgToChat(msg);
        });
        this.hubConnection.on("messagusDeletus",(index) =>{
            this.$store.commit("MessusDeletus", index);
        });
        this.hubConnection.on("SomeoneTyping",(name) =>{
            if (name != this.$cookies.get("UserName"))
            {
            if (this.Chatting ==  false)
            {
            this.Chatting = true;
            setTimeout(() => {
                this.Chatting = false;
            }, 700);
        }
        else
        {
        }
            }
            else{

            }
        
        });
    },
  computed: {
   ...mapState(["user"])
 },
 methods: {
     ...mapMutations(["newMessage"]),
     isTyping(){
        this.hubConnection.invoke("Typing", this.$cookies.get("UserName"));
     },
         appendMsgToChat(msg) {
if (this.$store.getters.IsUnique(msg.mid) == 0) {
    this.$store.commit("newMessage", msg)
}
else{
    // drop non unique messages
}
    },
       getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
},
   send() {
       var file = document.querySelector('input[type=file]').files[0];
         if(this.message.length > 0 || file){
            let msgId = generator.next().value;
            let mid = generator.next().value;
           // const mesag = new Message(msgId,this.$cookies.get("UserName"),this.message);
          //  this.hubConnection.invoke("SendMessage", mesag);
            //this.$store.commit("newMessage", mesag)
        // poopoo test blob  ok worky

        
        if (file)
        { 
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64 = reader.result;
        // have to send message here befoere base64 is cleared
        console.log(base64);
        const mesag = new Message(mid,this.$cookies.get("UserName"),this.message, base64, mid);
        console.log(mesag);
        this.hubConnection.invoke("SendMessage", mesag);
            this.message = "";
            this.$refs['file-input'].reset()
    }
        }
        else{
            const emptyImage = null;
            const mesag = new Message(mid,this.$cookies.get("UserName"),this.message, emptyImage, mid);
            console.log(mesag);
            this.hubConnection.invoke("SendMessage", mesag);
            this.message = "";
            this.$refs['file-input'].reset()
        }

        //poopoo test blob end
            
 
         }
            
   },
 }
};
</script>