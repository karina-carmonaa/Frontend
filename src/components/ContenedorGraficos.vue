<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartData="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'

export default {
  name: 'ContenedorGraficos',
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: {
           labels: ['January', 'February'],
            datasets: [{
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: [10, 20, 30, 40, 50, 60, 70]
                //data: [.40, .20, .50] // el último número lo que hace es saber hasta donde llega la gráfica
            }]
      },
    options: {
        responsive: true,
        maintainAspectRatio: false
      }
  }),
  async mounted () {
    this.loaded = false
    try {
      //const { userlist } = await fetch('/api/userlist')
      //this.Years = ['January', 'February']
      //this.Prices = [.40, .20, .50, .10, .2]
      console.log("true", this.chartdata)
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>