<template>
  <div class="w-full h-full fixed block top-0 left-0 opacity-75 z-50">
    <span class=" top-1/2 my-0 mx-auto block relative w-0 h-0" style="top: 50%">
      <div
        class="spinner-border text-ecio"
        style="width: 3rem; height: 3rem;"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  mounted() {
    window.location.href =
      "https://www.binance.com/en/nft/mystery-box/detail?number=1&productId=192967676644300800&ref=150110488";
  },
};
</script>
