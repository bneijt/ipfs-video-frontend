<template>
  <div class="block">
    <h1 class="title">Not found</h1>
    <p><router-link to="/">go home</router-link></p>
  </div>
</template>

<script>
export default {
  metaInfo: {
       title: "Not found",
       description: "Page not found",
       //meta: {"http-equiv":"refresh", content:"2;url=http://example.com/"}
  },
};
</script>
