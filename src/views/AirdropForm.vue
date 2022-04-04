<template>
  <div class="iframe-container ">
    <iframe
      src="https://gleam.io/PIiBy/ecio-nft-airdrop"
      frameBorder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
export default {
  title: "ECIO - From"
};
</script>
<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  html,
  iframe,
  body {
    min-height: 100%;
  }
}
iframe {
  width: 100%;
  height: 100%;
}

.iframe-container {
  text-align: center;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/images/bg-2.png");
  background-size: cover;
}
iframe {
  padding-top: 15%;
}
</style>
