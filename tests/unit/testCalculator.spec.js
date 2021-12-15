import { mount } from '@vue/test-utils';
import Calculator from '@/components/Calculator.vue';

describe('Calculator input tests', () => {
  test('Test operand1 input value', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');

    operand1Input.setValue('1');

    expect(wrapper.vm.operand1).toBe(1);
  });
  test('Test operand2 input value', () => {
    const wrapper = mount(Calculator);
    const operand2Input = wrapper.find('input[name=operand2]');

    operand2Input.setValue('1');

    expect(wrapper.vm.operand2).toBe(1);
  });
});

describe('Calculator operations tests', () => {
  test('Test sum operation', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="+"]');

    operand1Input.setValue('100');
    operand2Input.setValue('5');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.result).toBe(105);
  });

  test('Test sub operation', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="-"]');

    operand1Input.setValue('66');
    operand2Input.setValue('26');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.result).toBe(40);
  });

  test('Test mult operation', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="*"]');

    operand1Input.setValue('5');
    operand2Input.setValue('5');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.result).toBe(25);
  });

  test('Test div operation', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="/"]');

    operand1Input.setValue('24');
    operand2Input.setValue('6');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.result).toBe(4);
  });

  test('Test div operation (division by zero)', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="/"]');

    operand1Input.setValue('33');
    operand2Input.setValue('0');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.error).toBe('Деление на ноль.');
  });

  test('Test integerDiv operation', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="//"]');

    operand1Input.setValue('3');
    operand2Input.setValue('2');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.result).toBe(1);
  });

  test('Test integerDiv operation (division by zero)', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="//"]');

    operand1Input.setValue('27');
    operand2Input.setValue('0');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.error).toBe('Деление на ноль.');
  });

  test('Test pow operation', () => {
    const wrapper = mount(Calculator);
    const operand1Input = wrapper.find('input[name=operand1]');
    const operand2Input = wrapper.find('input[name=operand2]');
    const sumOperationButton = wrapper.find('button[name="^"]');

    operand1Input.setValue('2');
    operand2Input.setValue('3');
    sumOperationButton.trigger('click');

    expect(wrapper.vm.result).toBe(8);
  });
});

describe('Calculator ScreenKeyboard tests', () => {
  test('Test open ScreenKeyboard', async () => {
    const wrapper = mount(Calculator);
    const control = wrapper.find('#control');
    const screenKeyboard = wrapper.find('.screen-keyboard');

    await control.trigger('click');

    expect(screenKeyboard.isVisible()).toBe(true);
  });

  test('Test field selection (operand2)', async () => {
    const wrapper = mount(Calculator);
    const control = wrapper.find('#operand2');

    await control.trigger('click');

    expect(wrapper.vm.selectedOperand).toBe('operand2');
  });

  test('Test field selection (operand1)', async () => {
    const wrapper = mount(Calculator);
    const control1 = wrapper.find('#operand1');
    const control2 = wrapper.find('#operand2');

    await control2.trigger('click');
    await control1.trigger('click');

    expect(wrapper.vm.selectedOperand).toBe('operand1');
  });

  test('Test ScreenKeyboard input (operand1)', async () => {
    const wrapper = mount(Calculator);
    const button1 = wrapper.find('button[name="1"]');
    const button2 = wrapper.find('button[name="2"]');
    const button3 = wrapper.find('button[name="3"]');
    const button4 = wrapper.find('button[name="4"]');
    const button5 = wrapper.find('button[name="5"]');
    const button6 = wrapper.find('button[name="6"]');
    const button7 = wrapper.find('button[name="7"]');
    const button8 = wrapper.find('button[name="8"]');
    const button9 = wrapper.find('button[name="9"]');
    const button0 = wrapper.find('button[name="0"]');
    const control = wrapper.find('#operand1');

    await control.trigger('click');
    await button1.trigger('click');
    await button2.trigger('click');
    await button3.trigger('click');
    await button4.trigger('click');
    await button5.trigger('click');
    await button6.trigger('click');
    await button7.trigger('click');
    await button8.trigger('click');
    await button9.trigger('click');
    await button0.trigger('click');

    expect(wrapper.vm.operand1).toBe(1234567890);
  });

  test('Test ScreenKeyboard input (operand2)', async () => {
    const wrapper = mount(Calculator);
    const button1 = wrapper.find('button[name="1"]');
    const button2 = wrapper.find('button[name="2"]');
    const button3 = wrapper.find('button[name="3"]');
    const button4 = wrapper.find('button[name="4"]');
    const button5 = wrapper.find('button[name="5"]');
    const button6 = wrapper.find('button[name="6"]');
    const button7 = wrapper.find('button[name="7"]');
    const button8 = wrapper.find('button[name="8"]');
    const button9 = wrapper.find('button[name="9"]');
    const button0 = wrapper.find('button[name="0"]');
    const control = wrapper.find('#operand2');

    await control.trigger('click');
    await button1.trigger('click');
    await button2.trigger('click');
    await button3.trigger('click');
    await button4.trigger('click');
    await button5.trigger('click');
    await button6.trigger('click');
    await button7.trigger('click');
    await button8.trigger('click');
    await button9.trigger('click');
    await button0.trigger('click');

    expect(wrapper.vm.operand2).toBe(1234567890);
  });

  test('Test ScreenKeyboard delete (operand1)', async () => {
    const wrapper = mount(Calculator);
    const button1 = wrapper.find('button[name="1"]');
    const button2 = wrapper.find('button[name="2"]');
    const buttonDelete = wrapper.find('button[name=delete]');
    const control = wrapper.find('#operand1');

    await control.trigger('click');
    await button1.trigger('click');
    await button2.trigger('click');
    await buttonDelete.trigger('click');

    expect(wrapper.vm.operand1).toBe(1);
  });

  test('Test ScreenKeyboard delete (operand2)', async () => {
    const wrapper = mount(Calculator);
    const button1 = wrapper.find('button[name="1"]');
    const button2 = wrapper.find('button[name="2"]');
    const buttonDelete = wrapper.find('button[name=delete]');
    const control = wrapper.find('#operand2');

    await control.trigger('click');
    await button1.trigger('click');
    await button2.trigger('click');
    await buttonDelete.trigger('click');

    expect(wrapper.vm.operand2).toBe(1);
  });
});
