import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('itemStore', () => {
    const currentItem = ref('');
    return { currentItem }
})
