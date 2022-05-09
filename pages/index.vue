<template>
  <ChatPage />
</template>

<script>
import Vue from 'vue'
import LoginPage from "../components/LoginPage.vue"
import ChatPage from "../components/ChatPage.vue"

export default Vue.extend({
    name: "IndexPage",
    components: { LoginPage, ChatPage}
})
</script>
