<template>
  <div
    class="text-center p-4 py-5 font-weight-bold text-uppercase"
    style="margin: auto"
  >
    <h1
      class="mb-3 text-white text-center text-uppercase"
      style="font-size: inherit !important"
    >
      WELCOME BACK COMMANDER
    </h1>
    <h2 style="font-size: inherit !important">{{ walletAddress }}</h2>
    <h2 class="color-danger my-3" style="font-size: inherit !important">
      Game Account Not Found
    </h2>
    <div>
      <button
        class="
          btn
          wallet
          w-100
          quandro
          text-white text-2xl
          border-0
          font-weight-bold pt-2
        "
        @click="$emit('createAccount')"
        v-if="chainId == '0x61' ? accessPass : true"
      >
        Create new account
      </button>

      <a
        class="
          btn
          wallet
          w-100
          quandro
          text-white text-2xl
          border-0
          font-weight-bold pt-2
        "
        href="https://ecio.space/alpha-pass"
        v-else
      >
        STAKE TO GET ACCESS
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    walletAddress: {
      default: String,
      return: "",
    },
    accessPass: {
      default: Boolean,
      return: false,
    },
  },
  data() {
    return {
      chainId: process.env.VUE_APP_CHAIN_ID,
    };
  },
};
</script>
