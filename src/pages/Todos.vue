<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label
          class="text--white"
          text="MENU"
          @tap="$refs.drawer.nativeView.toggleDrawerState()"
          col="0"
        />
        <Label class="title" :text="this.$title" col="1" />
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="wrapper">
        <StackLayout class="drawer-header">
          <Image src="res://logo" />
        </StackLayout>
        <Button class="button" text="Zadania" @tap="navigateTo('todos')" />
        <Button class="button" text="Profil" @tap="navigateTo('profile')" />
        <Button class="button" text="Wyloguj" @tap="logout" />
      </StackLayout>

      <StackLayout ~mainContent class="bg-theme">
        <Spinner v-if="todoListIsLoading" color="white" />

        <GridLayout v-show="!todoListIsLoading" rows="auto, *">
          <ListView
            separatorColor="transparent"
            row="1"
            v-show="todoList.length !== 0"
            id="todoListView"
            ref="todoListView"
            for="todo in todoList"
            @loaded="todoListViewLoaded = true"
          >
            <v-template>
              <StackLayout
                orientation="horizontal"
                class="todoCard"
                @longPress="editTodo(todo.name, todo.id)"
              >
                <check-box
                  class="todoCard__checkBox"
                  :checked="todo.done"
                  @checkedChange="
                    (isChecked = false), deleteTodo($event, todo.id)
                  "
                  fillColor="white"
                />
                <Label
                  textWrap="true"
                  :text="todo.name"
                  class="todoCard__label"
                ></Label>
              </StackLayout>
            </v-template>
          </ListView>

          <StackLayout
            v-if="todoList.length === 0"
            row="1"
            class="noTodoMessage"
          >
            <StackLayout class="noTodoMessage__item">
              <Image width="50" height="50" src="res://baseline_add_white_24" />
              <Label class="text--white" text="Nie masz żadnych zadań" />
            </StackLayout>
          </StackLayout>

          <fab
            row="1"
            @tap="openAddTodoModal"
            icon="res://baseline_add_white_24"
            rippleColor="#f1f1f1"
            class="fab-button"
          ></fab>
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Spinner from "../components/Spinner";
import AddTodoModal from "../components/modals/AddTodoModal";
import { mapGetters } from "vuex";
import EditTodoModal from "../components/modals/EditTodoModal";
import drawerMethods from "../mixins/drawerMethods";

export default {
  components: { Spinner },

  mixins: [drawerMethods],

  data() {
    return {
      todoListViewLoaded: false,
    };
  },

  methods: {
    scrollToTop(animate = false) {
      if (!this.todoListViewLoaded) return;

      const todoListView = this.$refs.todoListView.nativeView;

      todoListView.scrollToIndex(0, animate);
    },

    editTodo(name, todoID) {
      this.$showModal(EditTodoModal, { props: { name: name, todoID: todoID } });
    },

    deleteTodo(event, todoID) {
      if (event.value) {
        setTimeout(() => {
          this.$store.dispatch("deleteTodo", todoID);
        }, 600);
      }
    },

    openAddTodoModal() {
      this.$showModal(AddTodoModal).then((added) => {
        console.log(added);
        if (added) {
          this.scrollToTop(true);
        }
      });
    },
  },

  mounted() {
    this.$store.dispatch("bindTodos");
  },

  computed: {
    ...mapGetters(["todoList", "todoListIsLoading"]),
  },
};
</script>

<style scoped lang="scss">
$themeColor: #35495e;

.noTodoMessage {
  width: 100%;
  height: 100vh;
  verticalalignment: "center";
  horizontalalignment: "center";

  &__item {
    verticalalignment: "center";
    horizontalalignment: "center";
    text-align: center;
    font-size: 16;
  }
}

.todoCard {
  background-color: $themeColor;
  padding: 16 25;

  &__label {
    margin-top: -3;
    font-size: 20;
    color: white;
  }

  &__checkBox {
    vertical-align: top;
  }
}

.todoButton {
  background-color: red;

  &__label {
    font-size: 16;
    color: white;
    verticalalignment: "center";
    horizontalalignment: "center";
  }
}

.button {
  background-color: lightgray;
  color: black;
  font-size: 18px;
  font-weight: bold;
}
</style>
