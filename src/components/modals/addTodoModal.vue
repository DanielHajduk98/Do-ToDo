<template>
  <StackLayout class="addTaskModal">
    <Label text="Nazwa zadania" textAlignment="center" class="addTaskHeader" />
    <TextField
      hint="Nazwa zadania"
      width="90%"
      v-model="name"
      class="addTaskTextField"
    />

    <Button
      :isEnabled="blockButton"
      text="DODAJ ZADANIE"
      @tap="addTask"
      class="button"
    />
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },

  methods: {
    addTask() {
      if (this.name === null) {
        return;
      }

      this.$store.dispatch("addTodo", this.name).then(() => {
        this.$modal.close(true);
      });
    },
  },

  computed: {
    blockButton: function () {
      return !this.$store.getters.todoActionsLoading;
    },
  },
};
</script>

<style scoped>
.addTaskModal {
  margin: 20px;
  vertical-align: center;
}

.addTaskHeader {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.addTaskTextField {
  font-size: 16px;
  margin-bottom: 50px;
}

.button {
  background-color: lightgray;
  color: black;
  font-size: 18px;
  font-weight: bold;
}
</style>
