<template>
  <canvas ref="bar-chart" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Chart, ChartItem, registerables } from 'chart.js'

  export default defineComponent({
    name: 'BarChart',
    props: {
      labels: {
        default: () => [],
      },
      datasets: {
        default: () => [],
      },
    },
    mounted() {
      const ctx = this.$refs['bar-chart'] as ChartItem
      Chart.register(...registerables)
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },
  })
</script>
