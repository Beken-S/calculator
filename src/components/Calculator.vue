<template>
  <div class="calculator">
    <div class="display">
      <input class="display__input" v-model.number="operand1" type="number" />
      <input class="display__input" v-model.number="operand2" type="number" />
      <div class="display__result" v-show="!error">
        = {{ result }} <br />
        Fibonacci: {{ fibResult }}
      </div>
      <div class="display__error" v-show="error">Ошибка! {{ error }}</div>
      <div class="display__messages">
        <template v-if="result === null"></template>
        <template v-else-if="result < 0"> Получилось отрицательное число. </template>
        <template v-else-if="result < 100">Результат в первой сотне.</template>
        <template v-else>Получилось слишком большое число.</template>
      </div>
    </div>
    <div class="keyboard">
      <button
        class="keyboard__button"
        type="button"
        v-for="operation in operations"
        :key="operation.char"
        :title="operation.title"
        @click="calculate(operation.char)"
      >
        {{ operation.char }}
      </button>
    </div>
    <div class="screen-keyboard-control">
      <input
        class="screen-keyboard-control__input"
        id="control"
        type="checkbox"
        v-model="showScreenKeyboard"
      />
      <label class="screen-keyboard-control__label" for="control"
        >Отобразить экранную клавиатуру</label
      >
    </div>
    <div class="screen-keyboard" v-show="showScreenKeyboard">
      <div class="screen-keyboard__button-block">
        <button
          class="screen-keyboard__button"
          type="button"
          v-for="button in screenKeyboard"
          :key="button.char"
          :title="button.title"
          @click="inputScreenKeyboard(button.char)"
        >
          {{ button.char }}
        </button>
        <button
          class="screen-keyboard__button screen-keyboard__button_delete"
          type="button"
          title="Удалитьd"
          @click="deleteScreenKeyboard"
        >
          &#8592;
        </button>
      </div>
      <input
        id="operand1"
        type="radio"
        name="fieldSelection"
        value="operand1"
        v-model="selectedOperand"
        checked
      />
      <label for="operand1">Операнд 1</label>
      <input
        id="operand2"
        type="radio"
        name="fieldSelection"
        value="operand2"
        v-model="selectedOperand"
      />
      <label for="operand2">Операнд 2</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      operations: [
        { char: '+', title: 'Сложение' },
        { char: '-', title: 'Вычитаение' },
        { char: '*', title: 'Умножение' },
        { char: '/', title: 'Деление' },
        { char: '//', title: 'Целочисленное деление' },
        { char: '^', title: 'Возведение в степернь' },
      ],
      operand1: 0,
      operand2: 0,
      result: null,
      fibResult: null,
      error: '',
      logs: {},
      showScreenKeyboard: false,
      selectedOperand: 'operand1',
      screenKeyboard: [
        { char: '1', title: '1' },
        { char: '2', title: '2' },
        { char: '3', title: '3' },
        { char: '4', title: '4' },
        { char: '5', title: '5' },
        { char: '6', title: '6' },
        { char: '7', title: '7' },
        { char: '8', title: '8' },
        { char: '9', title: '9' },
      ],
    };
  },
  computed: {
    fibonacci1() {
      return this.clakFibonacci(this.operand1);
    },
    fibonacci2() {
      return this.clakFibonacci(this.operand2);
    },
  },
  methods: {
    sum() {
      this.result = this.operand1 + this.operand2;
      this.fibResult = this.fibonacci1 + this.fibonacci2;
    },
    sub() {
      this.result = this.operand1 - this.operand2;
      this.fibResult = this.fibonacci1 - this.fibonacci2;
    },
    mult() {
      this.result = this.operand1 * this.operand2;
      this.fibResult = this.fibonacci1 * this.fibonacci2;
    },
    div() {
      if (this.operand2 === 0) {
        this.error = 'Деление на ноль.';
      } else {
        this.result = this.operand1 / this.operand2;
        this.fibResult = this.fibonacci1 / this.fibonacci2;
      }
    },
    integerDiv() {
      if (this.operand2 === 0) {
        this.error = 'Деление на ноль.';
      } else {
        this.result = Math.trunc(this.operand1 / this.operand2);
        this.fibResult = Math.trunc(this.fibonacci1 / this.fibonacci2);
      }
    },
    pow() {
      this.result = this.operand1 ** this.operand2;
      this.fibResult = this.fibonacci1 ** this.fibonacci2;
    },
    clakFibonacci(n) {
      let prev = 0;
      let next = 1;
      for (let i = 0; i < n; i += 1) {
        const temp = next;
        next = prev + next;
        prev = temp;
      }
      return prev;
    },
    calculate(operation = '+') {
      this.error = '';
      switch (operation) {
        case '+':
          this.sum();
          break;
        case '-':
          this.sub();
          break;
        case '*':
          this.mult();
          break;
        case '/':
          this.div();
          break;
        case '//':
          this.integerDiv();
          break;
        case '^':
          this.pow();
          break;
        default:
          break;
      }
      const key = Date.now();
      const logString = `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;
      this.$set(this.logs, key, logString);
    },
    inputScreenKeyboard(char) {
      const operand = this.selectedOperand;
      const value = String(this[operand]);
      this[operand] = Number(value + char);
    },
    deleteScreenKeyboard() {
      const operand = this.selectedOperand;
      this[operand] = Math.trunc(this[operand] / 10);
    },
  },
};
</script>

<style scoped lang="scss">
button {
  box-sizing: border-box;
  font-size: 18px;
  border: 2px outset rgb(230, 230, 230);
  border-radius: 20%;
  background-color: rgb(230, 230, 230);
  &:hover {
    background-color: darken(rgb(230, 230, 230), 10%);
  }
  &:active {
    border: 2px inset rgb(230, 230, 230);
  }
}
input {
  padding: 8px 20px;
  font-size: 20px;
}
.calculator {
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 20px;
}
.keyboard {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 20px;
  &__button {
    width: 40px;
    height: 40px;
  }
}
.display {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  &__result {
    text-align: left;
    padding: 5px 20px;
    color: black;
  }
  &__error {
    text-align: left;
    padding: 5px 20px;
    color: red;
  }
  &__messages {
    min-height: 24px;
    padding: 5px 20px;
  }
}
.screen-keyboard-control {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  &__input {
    margin: 0 10px 0 0;
  }
}
.screen-keyboard {
  &__button-block {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  &__button {
    width: 30px;
    height: 30px;
    margin-bottom: 20px;
    &_delete {
      width: 50px;
    }
  }
}
</style>
