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
  },
};
</script>

<template>
  <v-data-table
    :items="posts"
    class="mt-5"
    :headers="headers"
    :items-per-page="15"
  >
  </v-data-table>
</template>
