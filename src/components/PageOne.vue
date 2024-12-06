<script>
export default {
  data() {
    return {
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
        });
    },
    row_class: function () {
      return "row_class";
    },
    handleRowClick: function (event, row) {
      this.currentPost = { ...row.item };
      this.drawer = !this.drawer;
    },
    handleSubmit: function () {
      this.posts = this.posts.map((post) =>
        post.id === this.currentPost.id ? this.currentPost : post
      );
      this.snackbar = true;
      this.drawer = !this.drawer;
    },
  },
};
</script>

<template>
  <div>
    <v-data-table
      :items="posts"
      class="mt-5"
      height="79vh"
      :headers="headers"
      :items-per-page="10"
      :item-class="row_class"
      @click:row="handleRowClick"
    >
    </v-data-table>
    <v-navigation-drawer width="35%" bottom app temporary v-model="drawer">
      <v-form @submit.prevent="handleSubmit" autocomplete="off" class="ma-5">
        <h2>Edit field:</h2>
        <v-text-field
          label="ID"
          v-model="currentPost.id"
          readonly
        ></v-text-field>
        <v-text-field label="Title" v-model="currentPost.title"></v-text-field>
        <v-textarea label="Body" v-model="currentPost.body"></v-textarea>
        <v-btn type="submit" block>Save</v-btn>
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
</style>
