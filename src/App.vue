<script setup>
import NavbarComponent from "@/components/Navbar.vue";
</script>

<template>
  <navbar-component class="navbar"></navbar-component>
  <RouterView />
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>
