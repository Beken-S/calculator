<template>
  <div class="calculator">
    <div class="display">
      <input v-model.number="operand1" type="number" />
      <input v-model.number="operand2" type="number" />
      <div class="result">= {{ result }}</div>
    </div>
    <div class="keyboard">
      <button type="button" @click="sum()" title="Сложение">+</button>
      <button type="button" @click="sub()" title="Вычитание">-</button>
      <button type="button" @click="mult()" title="Умножение">*</button>
      <button type="button" @click="div()" title="Деление">/</button>
      <button type="button" @click="integerDiv()" title="Целочисленное деление">//</button>
      <button type="button" @click="pow()" title="Возведение в степень">^</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
    };
  },
  methods: {
    sum() {
      this.result = this.operand1 + this.operand2;
    },
    sub() {
      this.result = this.operand1 - this.operand2;
    },
    mult() {
      this.result = this.operand1 * this.operand2;
    },
    div() {
      if (this.operand2 === 0) {
        this.result = 'Деление на ноль';
      } else {
        this.result = this.operand1 / this.operand2;
      }
    },
    integerDiv() {
      if (this.operand2 === 0) {
        this.result = 'Деление на ноль';
      } else {
        this.result = Math.trunc(this.operand1 / this.operand2);
      }
    },
    pow() {
      this.result = this.operand1 ** this.operand2;
    },
  },
};
</script>

<style scoped lang="scss">
button {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
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
}
.keyboard {
  display: flex;
  justify-content: center;
  gap: 18px;
}
.display {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}
.result {
  text-align: left;
  padding: 5px 20px;
  font-size: 20px;
  color: black;
}
</style>
