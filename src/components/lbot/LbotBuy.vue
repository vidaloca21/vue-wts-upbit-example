<template>
    <div>
        <div>
            <h3>계좌번호</h3>
            <select name="balance" id="balance">
                <option value="{{ userStore.userAccount }}">{{ userStore.userAccount }}</option>
            </select>
            <h3>{{ userStore.userName }}</h3>
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
                        <td>{{ 0 }}</td>
                        <td>{{ 1}}</td>
                        <td>{{ 0 }}</td>
                        <td>{{ 1 }}</td>
                    </tr>
                    <tr>
                        <td>주문가능금액</td>
                        <td>{{ balCash }}</td>
                        <td>{{ balCash }}</td>
                        <td>{{ balCredit }}</td>
                        <td>{{ balCredit }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue';

const userStore = useUserStore();

let balCash = computed(() => userStore.balance)
let balCredit = computed(() => userStore.balance *2)
</script>

<style scoped>

</style>