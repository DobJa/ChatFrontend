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
      const index = state.messages.findIndex(object => {
        return object.mid === id;
      });
      state.messages[index].text = "<this message has been deleted>";
      state.messages[index].image = null;
    }
   }