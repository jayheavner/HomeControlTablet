<template>
  <div v-show="visible" class="simple-keyboard"></div>
</template>

<script>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
export default {
  name: 'VirtualKeyboard',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    keyboard: null
    //showKeyboard: true
  }),
  // watch: {
  //   visible: {
  //     handler(isVisible) {
  //       debugger;
  //     }
  //   }
  // },
  mounted() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: 'hg-theme-default hg-theme-ios',
      layout: {
        default: [
          'q w e r t y u i o p {bksp}',
          'a s d f g h j k l {enter}',
          '{shift} z x c v b n m , . {shift}',
          '{alt} {space} {downkeyboard}'
        ],
        shift: [
          'Q W E R T Y U I O P {bksp}',
          'A S D F G H J K L {enter}',
          '{shiftactivated} Z X C V B N M , . {shiftactivated}',
          '{alt} {space} {downkeyboard}'
        ],
        alt: [
          '1 2 3 4 5 6 7 8 9 0 {bksp}',
          '@ # $ & * ( ) \' " {enter}',
          '{shift} % - + = / ; : ! ? {shift}',
          '{default} {space} {downkeyboard}'
        ]
      },
      display: {
        '{alt}': '.?123',
        '{shift}': '⇧',
        '{shiftactivated}': '⇧',
        '{enter}': 'return',
        '{bksp}': '⌫',
        '{downkeyboard}': '🞃',
        '{space}': ' ',
        '{default}': 'ABC'
      }
    });
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input);
    },
    onKeyPress(button) {
      if (button === '{enter}') {
        this.$emit('enter', true);
      } else if (button.includes('{') && button.includes('}')) {
        this.handleLayoutChange(button);
      }
    },
    handleLayoutChange(button) {
      const currentLayout = this.keyboard.options.layoutName;
      let layoutName;
      switch (button) {
        case '{shift}':
        case '{shiftactivated}':
        case '{default}':
          layoutName = currentLayout === 'default' ? 'shift' : 'default';
          break;

        case '{alt}':
          layoutName = currentLayout === 'alt' ? 'default' : 'alt';
          break;

        case '{downkeyboard}':
          this.$emit('hideKeyboard', true);
          // this.showKeyboard = false;
          break;

        default:
          break;
      }

      if (layoutName) {
        this.keyboard.setOptions({
          layoutName: layoutName
        });
      }
    }
  }
};
</script>

<style>
.simple-keyboard.hg-theme-ios {
  width: 750px;
  margin: auto;
  margin-top: 5px;
  background-color: #e5e5e5;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-row .hg-button {
  flex-grow: 1;
  cursor: pointer;
  max-width: initial;
}
.simple-keyboard.hg-theme-ios .hg-row {
  display: flex;
}
.simple-keyboard.hg-theme-ios .hg-row:not(:last-child) {
  margin-bottom: 5px;
}
.simple-keyboard.hg-theme-ios .hg-row .hg-button:not(:last-child) {
  margin-right: 5px;
}
.simple-keyboard.hg-theme-ios .hg-row:nth-child(2) {
  margin-left: 18px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default.hg-layout-custom {
  background-color: #e5e5e5;
  padding: 3px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button {
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0;
  background: white;
  border-bottom: 1px solid #b5b5b5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  font-weight: 400;
  font-size: 20px;
  max-width: 40px;
  min-width: 40px;
  height: 50px;
  min-height: 50px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button:active,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button:focus {
  background: #e4e4e4;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-functionBtn {
  background-color: #adb5bb;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-space,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-shift,
.simple-keyboard.hg-theme-ios.hg-theme-default
  .hg-button.hg-button-shiftactivated {
  background-color: #ffffff;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-space {
  max-width: 448px;
  min-width: 448px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-enter {
  max-width: 110px;
  min-width: 110px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-altright,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-back {
  min-width: 80px;
  max-width: 80px;
}
</style>
