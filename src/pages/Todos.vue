<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label
          class="text--white"
          text="MENU"
          @tap="$refs.drawer.nativeView.showDrawer()"
          col="0"
        />
        <Label class="title" :text="this.$title" col="1" />
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <StackLayout class="drawer-header">
          <Image src="res://logoicon" />
        </StackLayout>
        <Label class="drawer-item" text="Item 1" />
        <Label class="drawer-item" text="Item 2" />
        <Label class="drawer-item" text="Item 3" />
      </StackLayout>

      <GridLayout rows="auto, *" ~mainContent>
        <ScrollView row="1" height="100%">
          <Label>adsfasdfadsfasdf</Label>
        </ScrollView>
        <fab
          row="1"
          @tap="openAddTodoModal"
          icon="res://baseline_add_white_24"
          rippleColor="#f1f1f1"
          class="fab-button"
        ></fab>
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Spinner from "../components/Spinner";
import AddTodoModal from "../components/modals/AddTodoModal";

export default {
  components: { Spinner },

  methods: {
    openAddTodoModal() {
      this.$showModal(AddTodoModal);
    },
  },

  mounted() {
    // this.$store.dispatch("");
  },

  computed: {},
};
</script>

<style scoped lang="scss">
.projectList {
  background-color: white;
}

.projectCard {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  horizontal-align: center;
  border-radius: 40px;
  background-color: lightgray;

  android-elevation: 10;
}

.lowPriority {
  background-color: lightgreen;
}

.mediumPriority {
  background-color: khaki;
}

.highPriority {
  background-color: lightcoral;
}

.projectStatus {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}

.projectImg {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 250px;
  width: 400px;
  border-radius: 100px;
  android-elevation: 5;
}

.projectName {
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.projectDeadline {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
}
</style>
