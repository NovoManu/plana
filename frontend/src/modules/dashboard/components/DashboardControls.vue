<template>
  <div class="action">
    <div class="action-left">
      <div class="action-left-item">
        <Button label="Last Month" class="p-button-outlined mr-2" @click="setLastMonth" />
        <Button label="Last Quarter" class="p-button-outlined mr-2" @click="setLastQuarter" />
        <Button label="Last Year" class="p-button-outlined" @click="setLastYear" />
      </div>
      <Calendar class="action-left-item" v-model="date" selection-mode="range" />
      <Dropdown
        :model-value="configuration.product"
        class="action-left-item"
        :options="products"
        option-label="name"
        option-value="name"
        placeholder="Select product"
      />
    </div>
    <Listbox
      :model-value="configuration.country"
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
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Dropdown from 'primevue/dropdown'
  import Calendar from 'primevue/calendar'
  import Button from 'primevue/button'
  import Listbox from 'primevue/listbox'
  import { ICountry, IChartConfiguration } from '@/modules/dashboard/types'
  import { IProductFE } from '@/modules/dashboard/services/types'

  const countries: ICountry[] = [
    { name: 'Germany', icon: require('@/assets/img/germany.png') },
    { name: 'United Kingdom', icon: require('@/assets/img/uk.png') },
    { name: 'France', icon: require('@/assets/img/france.png') },
  ]

  interface IData {
    countries: ICountry[]
    date: any[]
  }

  const getPeriod = (diff: number): Date[] => {
    const date = new Date()
    const start = new Date(date.setMonth(date.getMonth() - diff))
    const end = new Date()
    return [start, end]
  }

  export default defineComponent({
    name: 'DashboardControls',
    components: { Dropdown, Calendar, Button, Listbox },
    props: {
      configuration: {
        type: Object as PropType<IChartConfiguration>,
        required: true,
      },
      products: {
        type: Array as PropType<IProductFE[]>,
        required: true,
      },
    },
    emits: ['setConfiguration'],
    data(): IData {
      return {
        countries,
        date: [],
      }
    },
    created() {
      this.$watch('date', (dates: string[]) => {
        this.setConfiguration('dates', dates)
      })
    },
    methods: {
      setLastMonth(): void {
        const [start, end] = getPeriod(1)
        this.setConfiguration('dates', [start.toString(), end.toString()])
        this.date = [start, end]
      },
      setLastQuarter(): void {
        const [start, end] = getPeriod(3)
        this.setConfiguration('dates', [start.toString(), end.toString()])
        this.date = [start, end]
      },
      setLastYear(): void {
        const [start, end] = getPeriod(12)
        this.setConfiguration('dates', [start.toString(), end.toString()])
        this.date = [start, end]
      },
      setConfiguration(property: string, value: string | string[]) {
        const copy = { ...this.configuration }
        if (Array.isArray(value)) {
          const [begin, end] = value
          copy.begin = begin
          copy.end = end
        } else {
          copy[property] = value
        }
        this.$emit('setConfiguration', copy)
      },
    },
  })
</script>

<style lang="scss" scoped></style>
