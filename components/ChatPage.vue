<template>
<div>
        <div class="container">
        <div class="row">&nbsp;</div>
        <div class="row">
            <div class="col-2">User</div>
            <div class="col-4"><input type="text" id="userInput" /></div>
        </div>
        <div class="row">
            <div class="col-2">Message</div>
            <div class="col-4"><input type="text" id="messageInput" /></div>
        </div>
        <div class="row">&nbsp;</div>
        <div class="row">
            <div class="col-6">
                <input type="button" id="sendButton" value="Send Message" />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <hr />
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <ul id="messagesList"></ul>
        </div>
    </div>


             <div>
        <b-form-input id="message"
                      type="text"
                      v-model="message"
                      required
                      @keyup.native.enter="send"
                      placeholder="Type your message">
        </b-form-input>

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
        this.user = "urmom";

        this.hubConnection = chat.createHub();

        this.hubConnection
        .start()
        .then(()=>console.log("connected to the hub"))
        .catch(err => console.log(err));

        this.hubConnection.on("messageReceived",(msg) =>{
            this.appendMsgToChat("sampleUser",msg);
        });
            this.hubConnection.on("ReceiveNotification", msg => {
                this.appendAlertToChat(msg);
        });
    },
    methods: {
        send () {
                
            this.hubConnection.invoke("SendMessage", "poopster420", this.message);
            this.user = "poopster420";
            this.message = '';
        },
        appendMsgToChat(user,msg){
                this.chat = this.user + this.msg + this.chat;
        }
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
