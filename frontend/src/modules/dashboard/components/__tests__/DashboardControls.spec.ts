import { VueWrapper } from '@vue/test-utils'
import DashboardControls from '@/modules/dashboard/components/DashboardControls.vue'
import { IChartConfiguration } from '@/modules/dashboard/types'
import { IProductFE } from '@/modules/dashboard/services/types'
import { createTestWrapper } from '@/modules/dashboard/testHelpers'

const configuration: IChartConfiguration = {
  country: 'de',
  begin: '2021-01-01',
  end: '2021-01-05',
  product: 'ozone',
}

const products: IProductFE[] = [{ name: 'Ozone', productVariable: 'ozone' }]

const wrapper: VueWrapper<any> = createTestWrapper(DashboardControls, {
  configuration,
  products,
})

describe('DashboardControls', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('emits on last month button click', async () => {
    const button = wrapper.find('[data-test="dashboard-control-last-month-button"]')
    await button.trigger('click')
    expect(wrapper.emitted().setConfiguration).toBeTruthy()
  })

  it('emits on last quarter button click', async () => {
    const button = wrapper.find('[data-test="dashboard-control-last-quarter-button"]')
    await button.trigger('click')
    expect(wrapper.emitted().setConfiguration).toBeTruthy()
  })

  it('emits on last year button click', async () => {
    const button = wrapper.find('[data-test="dashboard-control-last-year-button"]')
    await button.trigger('click')
    expect(wrapper.emitted().setConfiguration).toBeTruthy()
  })

  it('emits on calendar change', async () => {
    const calendar = wrapper.find('[data-test="dashboard-control-calendar"]')
    await calendar.trigger('change')
    expect(wrapper.emitted().setConfiguration).toBeTruthy()
  })

  it('emits on product selector change', async () => {
    const selector = wrapper.find('[data-test="dashboard-control-product-selector"]')
    await selector.trigger('change')
    expect(wrapper.emitted().setConfiguration).toBeTruthy()
  })

  it('emits on product selector change', async () => {
    const selector = wrapper.find('[data-test="dashboard-control-country-selector"]')
    await selector.trigger('change')
    expect(wrapper.emitted().setConfiguration).toBeTruthy()
  })
})
