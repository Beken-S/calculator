import { mount } from '@vue/test-utils';
import TestComponent from '@/components/TestComponent.vue';

describe('TestComponent', () => {
  test('Content of TestComponent', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        message: 'Hello from test!',
      },
    });
    expect(wrapper.text()).toEqual(
      'The message is: Hello from test!',
    );
  });
});
