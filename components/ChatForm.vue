<template>
        <b-form-input id="message"
                      type="text"
                      v-model="message"
                      required
                      @keyup.native.enter="send"
                      placeholder="Type your message">
        </b-form-input>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {snowflakeGenerator} from 'snowflake-id-js';
import Message from '../utils/Message'

const generator = snowflakeGenerator(512);
export default {
 data: () => ({
     drawer: true
 }),
  computed: {
   ...mapState(["user"])
 },
 methods: {
     ...mapMutations(["newMessage"]),
   send() {
            let msgId = generator.next().value;
            const mesag = new Message(msgId,this.$cookies.get("UserName"),this.message);
            this.hubConnection.invoke("SendMessage", mesag);
            //this.$store.commit("newMessage", mesag)
            console.log(mesag);
            // this.message = '';
   }
 }
};
</script>