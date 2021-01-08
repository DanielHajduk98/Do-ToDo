import { firebase } from "@nativescript/firebase";
import { firestoreAction } from "vuexfire";

const state = {
  todoList: [],
  todoListIsLoading: true,
  highestIndex: 0,
  todoActionsLoading: false,
};

const getters = {
  todoActionsLoading: (state) => {
    return state.todoActionsLoading;
  },

  todoList: (state) => {
    return state.todoList;
  },

  todoListIsLoading: (state) => {
    return state.todoListIsLoading;
  },
};

const mutations = {
  startTodoAction() {
    state.todoActionsLoading = true;
  },

  finishTodoAction() {
    state.todoActionsLoading = false;
  },

  fetchTodoListStart(state) {
    state.todoListIsLoading = true;
  },

  fetchTodoListSuccess(state) {
    state.todoListIsLoading = false;
  },
};

const actions = {
  bindTodos: firestoreAction(({ bindFirestoreRef, rootGetters, commit }) => {
    commit("fetchTodoListStart");
    console.log("bind todos");

    const uid = rootGetters.getUser.uid;
    const todoListRef = firebase.firestore
      .collection("todos/" + uid + "/todoList")
      .orderBy("createdAt", "desc");

    const serialize = (doc) => {
      let data = doc.data();

      Object.defineProperty(data, "id", { value: doc.id });
      Object.defineProperty(data, "_doc", { value: doc });

      return data;
    };

    return bindFirestoreRef("todoList", todoListRef, { serialize })
      .then(() => {
        commit("fetchTodoListSuccess");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }),

  addTodo({ rootGetters, commit }, name) {
    console.log("addTodo");
    commit("startTodoAction");

    const uid = rootGetters.getUser.uid;

    const todosRef = firebase.firestore.collection(
      "todos/" + uid + "/todoList"
    );

    return todosRef
      .add({
        name: name,
      })
      .then(async (todoDoc) => {
        await todoDoc
          .update({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            commit("finishTodoAction");
          });
      })
      .catch((err) => {
        alert(err);
      });
  },

  editTodo({ rootGetters, commit }, { name, todoID }) {
    commit("startTodoAction");

    const uid = rootGetters.getUser.uid;

    const todosRef = firebase.firestore.collection(
      "todos/" + uid + "/todoList"
    );

    todosRef
      .doc(todoID)
      .update({
        name: name,
        done: false,
      })
      .then(() => {
        commit("finishTodoAction");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  },

  deleteTodo({ rootGetters }, todoID) {
    console.log("delete");
    const uid = rootGetters.getUser.uid;

    const todosRef = firebase.firestore.collection(
      "todos/" + uid + "/todoList"
    );

    return todosRef
      .doc(todoID)
      .delete()
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  },
};

export default {
  actions,
  state,
  getters,
  mutations,
};
