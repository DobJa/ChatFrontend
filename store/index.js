export const state = () => ({
    user: {},
    messages: [],
    users: []
   })
   
   export const mutations = {
    setUser(state, user) {
      state.user = user;
    },
    newMessage(state, msg) {
      state.messages = [...state.messages, msg];
    },
    updateUsers(state, users) {
      state.users = users;
    },
    clearData(state) {
      state.user = {};
      state.messages = [];
      state.users = [];
    },
    MessusDeletus(state, id){
      var index = state.messages.findIndex(function(item, i) {
        return item.text === "<REDACTED>";
      });

      state.messages = [
        ...state.messages.slice(0, index),
        id,
        ...state.messages.slice(index + 1)
      ]
    }
   }