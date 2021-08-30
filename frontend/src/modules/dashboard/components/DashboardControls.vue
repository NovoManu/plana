<template>
  <div class="action">
    <div class="action-left">
      <div class="action-left-item">
        <Button label="Last Month" class="p-button-outlined mr-2" />
        <Button label="Last Quarter" class="p-button-outlined mr-2" />
        <Button label="Last Year" class="p-button-outlined" />
      </div>
      <Calendar
        class="action-left-item"
        :model-value="configuration.date"
        selection-mode="range"
        :show-button-bar="true"
      />
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
    data() {
      return {
        countries,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
