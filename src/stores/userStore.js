import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const userName = ref('홍길동')
  const userAccount = ref('1212-1312-3123')
  const balance = ref(686400)
  const balance_max = computed(() => balance.value * 1.2)
  const credit = computed(() => balance.value * 2)
  const credit_max = computed(() => balance.value * 2 * 1.2)

  return { userName, userAccount, balance, balance_max, credit, credit_max }
})
