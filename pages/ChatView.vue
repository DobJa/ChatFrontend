<template>
    <ChatPage />
</template>

<script>
import Vue from 'vue'
import ChatPage from "../components/ChatPage.vue"

export default Vue.extend({
    name: "ChatView",
    components: {ChatPage}
})
</script>
