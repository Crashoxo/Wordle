<template>
  <!-- <div class="top-rules" :class="{ opacity: introduceModal }"> -->
  <div class="top-rules">
    <div class="close-rules-btn" @click="toggleModal">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.1802 0.25L7 5.43025L1.81977 0.25L0.25 1.81978L5.43023 6.99999L0.25 12.1802L1.81977 13.75L7 8.56977L12.1802 13.75L13.75 12.1802L8.56977 6.99999L13.75 1.81978L12.1802 0.25Z"
          fill="black"
        />
      </svg>
    </div>
    <li class="information-context">Guess the WORDLE in 5 tries.</li>
    <li class="information-context">
      Each guess must be a valid 5 letter word. Hit the enter button to submit.
    </li>
    <li class="information-context">
      After each guess, the color of the tiles will change to show how close
      your guess was to the word.
    </li>
    <li class="information-context">
      If the tile turns green, the letter exists in the word and is in the right
      position.
    </li>
    <li class="information-context">
      If the tile turns yellow, the letter exists in the word but in a wrong
      position.
    </li>
    <li class="information-context">
      If the tile turns gray, the letter doesn't exist in the word.
    </li>
  </div>
</template>

<script>
export default {
  name: "GameInformation",
  data() {
    return {};
  },
  // 接收 跟元件
  props: ["receiveIntroduceModal"],
  methods: {
    toggleModal() {
      // $emit(根元件 HTML @方法, 傳出的參數)
      this.$emit("sendToggleModal", this.receiveIntroduceModal);
    },
  },
  created() {
    // console.log("接收", this.receiveIntroduceModal);
    // this.toggleModal();
  },
};
</script>
