<template>
    <div class="content-box bg-red">
        <h3>매수</h3>
        <p>{{ userStore.userName }}</p>
        <p>{{ userStore.userAccount }}</p>
        <p>{{ itemStore.latest.stockId }}</p>
        <p>{{ itemStore.latest.stockName }}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useItemStore } from '@/stores/itemStore'

const userStore = useUserStore();
const itemStore = useItemStore();
</script>

<style scoped>
.content-box {
    border: 1px solid #dda8a3;
}
</style>