<template>
  <div>
    <h3>{{ currentItem.code }}</h3>
    <div id="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import axios from 'axios'
import * as d3 from 'd3'
import { computed, onMounted, ref, watch } from 'vue'
import { useItemStore } from '@/stores/itemStore'

const itemStore = useItemStore()
const { currentItem } = itemStore
const chartItem = computed(() => currentItem.code)

const chartRef = ref(null)
const ticker = ref([])

const params = {
  market: chartItem.value,
  to: '2024-06-16T00:00:00+09:00',
  count: 20,
  convertingPriceUnit: 'KRW'
}

const getAxios = async () => {
  try {
    const res = await axios.get('https://api.upbit.com/v1/candles/days', { params })
    ticker.value = res.data
  } catch (error) {
    console.error(error.message)
  }
}

onMounted(() => {
  if (chartItem.value) {
    getAxios().then(() => {
      drawChart()
    })
  }
})

watch(chartItem, () => {
  chartRef.value.innerHTML = ''
  params.market = chartItem.value
  getAxios().then(() => {
    drawChart()
  })
})

// 데이터가 변경될 때 차트를 다시 그리기 위해 watcher를 추가합니다.
// watch(ticker, (newVal, _) => {
//   if (newVal.length) {
//     drawChart()
//   }
// })

const drawChart = () => {
  const width = 700
  const height = 330
  const marginTop = 20
  const marginRight = 20
  const marginBottom = 30
  const marginLeft = 70

  // Date 파싱
  ticker.value.forEach((d) => {
    d.candle_date_time_kst = new Date(d.candle_date_time_kst)
  })

  const x = d3
    .scaleBand()
    .domain(ticker.value.map((d) => d.candle_date_time_kst).reverse()) // 배열을 역순으로 설정
    .range([marginLeft, width - marginRight])
    .padding(0.2)

  const y = d3
    .scaleLinear()
    .domain([
      d3.min(ticker.value, (d) => d.low_price) * 0.95,
      d3.max(ticker.value, (d) => d.high_price) * 1.05
    ])
    .range([height - marginBottom, marginTop])

  const svg = d3.select(chartRef.value).append('svg').attr('viewBox', [0, 0, width, height])

  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%-m/%-d')))
    .call((g) => g.select('.domain').remove())

  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(
      d3
        .axisLeft(y)
        .tickFormat(d3.format('$~f'))
        .tickValues(d3.scaleLinear().domain(y.domain()).ticks())
    )
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('stroke-opacity', 0.2)
        .attr('x2', width - marginLeft - marginRight)
    )
    .call((g) => g.select('.domain').remove())

  const tooltip = d3
    .select(chartRef.value)
    .append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '10px')
    .style('display', 'none')

  const g = svg
    .append('g')
    .attr('stroke-linecap', 'butt')
    .attr('stroke', 'black')
    .selectAll('g')
    .data(ticker.value)
    .join('g')
    .attr('transform', (d) => `translate(${x(d.candle_date_time_kst)},0)`)

  g.append('line')
    .attr('y1', (d) => y(d.low_price))
    .attr('y2', (d) => y(d.high_price))

  g.append('line')
    .attr('y1', (d) => y(d.opening_price))
    .attr('y2', (d) => y(d.trade_price))
    .attr('stroke-width', x.bandwidth() * 0.7) // 두께를 줄이기 위해 0.7 배 적용
    .attr('stroke', (d) =>
      d.opening_price > d.trade_price
        ? d3.schemeSet1[0]
        : d.trade_price > d.opening_price
          ? d3.schemeSet1[2]
          : d3.schemeSet1[8]
    )
    .on('mouseover', (event, d) => {
      tooltip.style('display', 'block').html(`
          <strong>Date:</strong> ${d3.utcFormat('%B %-d, %Y')(d.candle_date_time_kst)}<br>
          <strong>Open:</strong> ${d3.format('.2f')(d.opening_price)}<br>
          <strong>Close:</strong> ${d3.format('.2f')(d.trade_price)}<br>
          <strong>Low:</strong> ${d3.format('.2f')(d.low_price)}<br>
          <strong>High:</strong> ${d3.format('.2f')(d.high_price)}
        `)
    })
    .on('mousemove', (event) => {
      tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 28 + 'px')
    })
    .on('mouseout', () => {
      tooltip.style('display', 'none')
    })
}
</script>

<style scoped>
#chart {
  min-height: 334px !important;
}
#spinner {
  height: 330px;
  position: absolute;
  top: 0;
}
</style>
