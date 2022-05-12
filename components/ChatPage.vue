<template>
<div>
             <div>
        <b-form-input id="message"
                      type="text"
                      v-model="message"
                      required
                      @keyup.native.enter="send"
                      placeholder="Type your message">
        </b-form-input>

<!-- <b-form @submit="onSubmit">
  <b-input-group prepend="Chat input my dood" class="mb-2">
        <b-form-input id="message"
                      type="text"
                      v-model="message"
                      required
                      placeholder="Type your message">
        </b-form-input>
        <b-form-file
            v-model="file1"
            :state="Boolean(file1)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        ></b-form-file>
              <b-button type="submit" variant="primary">Submit</b-button>
  </b-input-group>
  </b-form> -->

        <div class="messages-container" v-html="chat">
        </div>
    </div>

</div>
</template>

<script src="~/lib/signalr/signalr.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script lang="js">
import chat from './WebSocket'
const signalR = require('@microsoft/signalr');
export default{
    data(){
        return{
            user: {},
            hubConnection: {},
            chat: '',
            message: ''       
             }
    },
    created(){
        this.user = this.$cookies.get("UserName");

        this.hubConnection = chat.createHub();

        this.hubConnection
        .start()
        .then(()=>console.log("connected to the hub"))
        .catch(err => console.log(err));

        this.hubConnection.on("messageReceived",(user,msg) =>{
            this.appendMsgToChat(user,msg);
        });
            this.hubConnection.on("ReceiveNotification", msg => {
                this.appendAlertToChat(msg);
        });
    },
    methods: {
        send() {
            // event.preventDefault()
            this.hubConnection.invoke("SendMessage", this.$cookies.get("UserName"), this.message);
            this.message = '';
        },
            appendMsgToChat(user, msg) {
                const htmlMsg = '<p class="msg"> [' + user + '] ' + msg + '</p>';
                this.chat = htmlMsg + this.chat;
                } // prototype of overloaded method of appending a message to the chat
        // appendMsgToChat(usr, image, msg) {
        //     const htmlMsg = '<p class="msg"> [' + usr + '] '+ <img class="image" src="' + image + '"/> + msg + '</p>';
        //     this.chat = htmlMsg + this.chat;
        //     }
    } 

}









// "use strict";
// var connection = new signalR.HubConnectionBuilder()
//     .withUrl("http://localhost:7001")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();

// //Start the connection.
// connection.start();

</script>
