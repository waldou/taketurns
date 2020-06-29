import { shallowMount } from '@vue/test-utils'
import Navbar from './index.vue'

it('renders', () => {
  const wrapper = shallowMount(Navbar)
  expect(wrapper.find('.navbar').exists()).toBe(true)
})