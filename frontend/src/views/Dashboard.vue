<template>
  <div class="container">
    <div class="action">
      <div class="action-left">
        <div class="action-left-item">
          <Button label="Primary" class="p-button-outlined mr-2" />
          <Button label="Primary" class="p-button-outlined mr-2" />
          <Button label="Primary" class="p-button-outlined" />
        </div>
        <Calendar
          class="action-left-item"
          v-model="configuration.date"
          selection-mode="range"
          :show-button-bar="true"
        />
        <Dropdown
          class="action-left-item"
          v-model="configuration.product"
          :options="products"
          option-label="name"
          option-value="name"
          placeholder="Select product"
        />

      </div>
      <Listbox
        v-model="configuration.country"
        :options="countries"
        option-label="name"
        :filter="true"
        listStyle="max-height:250px"
      >
        <template #option="slotProps">
          <div>
            <img :alt="slotProps.option.icon" :src="slotProps.option.icon" class="flag" />
            <span>{{ slotProps.option.name }}</span>
          </div>
        </template>
      </Listbox>
    </div>
    <div class="chart-container">
      <BarChart v-if="!loading && labels && datasets" :labels="labels" :datasets="datasets" />
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
  import Dropdown from 'primevue/dropdown'
  import Calendar from 'primevue/calendar'
  import Button from 'primevue/button'
  import Listbox from 'primevue/listbox'

  interface IChartConfiguration {
    product: string | null
    date: string[] | null
  }

  interface ICountry {
    name: string
    icon: string
  }

  interface IData {
    loading: boolean
    products: IProductFE[]
    countries: ICountry[]
    chartData: IChartDataHandler | null
    configuration: IChartConfiguration
  }

  const countries: ICountry[] = [
    { name: 'Germany', icon: require('@/assets/img/germany.png') },
    { name: 'United Kingdom', icon: require('@/assets/img/uk.png') },
    { name: 'France', icon: require('@/assets/img/france.png') },
  ]

  export default defineComponent({
    name: 'Dashboard',
    components: { BarChart, Dropdown, Calendar, Button, Listbox },
    data(): IData {
      return {
        loading: false,
        products: [],
        countries,
        chartData: null,
        configuration: {
          product: null,
          date: null,
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
    align-items: start;
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
