<template>
    <Chat />
</template>

<script>
import Vue from 'vue'
import ChatPage from "../components/ChatPage.vue"
import Chat from "../components/Chat.vue"

export default Vue.extend({
    name: "ChatView",
    components: {ChatPage,Chat}
})
</script>
