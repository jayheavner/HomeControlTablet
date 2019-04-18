<template>
  <div>
    <input
      :value="input"
      class="input"
      placeholder="Tap on the virtual keyboard to start"
      @input="onInputChange"
    />
    <div class="simple-keyboard"></div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: ['input', 'onInputChange'],
  methods: {
    update(input) {
      this.input = input;
    },
    onInputChange(e) {
      let input = e.target.value;
      keyboard.setInput(input);
    }
  }
};
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

let keyboard;

keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

console.log(keyboard);

function onChange(input) {
  vueInstance.update(input);
  console.log('Input changed', input);
}

function onKeyPress(button) {
  console.log('Button pressed', button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === '{shift}' || button === '{lock}') handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}
</script>

<style>
app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

.simple-keyboard {
  max-width: 850px;
}
</style>
