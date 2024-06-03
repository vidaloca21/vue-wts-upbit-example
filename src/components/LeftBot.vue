<template>
    <div id="left-bot" class="content-wrapper">
        <button v-for="(_, tab) in tabs"
                :key="tab"
                :class="['tab-button', {active: currentTab === tab}]"
                @click="currentTab = tab">{{ getTabName(tab) }}</button>
        <component :is="tabs[currentTab]" class="tab-content"></component>
    </div>
</template>

<script setup>
import LbotBuy from '@/components/lbot/LbotBuy.vue'
import LbotSell from '@/components/lbot/LbotSell.vue'
import LbotYet from '@/components/lbot/LbotYet.vue'
import LbotHave from '@/components/lbot/LbotHave.vue'
import { ref } from 'vue';

const currentTab = ref('LbotBuy');
const tabs = {
    LbotBuy,
    LbotSell,
    LbotYet,
    LbotHave,
}
function getTabName(t) {
    const tabArr = [
        {tab: 'LbotBuy', tabName: '매수가능'},
        {tab: 'LbotSell', tabName: '매도가능'},
        {tab: 'LbotYet', tabName: '미체결'},
        {tab: 'LbotHave', tabName: '보유잔고'},
    ]
    return tabArr.filter((elm) => elm.tab === t)[0].tabName
}
</script>

<style scoped>

</style>