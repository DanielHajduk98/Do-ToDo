<template>
  <StackLayout class="addTaskModal">
    <Label text="Nazwa zadania" textAlignment="center" class="addTaskHeader" />
    <TextField
      width="90%"
      v-model="newName"
      class="addTaskTextField"
      editable="true"
    />

    <Button text="DODAJ ZADANIE" @tap="editTask" class="addTaskConfirmButton" />
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

.addTaskConfirmButton {
  background-color: lightgray;
  color: black;
  font-size: 18px;
  font-weight: bold;
}
</style>
