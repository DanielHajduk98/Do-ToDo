<template>
  <StackLayout class="addTaskModal">
    <Label text="Nazwa zadania" textAlignment="center" class="addTaskHeader" />
    <TextField
      v-model="taskName"
      hint="Wpisz nazwę zadania"
      class="addTaskTextField"
    />

    <Button text="DODAJ ZADANIE" @tap="addTask" class="addTaskConfirmButton" />
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      searchPhrase: "",
      selectedUsers: [],
      taskName: "",
    };
  },

  methods: {
    addTask() {
      if (this.taskName === null) {
        return;
      }

      const users = [];

      this.selectedUsers.forEach((user) => {
        users.push(user.uid);
      });

      const todo = {
        name: this.taskName,
        users: users,
      };
      this.$store
        .dispatch("addTodo", {
          projectID: this.projectID,
          todoGroupID: this.todoGroupID,
          todo,
        })
        .then(() => {
          this.$modal.close();
        });
    },
  },
};
</script>

<style scoped>
.addTaskModal {
  margin: 20px;
  vertical-align: center;
  background-color: white;
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

.addTaskConfirmButton {
  background-color: lightgray;
  color: black;
  font-size: 18px;
  font-weight: bold;
}
</style>
