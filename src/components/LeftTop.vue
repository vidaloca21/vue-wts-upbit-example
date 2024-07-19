<template>
  <div id="left-top" class="content-wrapper">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ getTabName(tab) }}
    </button>
    <keep-alive>
      <component :is="tabs[currentTab]" class="tab-content"></component>
    </keep-alive>
  </div>
</template>

<script setup>
import LtopInterest from '@/components/ltop/LtopInterest.vue'
import LtopDaily from '@/components/ltop/LtopDaily.vue'
import LtopUpdown from '@/components/ltop/LtopUpdown.vue'

import { ref } from 'vue'

const currentTab = ref('LtopInterest')
const tabs = {
  LtopInterest,
  LtopDaily,
  LtopUpdown
}
const getTabName = (t) => {
  const tabArr = [
    { tab: 'LtopInterest', tabName: '관심' },
    { tab: 'LtopDaily', tabName: '일별' },
    { tab: 'LtopUpdown', tabName: '상승하락' }
  ]
  return tabArr.filter((elm) => elm.tab === t)[0].tabName
}
</script>

<style scoped></style>
