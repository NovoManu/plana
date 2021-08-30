import { mount, VueWrapper } from '@vue/test-utils'
import AppLayoutMain from '@/layouts/AppLayoutMain.vue'

const wrapper: VueWrapper<any> = mount(AppLayoutMain)

describe('AppLayoutMain', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('shows logo', () => {
    const logo = wrapper.find('[data-test="app-layout-logo"]')
    expect(logo.text()).toEqual('Plan A')
  })
})
