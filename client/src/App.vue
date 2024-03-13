<template>
  <div class="flex flex-col min-h-screen bg-rose-400">
    <SiteNavigation/>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/NavigationBar.vue"
</script>

<style lang="scss" scoped></style>