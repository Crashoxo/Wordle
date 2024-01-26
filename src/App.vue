<template>
  <div id="app">
    <nav></nav>
    <div class="wrapper-window">
      <router-view name="WordList"> </router-view>
      <router-view> </router-view>
    </div>
  </div>
</template>

<style>
body {
  background-color: black;
}

.wrapper-window {
  position: relative;
  max-width: 480px;
  margin: auto;
}

.title-word {
  padding-bottom: 3px;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-size: 26px;
  color: white;
  font-weight: 500;
  letter-spacing: 2px;
  word-spacing: 0px;
  text-align: center;
  border-bottom: 1px solid #3a3a3c;
}

.top-rules {
  position: absolute;
  left: 50px;
  top: 40px;
  padding: 20px;
  max-width: 320px;
  background-color: white;
  opacity: 0;
  border-radius: 16px;
  box-shadow: 1px 1px 10px #ccc;
  transition: opacity 1.2s ease-out;
}

.close-rules-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 12px;
  top: 5px;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-size: 18px;
  cursor: pointer;
}

.close-rules-btn:hover {
  width: 15px;
  height: 15px;
  background-color: #c5c5c5e8;
  border-radius: 30px;
}

.opacity-information {
  opacity: 0.8;
  transition: all 0.4s ease-out;
}

.toast-opacity {
  opacity: 0;
}

.information-context {
  line-height: 20px;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
}

.top-information {
  position: absolute;
  left: 5px;
  cursor: pointer;
}

.show-toast {
  position: absolute;
  top: 32%;
  padding: 6px;
  width: 250px;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-size: 17px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 1.2s ease-out;
  box-shadow: 1px 1px 10px #ccc;
  /* opacity: 0; */
}

.letter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 40px;
  margin: 5px;
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: white;
  border: 2px solid #3a3a3c;
  background-color: "black";
}

.flex-wold-list {
  display: flex;
  justify-content: items-center;
  text-align: center;
  width: 250px;
  height: 50px;
  margin: auto;
}

#keyboard-area {
  min-width: 465px;
  margin-top: 20px;
  margin: auto;
  text-align: center;
}

.reload-icon {
  margin-left: 10px;
  cursor: pointer;
}

.share-btn {
  width: 53px;
  height: 50px;
  margin: 5%;
  transition: all 0.2s ease-out;
}

.share-btn:hover {
  color: white;
  background-color: rgb(22, 22, 22);
  transition: all 0.4s ease-out;
}

.respond-gray {
  background-color: #3a3a3c;
  transition: all 1.2s ease-out;
}

.respond-green {
  /* important 綠色壓過黃色 */
  background-color: #538d4e !important;
  transition: all 1.2s ease-out;
}

.respond-yellow {
  background-color: #b59f3b ;
  transition: all 1.2s ease-out;
}
</style>
