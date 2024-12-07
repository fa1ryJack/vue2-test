<script>
export default {
  data() {
    return {
      loading: true,
      posts: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Title", value: "title" },
        { text: "Body", value: "body" },
      ],
      drawer: false,
      snackbar: false,
      currentPost: {
        id: 0,
        title: "",
        body: "",
      },
      drawerTitle: "Edit fields:",
      deleteDialog: false,
    };
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      this.axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          this.posts = response.data;
          this.posts[0];
        })
        .finally(() => (this.loading = false));
    },
    row_class: function () {
      return "row_class";
    },
    handleRowClick: function (event, row) {
      this.drawerTitle = "Edit fields:";
      this.currentPost = { ...row.item };
      this.drawer = true;
    },
    handleAddClick: function () {
      this.drawerTitle = "Add post:";
      this.currentPost.id = this.posts.reduce(function (prev, current) {
        return prev && prev.id > current.id ? prev.id + 1 : current.id + 1;
      });
      this.drawer = true;
    },
    handleSubmit: function () {
      if (this.drawerTitle === "Edit fields:") {
        this.posts = this.posts.map((post) =>
          post.id === this.currentPost.id ? this.currentPost : post
        );
      } else if (this.drawerTitle === "Add post:") {
        this.posts.push(this.currentPost);
      }
      this.snackbar = true;
      this.drawer = false;
      this.currentPost = { id: 0, title: "", body: "" };
    },
    handleDelete: function () {
      this.posts = this.posts.filter((post) => post.id !== this.currentPost.id);
      this.deleteDialog = false;
      this.snackbar = true;
      this.drawer = false;
      this.currentPost = { id: 0, title: "", body: "" };
    },
  },
};
</script>

<template>
  <v-progress-circular
    v-if="loading"
    color="green"
    class="ma-auto"
    indeterminate
  ></v-progress-circular>
  <div class="d-flex align-center flex-column mt-10" width="100%" v-else>
    <v-btn
      width="fit-content"
      color="green"
      class="white--text"
      @click="handleAddClick"
    >
      Add post
    </v-btn>
    <v-data-table
      :items="posts"
      class="mt-5"
      height="75vh"
      :headers="headers"
      :items-per-page="10"
      :item-class="row_class"
      @click:row="handleRowClick"
    >
    </v-data-table>
    <v-navigation-drawer width="35%" bottom app temporary v-model="drawer">
      <v-form @submit.prevent="handleSubmit" autocomplete="off" class="ma-5">
        <h2>{{ drawerTitle }}</h2>
        <v-text-field
          label="ID"
          v-model="currentPost.id"
          readonly
        ></v-text-field>
        <v-text-field label="Title" v-model="currentPost.title"></v-text-field>
        <v-textarea label="Body" v-model="currentPost.body"></v-textarea>
        <v-btn type="submit" color="green" class="white--text" block>
          Save
        </v-btn>
        <v-dialog v-model="deleteDialog" persistent max-width="20%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              v-if="drawerTitle === 'Edit fields:'"
              color="red"
              class="white--text mt-10"
              block
            >
              Delete
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this row?
            </v-card-title>
            <v-card-text
              >You will not be able to reverse this action.</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="deleteDialog = false">
                Cancel
              </v-btn>
              <v-btn color="red" text @click="handleDelete"> Delete </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-navigation-drawer>

    <v-snackbar v-model="snackbar" color="green" :timeout="2000">
      Changes are saved!
    </v-snackbar>
  </div>
</template>

<style>
.row_class {
  cursor: pointer;
}

.v-snack__content {
  text-align: center;
}

.v-data-table {
  min-width: 100%;
}

.v-card__title {
  word-break: break-word;
}
</style>
