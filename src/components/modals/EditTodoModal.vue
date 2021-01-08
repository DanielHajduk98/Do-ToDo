<template>
  <StackLayout class="addTaskModal">
    <Label text="Edytuj zadanie" textAlignment="center" class="addTaskHeader" />
    <TextField width="90%" v-model="newName" class="addTaskTextField" />

    <Button
      :isEnabled="blockButton"
      text="DODAJ ZADANIE"
      @tap="editTask"
      class="button"
    />
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      newName: "",
    };
  },

  created() {
    this.newName = this.name;
  },

  props: {
    name: String,
    todoID: String,
  },

  methods: {
    editTask() {
      if (this.newName === null) {
        return;
      }

      this.$store
        .dispatch("editTodo", { name: this.newName, todoID: this.todoID })
        .then(() => {
          this.$modal.close();
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
