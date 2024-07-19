import { reactive, ref, toRefs } from 'vue'
import { defineStore } from 'pinia'

export const useStockStore = defineStore('stockStore', () => {
  let socket = ref(null)
  const state = reactive({ message: {} })
  const LS_INVEST_WEBSOCKET_DOMAIN = 'wss://openapi.ls-sec.co.kr'
  const LS_INVEST_WEBSOCKET_URL = '/websocket'
  const LS_INVEST_PROD_PORT = '9443'
  const LS_INVEST_STAGING_PORT = '29443'

  // 운영 도메인으로 요청
  const url = `${LS_INVEST_WEBSOCKET_DOMAIN}:${LS_INVEST_PROD_PORT}${LS_INVEST_WEBSOCKET_URL}`
  const LS_INVEST_DATA_REFERENCE = {
    header: {
      token: '',
      tr_type: '' // [1:계좌등록,2:계좌해제,3:실시간등록,4:실시간해제]
    },
    body: {
      tr_cd: '', //LS증권 거래코드
      tr_key: '' //단축코드 6자리 또는 8자리 (단건, 연속), (계좌등록/해제 일 경우 필수값 아님)
    }
  }

  function open() {
    console.log('open')

    socket.value = getInstance()

    socket.value.onopen = () => {
      const data = Object.assign({}, LS_INVEST_DATA_REFERENCE)
      // test
      data.header.token = localStorage.getItem('apiToken')
      data.header.tr_type = '3'
      data.body.tr_cd = 'H1_'
      data.body.tr_key = '459580'

      sendMessage(JSON.stringify(data))
    }

    socket.value.onmessage = async (data) => {
      // console.log('onmessage data', data.data)
      const result = await new Response(data.data).json()
      // console.log('onmessage result', result)
      state.message = { ...result }
    }

    socket.value.onclose = () => {
      console.log('onclose')
      setSocket(null)
    }
  }

  function close() {
    console.log('close')
    if (socket.value) {
      socket.value.close()
    }
  }

  function getInstance() {
    console.log('getInstance')
    if (socket.value) {
      return socket.value
    }

    return new WebSocket(url)
  }

  function getUrl() {}

  function sendMessage(message = '') {
    console.log('sendMessage', message)
    if (!socket.value) {
      return
    }

    if (socket.value?.readyState !== WebSocket.OPEN) {
      return
    }

    socket.value.send(message)
  }

  function setSocket(value) {
    console.log('setSocket', value)
    socket.value = value
  }

  return {
    socket,
    ...toRefs(state),
    open,
    close
  }
})
