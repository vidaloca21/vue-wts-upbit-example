import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

let ws = undefined
const ENDPOINT = 'wss://api.upbit.com/websocket/v1'
const MARKET_INFO = JSON.stringify([
  { ticket: 'test' },
  {
    type: 'ticker',
    codes: [
      'KRW-BTC',
      'KRW-ETH',
      'KRW-WAVES',
      'KRW-XEM',
      'KRW-SOL',
      'KRW-SHIB',
      'KRW-DOGE',
      'KRW-XRP',
      'KRW-STX',
      'KRW-SAND'
    ]
  },
  { format: 'DEFAULT' }
])

export const useSocketStore = defineStore('socketStore', () => {
  const state = reactive({
    messages: {}
  })

  const openSocket = () => {
    if (!ws) {
      ws = new WebSocket(ENDPOINT)
    }

    ws.onopen = () => {
      ws.send(MARKET_INFO)
      console.log('Socket Open')
    }

    ws.onmessage = async (result) => {
      try {
        const recvMsg = await new Response(result.data).json()
        if (recvMsg && recvMsg.code) {
          state.messages = { ...state.messages, [recvMsg.code]: { ...recvMsg } }
          // console.log('Message received:', recvMsg)
        } else {
          console.error('Invalid message format:', recvMsg)
        }
      } catch (error) {
        console.error('Error processing message:', error)
      }
    }

    ws.onclose = () => {
      console.log('Socket Closed')
    }
  }

  const closeSocket = () => {
    if (ws) {
      ws.close()
      ws = undefined
    }
  }

  return {
    ...toRefs(state),
    openSocket,
    closeSocket
  }
})
