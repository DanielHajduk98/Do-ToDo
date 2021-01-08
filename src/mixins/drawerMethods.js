export default {
  methods: {
    logout() {
      this.$store.dispatch("signOut").then(() => {
        this.$navigateTo(this.$routes.Login, { clearHistory: true });
      });
    },

    navigateTo(route) {
      let page;
      console.log(route);
      switch (route) {
        case "todos": {
          page = this.$routes.Todos;
          break;
        }
        case "profile": {
          page = this.$routes.Profile;
          break;
        }
        default: {
          page = this.$routes.Todos;
          break;
        }
      }

      this.$navigateTo(page);
    },
  },
};
