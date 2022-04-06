<template>
  <div class="block">
    <h1 class="title">404 Not found</h1>
    <p>Page not found. <router-link to="/">Go back home</router-link></p>
  </div>
</template>

<script>
export default {
  metaInfo: {
       title: "404 Not found",
       description: "Page not found",
       //meta: {"http-equiv":"refresh", content:"2;url=http://example.com/"}
  },
};
</script>
