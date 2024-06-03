<template>
    <div id="right-top" class="content-wrapper">
        <button v-for="(_, tab) in tabs"
                :key="tab"
                :class="['tab-button', {active: currentTab === tab}]"
                @click="currentTab = tab">{{ getTabName(tab) }}</button>
        <component :is="tabs[currentTab]" class="tab-content"></component>
    </div>
</template>

<script setup>
import RtopCurrent from '@/components/rtop/RtopCurrent.vue'
import RtopTrade from '@/components/rtop/RtopTrade.vue'
import RtopFinish from '@/components/rtop/RtopFinish.vue'
import RtopBasic from '@/components/rtop/RtopBasic.vue'
import { ref } from 'vue';

const currentTab = ref('RtopCurrent');
const tabs = {
    RtopCurrent,
    RtopFinish,
    RtopTrade,
    RtopBasic,
}
function getTabName(t) {
    const tabArr = [
        {tab: 'RtopCurrent', tabName: '현재가'},
        {tab: 'RtopFinish', tabName: '체결가'},
        {tab: 'RtopTrade', tabName: '거래원'},
        {tab: 'RtopBasic', tabName: '차트'},
    ]
    return tabArr.filter((elm) => elm.tab === t)[0].tabName
}
</script>

<style scoped>

</style>