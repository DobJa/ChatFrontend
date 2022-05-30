<template>
    <div>
            <b-input-group class="mb-2">
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
       getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
},
   send() {
         if(this.message.length > 0 || this.file != null){
            let msgId = generator.next().value;
            const mesag = new Message(msgId,this.$cookies.get("UserName"),this.message);
            this.hubConnection.invoke("SendMessage", mesag);
            //this.$store.commit("newMessage", mesag)
        // poopoo test blob  ok worky

        var file = document.querySelector('input[type=file]').files[0];
        if (file)
        { 
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64 = reader.result;
        // have to send message here befoere base64 is cleared
        console.log(base64);
    }
        }

        //poopoo test blob end
            console.log(mesag);
            this.message = "";
            this.$refs['file-input'].reset()
         }
            
   },
   isTyping() {
       this.$cookies.set("typing", true);
      // alert("SAMSING CHANGED")
   },
 }
};
</script>