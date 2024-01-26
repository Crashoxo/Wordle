<template>
  <div id="keyboard-area" @click="clickKeyBoardLetter">
    <div class="row">
      <button class="keyboard-btn" id="Q">Q</button>
      <button class="keyboard-btn" id="W">W</button>
      <button class="keyboard-btn" id="E">E</button>
      <button class="keyboard-btn" id="R">R</button>
      <button class="keyboard-btn" id="T">T</button>
      <button class="keyboard-btn" id="Y">Y</button>
      <button class="keyboard-btn" id="U">U</button>
      <button class="keyboard-btn" id="I">I</button>
      <button class="keyboard-btn" id="O">O</button>
      <button class="keyboard-btn" id="P">P</button>
    </div>
    <div class="row">
      <div class="spacer half"></div>
      <button class="keyboard-btn" id="A">A</button>
      <button class="keyboard-btn" id="S">S</button>
      <button class="keyboard-btn" id="D">D</button>
      <button class="keyboard-btn" id="F">F</button>
      <button class="keyboard-btn" id="G">G</button>
      <button class="keyboard-btn" id="H">H</button>
      <button class="keyboard-btn" id="J">J</button>
      <button class="keyboard-btn" id="K">K</button>
      <button class="keyboard-btn" id="L">L</button>
      <div class="spacer half"></div>
    </div>
    <div class="row">
      <button
        id="enter-btn"
        class="keyboard-btn one-and-a-half"
        @click="sendEnter"
      >
        enter
      </button>
      <button class="keyboard-btn" id="Z">Z</button>
      <button class="keyboard-btn" id="X">X</button>
      <button class="keyboard-btn" id="C">C</button>
      <button class="keyboard-btn" id="V">V</button>
      <button class="keyboard-btn" id="B">B</button>
      <button class="keyboard-btn" id="N">N</button>
      <button class="keyboard-btn" id="M">M</button>
      <button id="back-btn" class="keyboard-btn one-and-a-half">←</button>
    </div>
    <p class="test">
      <!-- {{ wordString }}
      <br />
      {{ i }}
      <br />
      {{ checkedString }}
      <br />
      {{ wordString }}
      <br />
      {{ turnIndex }}
      <br />
      {{ checkedString }} -->
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "keyBoard",
  data() {
    return {
      clickEnterNum: -1, // 觸發 wordList watch 使用
      appendStringIndex: 0,
    };
  },
  methods: {
    ...mapActions({
      actionSetIndex: "actionIndex",
      actionSetCheckedString: "actionCheckedString",
      actionSetEnterEvent: "actionEnterEvent",
    }),
    // 滑鼠輸入字母 將字母推入陣列
    clickKeyBoardLetter(e) {
      if (e.target.id === "back-btn") {
        this.deleteFromString(); // 刪除
        return;
      }
      if (e.target.id === "enter-btn") {
        if (this.turnIndex < 5 && this.checkedString) {
          // 如果該列字i列數 <5 且 無法輸入字母時
          // this.i += 1; // 增加一列
          let index = this.turnIndex + 1;
          this.actionSetIndex(index);
          this.appendStringIndex = 0;
          return;
        }
      }
      if (e.target.innerHTML.length === 1) {
        // 如果該列長度沒到達五個 且 標籤內的innerHTML長度=1
        this.appendString(e.target.innerHTML); // 推該字母進該字串陣列
        return;
      }
      // if (
      //   this.wordString[this.i].length === 5 &&
      //   e.target.innerHTML.length === 1 &&
      //   this.i < 5 &&
      //   this.checkedString
      // ) {
      //   this.i += 1;
      //   this.appendString(e.target.innerHTML); // 推該字母進該字串陣列
      //   this.actionSetCheckedString(false); // 可以刪除字串內資料
      //   return;
      // }
    },
    // 使用鍵盤輸入 將字母推入陣列
    keydownLetter(e) {
      if (e.key === "Backspace") {
        this.deleteFromString(); // 刪除
        return;
      }
      if (e.key === "Enter") {
        if (
          this.wordString[this.turnIndex].length === 5 &&
          this.turnIndex < 5 &&
          this.checkedString
        ) {
          // 如果該列字串滿了 且 i列數 <5 且
          let index = this.turnIndex + 1;
          this.actionSetIndex(index);
          this.appendStringIndex = 0;
          return;
        }
      }
      if (
        this.appendStringIndex < 5 &&
        e.key.toUpperCase().length === 1 &&
        e.code.substring(0, 3) === "Key"
      ) {
        // 如果該列長度沒到達五個 且 鍵盤輸入的值轉大寫=1 且 code抓到key
        this.appendString(e.key.toUpperCase()); // 推該字母進該字串陣列
        return;
      }
    },
    // 滑鼠點擊Enter時觸發 wordList watch
    sendEnter() {
      this.clickEnterNum += 1;
      this.actionSetEnterEvent(this.clickEnterNum);
    },
    // 推該字母進該字串陣列
    appendString(target) {
      console.log("appendString", target);
      if (this.appendStringIndex > 4) {
        this.appendStringIndex = 0;
      }
      // splice（第幾個, 推進0取代1 , 變數）
      this.wordString[this.turnIndex].splice(this.appendStringIndex, 1, target);
      this.appendStringIndex++;
    },
    // 刪除 比對字串
    deleteFromString() {
      this.wordString[this.turnIndex].splice(this.appendStringIndex - 1, 1, "");
      if (this.appendStringIndex > 0) {
        this.appendStringIndex--;
      }
      // this.wordString[this.turnIndex].pop();
    },
  },
  watch: {
    // 變動時傳入VueX
    // wordString() {
    //   this.actionWordString(this.wordString);
    // },
    // wordString: {
    //   handler() {
    //     this.actionWordString(this.wordString);
    //   },
    //   deep: true,
    // },
    // i() {
    //   this.actionSetIndex(this.i);
    // },
  },
  computed: {
    ...mapGetters({
      wordString: "getterVuexWordString",
      turnIndex: "getterVuexIndex",
      checkedString: "getterVuexCheckedString",
    }),
  },
  created() {
    // 鍵盤事件加載
    window.addEventListener("keydown", this.keydownLetter);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  color: aliceblue;
}

@media screen and (max-width: 450px) {
  #keyboard-area {
    width: 100%;
    min-width: 100%;
  }
  .keyboard-btn {
    height: 40px;
    font-size: 14px;
  }
  #enter-btn {
    width: 50px;
  }
  #back-btn {
    width: 30px;
  }
}

.keyboard-btn {
  width: 8%;
  height: 50px;
  margin: 3px;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
  border-radius: 7px;
  cursor: pointer;
}

#enter-btn {
  width: 60px;
}

#back-btn {
  width: 50px;
}
</style>
