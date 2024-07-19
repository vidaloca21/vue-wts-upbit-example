<template>
  <div id="container">
    <div class="">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
menu,
ul,
ol,
li,
dl,
dt,
dd,
table,
th,
td,
form,
fieldset,
legend,
input,
textarea,
button,
select {
  margin: 0;
  padding: 0;
  -webkit-text-size-adjust: 100%;
}
body {
  background: #e1e3e5;
}
#container {
  width: 1400px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
}
.content-wrapper {
  min-height: 40vh;
}
.active {
  background: #555;
  color: #fff;
}
.hidden {
  display: none;
}
.bg-red {
  background: #fff4f3;
}
.bg-blue {
  background: #eff8fd;
}
.bg-green {
  background: #f5fff3;
}
.bg-yellow {
  background: #f8f8dd;
}
</style>
