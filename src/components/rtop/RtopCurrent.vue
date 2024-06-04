<template>
    <div>
        <h3>현재가</h3>
        <h3>{{ currentItem }}</h3>
        <table>
            <thead>
                <tr>
                    <th>현재가</th>
                    <th>시가</th>
                    <th>전일종가</th>
                    <th>저가</th>
                    <th>52주최저가</th>
                    <th>고가</th>
                    <th>52주최고가</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="getCurrentItem">
                    <td>{{ getCurrentItem.trade_price }}</td>
                    <td>{{ getCurrentItem.opening_price }}</td>
                    <td>{{ getCurrentItem.prev_closing_price }}</td>
                    <td>{{ getCurrentItem.low_price }}</td>
                    <td>{{ getCurrentItem.lowest_52_week_price }}</td>
                    <td>{{ getCurrentItem.high_price }}</td>
                    <td>{{ getCurrentItem.highest_52_week_price }}</td>
                </tr>
                <tr v-else></tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useSocketStore } from '@/stores/socketStore'
import { useItemStore } from '@/stores/itemStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';

const ticker = useSocketStore();
const itemStore = useItemStore();

const { messages } = storeToRefs(ticker)
const { currentItem } = storeToRefs(itemStore);
const getCurrentItem = computed(() => {
    return messages.value[currentItem.value];
})
</script>

<style scoped>
table {
    width: 80%;
}
th, td {
    text-align: right;
}
</style>