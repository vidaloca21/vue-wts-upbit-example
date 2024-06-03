<template>
    <div id="right-bot" class="content-wrapper">
        <button v-for="(_, tab) in tabs"
                :key="tab"
                :class="['tab-button', {active: currentTab === tab}]"
                @click="currentTab = tab">{{ getTabName(tab) }}</button>
        <component :is="tabs[currentTab]" class="tab-content"></component>
    </div>
</template>

<script setup>
import RbotBuy from '@/components/rbot/RbotBuy.vue'
import RbotSell from '@/components/rbot/RbotSell.vue'
import RbotCorrect from '@/components/rbot/RbotCorrect.vue'
import { ref } from 'vue';

const currentTab = ref('RbotBuy');
const tabs = {
    RbotBuy,
    RbotSell,
    RbotCorrect,
}
function getTabName(t) {
    const tabArr = [
        {tab: 'RbotBuy', tabName: '매수'},
        {tab: 'RbotSell', tabName: '매도'},
        {tab: 'RbotCorrect', tabName: '정정/취소'},
    ]
    return tabArr.filter((elm) => elm.tab === t)[0].tabName
}
</script>

<style scoped>

</style>