<template>
  <div class="container">
    <DashboardControls :configuration="configuration" :products="products" />
    <div class="chart-container">
      <BarChart v-if="isChartVisible" :labels="labels" :datasets="datasets" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { emissionsService } from '@/modules/dashboard/services'
  import BarChart from '@/modules/dashboard/components/BarChart.vue'
  import { IChartDataHandler, ChartDataHandler } from '@/utils/ChartDataHandler'
  import { ChartDataset } from 'chart.js'
  import { IProductFE } from '@/modules/dashboard/services/types'
  import { IChartConfiguration } from '@/modules/dashboard/types'

  import DashboardControls from '@/modules/dashboard/components/DashboardControls.vue'

  interface IData {
    loading: boolean
    products: IProductFE[]
    chartData: IChartDataHandler | null
    configuration: IChartConfiguration
  }

  export default defineComponent({
    name: 'Dashboard',
    components: { DashboardControls, BarChart },
    data(): IData {
      return {
        loading: false,
        products: [],
        chartData: null,
        configuration: {
          product: null,
          date: null,
          country: null,
        },
      }
    },
    computed: {
      labels(): string[] | null {
        if (!this.chartData) return null
        return this.chartData.getLabels()
      },
      datasets(): ChartDataset[] | null {
        if (!this.chartData) return null
        return this.chartData.getBarChartDatasets()
      },
      isChartVisible(): boolean {
        return !!(!this.loading && this.labels && this.datasets)
      },
    },
    created() {
      this.$watch(
        'configuration',
        async () => {
          await this.loadNewData()
        },
        { deep: true },
      )
    },
    async mounted() {
      this.products = await emissionsService.getProducts()
      this.configuration.product = this.products[0].name
      await this.loadNewData()
    },
    methods: {
      async loadNewData() {
        this.loading = true
        try {
          const average = await emissionsService.getProductAverage(this.configuration.product as string, { limit: 20 })
          this.chartData = new ChartDataHandler(average)
        } finally {
          this.loading = false
        }
      },
    },
  })
</script>

<style lang="scss">
  .container {
    padding: 1.75rem;
  }
  .action {
    margin-bottom: 1.75rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .action-left {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    &-item {
      max-width: 100%;
      margin-right: 1rem;
      margin-bottom: 1rem;
      display: flex;
    }
  }
  .flag {
    width: 1rem;
    height: 0.75rem;
    margin-right: 0.5rem;
  }
  .chart-container {
    height: 500px;
    max-height: 100%;
  }
</style>
