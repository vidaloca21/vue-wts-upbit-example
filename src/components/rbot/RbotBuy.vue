<template>
    <div class="content-box bg-red">
        <h3>매수</h3>
        <p>{{ userStore.userName }}</p>
        <p>{{ userStore.userAccount }}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore();
</script>

<style scoped>
.content-box {
    border: 1px solid #dda8a3;
}
</style>