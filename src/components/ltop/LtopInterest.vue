<template>
    <div>
        <div>
            <span>관심그룹</span>
            <select name="interestGroup" id="interestGroup">
                <option value="defalut">기본그룹</option>
            </select>
            <button>등록/수정</button>
            <button>조회</button>
            <button @click="openSocket">연결</button>
            <button @click="closeSocket">닫기</button>
        </div>
        <table id="table-data">
            <thead>
                <tr class="bg-blue">
                    <th>종목명</th>
                    <th>현재가</th>
                    <th>대비</th>
                    <th>등락률(%)</th>
                    <th>거래량</th>
                    <th>매도호가</th>
                    <th>매도잔량</th>
                    <th>매수호가</th>
                    <th>매수잔량</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="005930" @click="selectItem">삼성전자</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td id="000660" @click="selectItem">SK하이닉스</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td id="110000" v-if="msg.code == 'KRW-DOGE'" @click="selectItem">KRW-DOGE</td>
                    <td v-else>-</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td id="110001" v-if="msg.code == 'KRW-XRP'" @click="selectItem">KRW-XRP</td>
                    <td v-else>-</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td id="110000" @click="selectItem">{{ msg.code }}</td>
                    <td>{{ msg.trade_price }}</td>
                    <td>{{ msg.change_price }}</td>
                    <td>{{ msg.change_rate }}</td>
                    <td>{{ msg.trade_volume }}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useItemStore } from '@/stores/itemStore'
import { useSocketStore } from '@/stores/socketStore'
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

const itemStore = useItemStore();
const selectItem = (e) => {
    itemStore.latest.stockId = e.target.id;
    itemStore.latest.stockName = e.target.innerText;
}
const ticker = useSocketStore();
const { openSocket, closeSocket } = ticker
const { msg } = storeToRefs(ticker)

onMounted(() => {
    openSocket()
})
onUnmounted(() => {
    closeSocket()
})

</script>

<style scoped>
#table-data {
    width: 98%;
}
</style>