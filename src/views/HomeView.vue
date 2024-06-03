<template>
  <div>
    <h3>주식종합</h3>
    <div id="grid-content">
      <LeftTop />
      <LeftBot />
      <RightTop />
      <RightBot />
    </div>
  </div>
</template>

<script setup>
import LeftTop from '@/components/LeftTop.vue'
import LeftBot from '@/components/LeftBot.vue'
import RightTop from '@/components/RightTop.vue'
import RightBot from '@/components/RightBot.vue'
</script>

<style scoped>
h2 {
  margin: 0;
}
#grid-content {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
#left-top {
  grid-row: 1/2;
  grid-column: 1/2;
}
#right-top {
  grid-row: 1/2;
  grid-column: 2/3;
}
#left-bot {
  grid-row: 2/3;
  grid-column: 1/2;
}
#right-bot {
  grid-row: 2/3;
  grid-column: 2/3;
}
</style>