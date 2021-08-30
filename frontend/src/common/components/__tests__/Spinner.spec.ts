import { mount, VueWrapper } from '@vue/test-utils'
import Spinner from '@/common/components/Spinner.vue'

const wrapper: VueWrapper<any> = mount(Spinner)

describe('Spinner', () => {
  it('renders', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
