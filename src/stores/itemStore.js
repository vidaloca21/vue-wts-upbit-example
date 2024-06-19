import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useItemStore = defineStore('itemStore', () => {
  const currentItem = reactive({
    code: '',
    price: 0
  })

  return { currentItem }
})
