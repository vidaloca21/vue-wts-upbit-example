<template>
  <div class="content-box bg-red">
    <h3>매수</h3>
    <form action="">
      <div id="frm-div">
        <div class="mt-4">
          <label for="userAccount" class="label-wd">계좌번호</label>
          <select name="userAccount" v-model="orderForm.userAccount">
            <option>{{ userStore.userAccount }}</option>
          </select>
          <input
            name="userName"
            type="text"
            v-model="orderForm.userName"
            class="readonly"
            readonly
          />
        </div>
        <div class="mt-4">
          <label for="password" class="label-wd">비밀번호</label>
          <input name="password" type="password" v-model="orderForm.password" autoComplete="off" />
          <button type="button">조회</button>
        </div>
        <div class="mt-4">
          <label for="itemCode" class="label-wd">종목코드</label>
          <select name="itemCode">
            <option :value="currentItem.code">{{ currentItem.code }}</option>
          </select>
          <input name="itemName" type="text" :value="currentItem.code" class="readonly" readonly />
        </div>
        <div class="mt-4">
          <label for="itemPrice" class="label-wd">단가</label>
          <button type="button" @click="orderBtnFn('p', -1)">-</button>
          <input name="itemPrice" type="number" v-model="orderForm.itemPrice" />
          <button type="button" @click="orderBtnFn('p', 1)">+</button>
        </div>
        <div class="mt-4">
          <label for="itemQuantity" class="label-wd">수량</label>
          <button type="button" @click="orderBtnFn('q', -1)">-</button>
          <input name="itemQuantity" type="number" v-model="orderForm.itemQuantity" />
          <button type="button" @click="orderBtnFn('q', 1)">+</button>
        </div>
        <div class="mt-4">
          <label for="isCredit" class="label-wd">신용구분</label>
          <input name="isCredit" type="checkbox" v-model="orderForm.isCredit" />
          <select name="orderVal" :disabled="!orderForm.isCredit">
            <template v-if="!orderForm.isCredit">
              <option value="">현금주문</option>
            </template>
            <template v-else>
              <option value="">현금최대</option>
              <option value="">신용주문</option>
              <option value="">신용최대</option>
            </template>
          </select>
        </div>
        <button @click.prevent="sendOrder">매수</button>
        <button @click.prevent="getHoga">호가조회</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useItemStore } from '@/stores/itemStore'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { reactive } from 'vue'

const userStore = useUserStore()
const itemStore = useItemStore()
const { currentItem } = itemStore

const params = {
  markets: currentItem.code,
  level: 0
}
const getHoga = async () => {
  const res = await axios.get('https://api.upbit.com/v1/orderbook', { params })
  console.log(res.data[0])
}

const orderForm = reactive({
  userName: userStore.userName,
  userAccount: userStore.userAccount,
  password: '',
  itemCode: currentItem.code,
  itemPrice: 10000,
  itemQuantity: 1,
  isCredit: false
})

const orderBtnFn = (type, action) => {
  if (type == 'p' && action === 1) {
    orderForm.orderPrice++
  } else if (type == 'p' && action === -1 && orderForm.orderPrice > 0) {
    orderForm.orderPrice--
  } else if (type == 'q' && action === 1) {
    orderForm.orderQuantity++
  } else if (type == 'q' && action === -1 && orderForm.orderQuantity > 1) {
    orderForm.orderQuantity--
  } else {
    return
  }
}

const sendOrder = () => {
  console.log(orderForm)
}
</script>

<style scoped>
.content-box {
  border: 1px solid #dda8a3;
}
#frm-div {
  font-size: 14px;
  label {
    font-weight: bold;
  }
  .readonly {
    width: min-content;
    background-color: #e1e3e5;
    border: 1px solid #e1e3e5;
  }
}
.mt-4 {
  margin-top: 4px;
}
.label-wd {
  width: 80px;
}
</style>
