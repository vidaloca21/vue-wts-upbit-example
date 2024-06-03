import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const userName = ref('홍길동')
    const userAccount = ref('1212-1312-3123')
    const balance = ref(11700)

    return { userName, userAccount, balance }
})
