<template>
  <div class="jumbotron">
    <h1 class="display-4">Hello, User!</h1>
    <p class="lead">
      This is a simple Todo-List. You can create a list, by adding tasks. You
      can also delete tasks and mark them as completed.
    </p>
    <hr class="my-4" />
    <p>If you want to create a list, click on the button below.</p>
    <router-link to="/">
      <button type="button" class="btn btn-primary btn-lg">Learn more</button>
    </router-link>
  </div>
</template>

<style>
.jumbotron {
  margin-top: 100px;
  padding: 30px;
}
</style>
<script setup></script>
