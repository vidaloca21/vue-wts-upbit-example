/**
 * 최근 본 아이템 목록 localStorage에 저장
 * Queue(FIFO)로 구현, 중복 시 옛날거 지우기
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useQueueStore = defineStore('queueStore', () => {
  const queue = ref([])

  const enqueue = (item) => {
    queue.value = queue.value.filter((q) => q !== item)
    queue.value = [...queue.value, item]
    saveToLocalStorage()
  }

  const dequeue = () => {
    const [first, ...rest] = queue.value
    queue.value = rest
    saveToLocalStorage()
    return first
  }

  const clear = () => {
    queue.value = []
    saveToLocalStorage()
    console.log('Queue Empty')
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('queue', JSON.stringify(queue.value))
  }

  const loadFromLocalStorage = () => {
    const savedQueue = JSON.parse(localStorage.getItem('queue'))
    if (savedQueue && Array.isArray(savedQueue)) {
      queue.value = savedQueue
    }
  }

  loadFromLocalStorage()

  watch(queue, saveToLocalStorage, { deep: true })

  return { queue, enqueue, dequeue, clear }
})
