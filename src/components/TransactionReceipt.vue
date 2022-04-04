<template>
  <div class="col-12 text-uppercase">
    <h2 class="text-white mb-3 text-2xl">{{ title }}</h2>
    <h3 class="mb-3 text-xl h2 font-weight-bold">{{ txt }}</h3>
    <h3 class="mb-3 text-xl h2">
      <a
        class="color-light-blue font-weight-normal"
        :href="`${blockExplorerUrl}tx/${tx}`"
        target="_blank"
      >
        <u>view on bscscan</u>
      </a>
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: String,
      return: "",
    },
    txt: {
      default: String,
      return: "",
    },
    blockExplorerUrl: {
      default: String,
      return: "",
    },
    tx: {
      default: String,
      return: "",
    },
  },
};
</script>
