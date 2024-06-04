<template>
    <h3>{{ currentItem }}</h3>
    <div id="chart"></div>
</template>

<script setup>
import axios from 'axios'
import ApexCharts from 'apexcharts'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemStore } from '@/stores/itemStore'

const itemStore = useItemStore();
const { currentItem } = storeToRefs(itemStore);

const params = {
    market: currentItem.value,
    to: '2024-06-03T00:00:00+09:00',
    count: 20,
    convertingPriceUnit: 'KRW',
}
const getAxios = () => {
    if (!currentItem.value) {
        return
    }
    axios
        .get("https://api.upbit.com/v1/candles/days", {params})
        .then(function(response) {
            const options = {
                series: [{
                    // [timestamp,O,H,L,C]
                    data: response.data?.map((d) => {
                        return [
                            new Date(d.candle_date_time_kst),
                            d.opening_price,
                            d.high_price,
                            d.low_price,
                            d.trade_price,
                        ]
                    })
                }],
                chart: {
                    type: "candlestick",
                    height: 370,
                    width: 700,
                    background: "transparent",
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 250,
                        animateGradually: {
                            enabled: true,
                            delay: 50
                        },
                    }
                },
                xaxis: {
                    type: 'datetime',
                },
                plotOptions: {
                    candlestick: {
                        wick: {
                            useFillColor: true,
                        }
                    }
                },
            }
            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        })
        .catch((error) => console.log(error) )
}

onMounted(() => {
    getAxios();
})
watch(
    ()=> currentItem.value,
    () => {
        $("#chart").empty()
        params.market = currentItem.value;
        getAxios();
    }
)
</script>

<style scoped>

</style>