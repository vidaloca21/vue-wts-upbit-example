<template>
  <div>
    <div>
      <span>관심그룹</span>
      <select name="interestGroup" id="interestGroup">
        <option value="default">기본그룹</option>
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
        <tr v-for="(message, code) in messages" :key="code" :id="code" @click.stop="selectItem">
          <td>{{ message?.code ?? '데이터 없음' }}</td>
          <td :class="[{onRise: message.change === 'RISE'}, {onFall: message.change === 'FALL'}]">{{ message?.trade_price.toLocaleString('ko-KR') ?? 0 }}</td>
          <td :class="[{onRise: message.change === 'RISE'}, {onFall: message.change === 'FALL'}]">{{ message?.change_price.toLocaleString('ko-KR') ?? 0 }}</td>
          <td :class="[{onRise: message.change === 'RISE'}, {onFall: message.change === 'FALL'}]">{{ message? (message.change_rate*100).toFixed(2) : 0 }} %</td>
          <td>{{ message?.trade_volume.toLocaleString('ko-KR') ?? 0 }}</td>
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
import { useSocketStore } from '@/stores/socketStore'
import { useItemStore } from '@/stores/itemStore'
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

const ticker = useSocketStore()
const itemStore = useItemStore();

const { messages } = storeToRefs(ticker)
const { openSocket, closeSocket } = ticker

const selectItem = (e) => {
    itemStore.currentItem = e.target.closest("tr").id
}


onMounted(() => {
  openSocket()
})
onUnmounted(() => {
  closeSocket()
})
</script>

<style scoped>
#table-data {
  width: 700px;
  table-layout: fixed;
  font-size: 14px;
  text-align: right;
  th:nth-child(3) {
    width: 70px;
  }
  th:nth-child(5) {
    width: 110px;
  }
  th:nth-child(6),
  th:nth-child(7),
  th:nth-child(8),
  th:nth-child(9) {
    width: 63px;
  }
}
.onRise {
    color: blue;
}
.onFall {
    color: red;
}
</style>
