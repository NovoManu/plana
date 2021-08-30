import { mount, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance, ComponentPropsOptions } from 'vue'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import Listbox from 'primevue/listbox'

export const createTestWrapper = (
  component: ComponentPropsOptions,
  props: any,
): VueWrapper<ComponentPublicInstance<any>> => {
  return mount(component, {
    props,
    global: {
      components: {
        Calendar,
        Dropdown,
        Listbox,
      },
      mocks: {
        $primevue: jest.fn(),
      },
    },
  })
}
