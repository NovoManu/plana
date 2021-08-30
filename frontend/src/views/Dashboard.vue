<template>
  <div class="container">
    <DashboardControls :configuration="configuration" :products="products" @setConfiguration="setConfiguration" />
    <div class="chart-container">
      <BarChart v-if="isChartVisible" :labels="labels" :datasets="datasets" />
      <div class="spinner-container">
        <Spinner v-if="loading" />
        <span v-if="isNoData" class="no-data">No data</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { emissionsService } from '@/modules/dashboard/services'
  import BarChart from '@/modules/dashboard/components/BarChart.vue'
  import DashboardControls from '@/modules/dashboard/components/DashboardControls.vue'
  import Spinner from '@/common/components/Spinner.vue'
  import { IChartDataHandler, ChartDataHandler } from '@/utils/ChartDataHandler'
  import { ChartDataset } from 'chart.js'
  import { IProductFE, IProductQuery } from '@/modules/dashboard/services/types'
  import { IChartConfiguration } from '@/modules/dashboard/types'

  interface IData {
    loading: boolean
    products: IProductFE[]
    chartData: IChartDataHandler | null
    configuration: IChartConfiguration
  }

  export default defineComponent({
    name: 'Dashboard',
    components: { DashboardControls, BarChart, Spinner },
    data(): IData {
      return {
        loading: false,
        products: [],
        chartData: null,
        configuration: {
          product: null,
          begin: null,
          end: null,
          country: 'de',
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
        return !!(!this.loading && !this.isNoData && this.labels && this.datasets)
      },
      isNoData(): boolean {
        return !!(this.datasets?.length && !this.datasets[0].data.length)
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
      this.setInitialConfiguration()
      await this.loadNewData()
    },
    methods: {
      setInitialConfiguration(): void {
        this.configuration.product = (this.$route.query.product as string) || this.products[0].name
        this.configuration.country = (this.$route.query.country as string) || 'de'
        this.configuration.begin = (this.$route.query.begin as string) || null
        this.configuration.end = (this.$route.query.end as string) || null
      },
      async loadNewData() {
        this.loading = true
        try {
          const begin = this.configuration.begin
            ? new Date(this.configuration.begin).toISOString().split('T')[0]
            : undefined
          const end = this.configuration.end ? new Date(this.configuration.end).toISOString().split('T')[0] : undefined
          const params: IProductQuery = {
            begin,
            end,
            country: this.configuration.country || undefined,
          }
          this.updateCurrentRoute(begin, end, this.configuration.country)
          const average = await emissionsService.getProductAverage(this.configuration.product as string, params)
          this.chartData = new ChartDataHandler(average)
        } finally {
          this.loading = false
        }
      },
      setConfiguration(configuration: IChartConfiguration) {
        this.configuration = configuration
      },
      updateCurrentRoute(begin: string | undefined, end: string | undefined, country: string | null): void {
        this.$router.push({
          path: this.$route.path,
          query: {
            product: this.configuration.product,
            begin,
            end,
            country,
          },
        })
      },
    },
  })
</script>

<style lang="scss">
  $no-data-color: #c0c0c0;

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
  .spinner-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-data {
    font-size: 4rem;
    font-weight: bold;
    color: $no-data-color;
  }
</style>
