<template>
  <div>
    <div>
      <h3>계좌번호</h3>
      <select name="balance" id="balance">
        <option value="{{ userAccount }}">{{ userAccount }}</option>
      </select>
      <h3>{{ userName }}</h3>
      <h3>{{ currentItem.code }}</h3>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>구분</th>
            <th class="bg-yellow">현금가능(100%)</th>
            <th class="bg-yellow">현금최대(최대)</th>
            <th class="bg-blue">신용가능(100%)</th>
            <th class="bg-blue">신용최대(최대)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>주문가능수량</td>
            <td>{{ maxCount.bal }}</td>
            <td>{{ maxCount.balMax }}</td>
            <td>{{ maxCount.crd }}</td>
            <td>{{ maxCount.crdMax }}</td>
          </tr>
          <tr>
            <td>주문가능금액</td>
            <td>{{ balance.toLocaleString('ko-KR') }}</td>
            <td>{{ balance_max.toLocaleString('ko-KR') }}</td>
            <td>{{ credit.toLocaleString('ko-KR') }}</td>
            <td>{{ credit_max.toLocaleString('ko-KR') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useItemStore } from '@/stores/itemStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { reactive, watch } from 'vue'

const userStore = useUserStore()
const { userName, userAccount, balance, balance_max, credit, credit_max } = storeToRefs(userStore)

const itemStore = useItemStore()
const { currentItem } = itemStore

const maxCount = reactive({
  bal: 0,
  balMax: 0,
  crd: 0,
  crdMax: 0
})

watch(currentItem, () => {
  maxCount.bal = Math.floor(balance.value / currentItem.price)
  maxCount.balMax = Math.floor(balance_max.value / currentItem.price)
  maxCount.crd = Math.floor(credit.value / currentItem.price)
  maxCount.crdMax = Math.floor(credit_max.value / currentItem.price)
})
</script>

<style scoped>
tbody {
  text-align: right;
}
</style>
