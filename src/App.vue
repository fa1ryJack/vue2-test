<script></script>

<template>
  <v-app>
    <nav>
      <router-link to="/one">To page one</router-link>
      <router-link to="/two">To page two</router-link>
      <router-link to="/">Back to home</router-link>
    </nav>
    <router-view />
  </v-app>
</template>

<style scoped>
nav {
  display: flex;
  gap: 25px;
}
</style>
