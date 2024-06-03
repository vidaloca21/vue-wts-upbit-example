import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useItemStore = defineStore('itemStore', () => {
    const latest = reactive({stockId: '005930' , stockName: '삼성전자'})
    const history = reactive([
        {stockName: '005930', stockId: '삼성전자'},
    ])

    return { latest, history }
})
