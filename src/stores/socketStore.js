import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

let ws = undefined;
const ENDPOINT = 'wss://api.upbit.com/websocket/v1';
const MARKET_INFO =[{
                        ticket: "test"
                    },
                    {
                        type: "ticker",
                        codes: ["KRW-DOGE"]
                    },
                    {
                        format: "DEFAULT"
                    }]
export const useSocketStore = defineStore('socketStore', () => {
    const sendMsg = JSON.stringify(MARKET_INFO)
    const state = reactive({
        msg: {},
    });

    const openSocket = () => {
        if (!ws) {
            ws = new WebSocket(ENDPOINT);
        }

        ws.onopen = () => {
            ws.send(sendMsg)
            console.log("Socket Open")
        }
   
        ws.onmessage = async (result) => {
            try {
                const recvMsg = await new Response(result.data).json();
                Object.assign(state.msg, recvMsg)
                console.log(state.msg)
            } catch (error) {
                console.log(error)
            }
        }

        ws.onclose = () => {
            console.log("Socket Closed")
        }
    }

    const closeSocket = () => {
        if(ws) {
            ws.close();
            ws = undefined;
        }
    }

    return { ...toRefs(state), openSocket, closeSocket }
})