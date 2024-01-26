<template>
  <div class="word-list">
    <!-- 3. 使用 -->
    <!-- :receiveIntroduceModal="introduceModal" props 送外部data 給內部 -->
    <!-- @sendToggleModal="toggleModal" emit 接收內部 使用外部method-->
    <!-- :class="{ opacity: introduceModal }" 因props把值送子元件，emit讓子元件可觸發跟元件方法，致introduceModal改變-->
    <GameInformation
      :receiveIntroduceModal="introduceModal"
      :class="{ 'opacity-information': introduceModal }"
      @sendToggleModal="toggleModal"
    />
    <h1 class="title-word">
      <svg
        width="26"
        height="26"
        class="top-information"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleModal"
      >
        <path
          d="M7.99997 1.33333C4.31996 1.33333 1.3333 4.32 1.3333 8C1.3333 11.68 4.31996 14.6667 7.99997 14.6667C11.68 14.6667 14.6666 11.68 14.6666 8C14.6666 4.32 11.68 1.33333 7.99997 1.33333ZM8.66663 11.3333H7.3333V7.33333H8.66663V11.3333ZM8.66663 6H7.3333V4.66667H8.66663V6Z"
          fill="white"
        />
      </svg>
      WORDLE
      <svg
        width="20"
        height="20"
        fill="white"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        class="reload-icon"
        @click="initPage()"
      >
        <path
          d="M4.386 11.82a4.967 4.967 0 005.938 3.386c.147-.037.3.044.344.189l.39 1.284.083.274a.225.225 0 01-.153.281 7.108 7.108 0 01-8.64-4.795 7.108 7.108 0 014.73-8.861 7.108 7.108 0 018.86 4.732l.02.064 1.653.045a.365.365 0 01.364.195v.002a.342.342 0 01.024.056.366.366 0 01-.125.404l-2.842 2.91a.364.364 0 01-.53-.009l-2.735-2.98a.365.365 0 01-.101-.432.365.365 0 01.395-.213l1.651.052c-.974-2.318-3.548-3.536-6.014-2.787a4.967 4.967 0 00-3.312 6.203z"
        ></path>
      </svg>
    </h1>
    <div class="flex-wold-list">
      <div
        v-for="(item, key) in wordString[0]"
        class="letter-box"
        :id="`0${key}`"
        :key="`${item}+${key}`"
      >
        {{ item }}
      </div>
    </div>
    <div class="flex-wold-list">
      <div
        v-for="(item, key) in wordString[1]"
        class="letter-box"
        :id="`1${key}`"
        :key="`${item}+${key}`"
      >
        {{ item }}
      </div>
    </div>
    <div class="flex-wold-list">
      <div
        v-for="(item, key) in wordString[2]"
        class="letter-box"
        :id="`2${key}`"
        :key="`${item}+${key}`"
      >
        {{ item }}
      </div>
    </div>
    <div class="flex-wold-list">
      <!-- 遊戲結束彈窗 -->
      <div class="show-toast" :style="toastOpacity">
        <p v-html="resultMsg"></p>
        <template v-if="shareAnswers">
          reload for another word
          <br />
          <template v-for="(item, key) in emojiArr"
            >{{ item }}
            <!-- 超過五個換行 -->
            <br v-if="(key + 1) % 5 == 0" :key="`${item}.${key}`"
          /></template>
          <!-- 顯示複製{{msg}} -->
          <button class="share-btn" @click="copyEmoji">share</button>
        </template>
      </div>

      <div
        v-for="(item, key) in wordString[3]"
        class="letter-box"
        :id="`3${key}`"
        :key="`${item}+${key}`"
      >
        {{ item }}
      </div>
    </div>
    <div class="flex-wold-list">
      <div
        v-for="(item, key) in wordString[4]"
        class="letter-box"
        :id="`4${key}`"
        :key="`${item}+${key}`"
      >
        {{ item }}
      </div>
    </div>
    <div class="flex-wold-list">
      <div
        v-for="(item, key) in wordString[5]"
        class="letter-box"
        :id="`5${key}`"
        :key="`${item}+${key}`"
      >
        {{ item }}
      </div>
    </div>
    <p class="test">
      <!-- {{ wordString }}
      <br />
      {{ turnIndex }}
      <br />
      {{ getterEnterEvent }} -->
      <br />
      {{ randomSelectedWord }}
    </p>
    <!-- 複製Emoji用 -->
    <textarea class="emoji" v-model="emojiArr"></textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { wordList } from "@/assets/js/wordList";
