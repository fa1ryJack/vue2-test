<script>
export default {
  data() {
    return {
      posts: [],
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
          console.log(response.data);
          this.posts = response.data;
          console.log(this.posts);
        });
    },
  },
};
</script>

<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Title</th>
          <th class="text-left">Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in posts" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.body }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
