<template>
    <div>
        <h3>현재가</h3>
        <p>{{ itemStore.latest.stockId }}</p>
        <p>{{ itemStore.latest.stockName }}</p>
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
                <tr>
                    <td>{{ msg.trade_price }}</td>
                    <td>{{ msg.opening_price }}</td>
                    <td>{{ msg.prev_closing_price }}</td>
                    <td>{{ msg.low_price }}</td>
                    <td>{{ msg.lowest_52_week_price }}</td>
                    <td>{{ msg.high_price }}</td>
                    <td>{{ msg.highest_52_week_price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useItemStore } from '@/stores/itemStore'
import { useSocketStore } from '@/stores/socketStore'
import { storeToRefs } from 'pinia'

const itemStore = useItemStore();
const ticker = useSocketStore();
const { msg } = storeToRefs(ticker)
</script>

<style scoped>
table {
    width: 80%;
}
th, td {
    text-align: right;
}
</style>