// 1. 引用
import GameInformation from "@/components/GameInformation";

export default {
  name: "WordList",
  data() {
    return {
      randomSelectedWord: "", // 隨機單字
      checkedString: false, // 前輸入值是否為字典內字串 ,false = 能刪字母,
      introduceModal: false, // 遊戲說明
      resultMsg: "", // 結果訊息
      emojiArr: [], // emoji陣列
      shareAnswers: true, // emoji展示
      // 遊戲結束彈窗樣式
      toastOpacity: {
        opacity: 0,
      },
    };
  },
  components: { GameInformation: GameInformation }, // 2. 註冊
  methods: {
    ...mapActions({
      actionWordString: "actionWordString",
      actionSetIndex: "actionIndex",
      actionSetCheckedString: "actionCheckedString",
    }),
    // 恢復預設值
    initPage() {
      // 結果出來才能重新刷題
      if (this.resultMsg !== "") {
        this.actionWordString([
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ]);
        this.actionSetIndex(0);
        this.actionSetCheckedString(false);
        this.resultMsg = "";
        this.toastOpacity = {
          opacity: 0,
        };
        this.randomSelectedWord =
          wordList[Math.floor(Math.random() * wordList.length)];
        this.emojiArr = [];

        // 樣式全清空
        let allKeyboardBtn = document.querySelectorAll(".keyboard-btn");
        let allKeyboardBtnArr = [...allKeyboardBtn];
        allKeyboardBtnArr.forEach((item) => {
          item.classList.remove("respond-gray"); // 樣式全清空
          item.classList.remove("respond-green"); // 樣式全清空
          item.classList.remove("respond-yellow"); // 樣式全清空
        });
        return;
      }
      alert("Finished This Turn");
    },
    // 開關說明
    toggleModal(receiveData) {
      // this.introduceModal = !this.introduceModal;
      this.introduceModal = !receiveData || !this.introduceModal;
    },
    // 判斷答案並給予樣式
    enterAnswer(e) {
      if (e.key === "Enter" || e === "clickEnter") {
        let checkString = ""; // 輸入值
        let greenCount = 0; // 猜中幾個
        checkString = this.wordString[this.turnIndex].join("").toUpperCase(); // 判斷輸入值是否為字典內單字倉庫

        // 如果輸入值是字典內單字倉庫 迴圈並 給樣式
        // 輸入值陣列長度
        this.wordString[this.turnIndex].forEach((item, getGetterWordIndex) => {
          let x = getGetterWordIndex;
          // 答案陣列長度
          Array.from(this.randomSelectedWord).forEach(
            (item, randomWordIndex) => {
              let y = randomWordIndex;
              // 給顏色樣式
              if (checkString[x] !== this.randomSelectedWord[y]) {
                console.log("x", x);
                console.log("y", y);
                // 該輸入值字母 不符合 任何字典字母(會判斷五次)
                // 給灰色樣式
                if (
                  // 上方樣式class沒有green及yellow
                  !document
                    .getElementById(`${this.turnIndex}${x}`)
                    .classList.contains("green") &&
                  !document
                    .getElementById(`${this.turnIndex}${x}`)
                    .classList.contains("yellow")
                ) {
                  // 其中幾個 ＝ true
                  this.setColor(`${this.turnIndex}${x}`, "respond-gray"); // 增加list樣式
                  this.setColor(`${checkString[x]}`, "respond-gray"); // 增加鍵盤樣式
                }
              } else {
                if (x === y) {
                  // 該輸入值字母 字母及位置皆符合 字典字母
                  // 給綠色樣式
                  greenCount += 1;
                  this.setColor(`${this.turnIndex}${x}`, "respond-green"); // 增加list樣式
                  this.setColor(`${checkString[x]}`, "respond-green"); // 增加鍵盤樣式
                }
                if (
                  // 該輸入值字母 字母符合 字典字母
                  // 如果不是綠色的 給黃色
                  !document
                    .getElementById(`${this.turnIndex}${x}`)
                    .classList.contains("green")
                ) {
                  this.setColor(`${this.turnIndex}${x}`, "respond-yellow"); // 增加list樣式
                  this.setColor(`${checkString[x]}`, "respond-yellow"); // 增加鍵盤樣式
                }
              }
            }
          );
        });

        this.actionSetCheckedString(true); // 前輸入值是否為字典內字串 , true = 不能刪字母

        // this.passMsg(greenCount);
        if (greenCount === 5) {
          // 猜中了五個字母
          // 依照回合數給予不同鼓勵
          this.showToast(this.turnIndex);
          return;
        }

        if (this.turnIndex === 5) {
          // 第六個陣列結束
          this.showToast(6);
          return;
        }
        return;

        // 如果輸入值不是字典內單字倉庫
        // this.showToast(7);
        // this.actionSetCheckedString(false); // 前輸入值是否為字典內字串 , false = 可以刪除字串內資料
        // return;
      }
    },
    // Toast顯示資訊
    showToast(statusCode = null) {
      // 提供答案複製
      this.shareAnswers = true;
      if (statusCode !== null) {
        // Case之判斷請勿使用句子，並建議使用物件包裹各case為屬性，有利於可讀性
        let allStatusCode = {
          0: {
            type: 0,
            msg: "lucky!",
          },
          1: {
            type: 1,
            msg: "smart!",
          },
          2: {
            type: 2,
            msg: "amazing!",
          },
          3: {
            type: 3,
            msg: "great!",
          },
          4: {
            type: 4,
            msg: "finally!",
          },
          5: {
            type: 5,
            msg: "Supercalifragilisticexpialidocious!",
          },
          6: {
            type: 6,
            msg: `it was ${this.randomSelectedWord}`,
          },
          7: {
            type: 7,
            msg: `Not a word in my list!`,
          },
        };

        if (allStatusCode[statusCode]) {
          this.resultMsg = allStatusCode[statusCode].msg;
        }

        if (statusCode === 7) {
          // 提供答案未供複製
          this.shareAnswers = false;

          // 提示消失
          setTimeout(() => {
            this.toastOpacity = {
              opacity: 0,
            };
          }, 1200);
        }

        // 推Emoji陣列
        if (statusCode !== 7) {
          this.showEmojiResults();
        }
      }

      // 顯示提示
      this.toastOpacity = {
        opacity: 0.9,
      };
    },
    // 給對應的id Class
    setColor(id, color) {
      document.getElementById(id).classList.add(color);
    },
    // 顯示最後結果，供複製
    showEmojiResults() {
      let allQuery = document.querySelectorAll(".letter-box");
      allQuery = [...allQuery]; //轉一般陣列
      allQuery.forEach((item) => {
        if (item.classList.value.includes("respond-green")) {
          this.emojiArr.push("\u{1F4D7}");
          return;
        }
        if (item.classList.value.includes("respond-yellow")) {
          this.emojiArr.push("\u{1F4D2}");
          return;
        }
        if (item.classList.value.includes("respond-gray")) {
          this.emojiArr.push("\u{1F4D3}");
          return;
        }
        return;
      });
    },
    // 複製Emoji
    copyEmoji() {
      const emoji = document.querySelector(".emoji");
      emoji.select(); // 選擇物件
      document.execCommand("copy"); // 執行瀏覽器複製命令
      alert("Copied!");
    },
  },
  watch: {
    // 滑鼠點擊用
    getterEnterEvent() {
      this.enterAnswer("clickEnter");
    },
  },
  computed: {
    ...mapGetters({
      wordString: "getterVuexWordString",
      turnIndex: "getterVuexIndex",
      getterEnterEvent: "getterVuexEnterEvent",
    }),
  },
  created() {
    // 鍵盤事件
    window.addEventListener("keydown", this.enterAnswer);
    // 隨機抓裡面任一單字
    this.randomSelectedWord =
      wordList[Math.floor(Math.random() * wordList.length)];
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.enterAnswer);
  },
};
</script>

<style scoped>
.test {
  color: aliceblue;
}

.emoji {
  /* 遠離視窗 */
  position: absolute;
  left: -500px;
  background-color: aliceblue;
  opacity: 0;
}
</style>
