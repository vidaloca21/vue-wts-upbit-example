/**
 * TODO: 최근 본 아이템 목록 localStorage에 저장
 * Queue(FIFO)로 구현, 중복 시 옛날거 지우기
 */
// queueStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useQueueStore = defineStore('queueStore', () => {
  const queue = ref([])

  const enqueue = (item) => {
    // 중복된 아이템 제거
    queue.value = queue.value.filter((q) => q !== item)
    queue.value = [...queue.value, item] // 새로운 배열을 생성하여 불변성을 유지
    saveToLocalStorage() // 로컬 스토리지에 저장
  }

  const dequeue = () => {
    const [first, ...rest] = queue.value // 배열을 디구조화 할당하여 첫 번째 요소와 나머지를 분리
    queue.value = rest
    saveToLocalStorage() // 로컬 스토리지에 저장
    return first
  }

  const clear = () => {
    queue.value = []
    saveToLocalStorage() // 로컬 스토리지에 저장
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

  // 로컬 스토리지에서 초기 데이터 로드
  loadFromLocalStorage()

  // 큐가 변경될 때마다 로컬 스토리지에 저장
  watch(queue, saveToLocalStorage, { deep: true })

  return { queue, enqueue, dequeue, clear }
})
