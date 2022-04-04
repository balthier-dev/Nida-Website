<template>
  <div>
    <div class="bg-border-close">
      <div class="element">
        <video width="100%" height="240" autoplay @ended="onEnd()">
          <source
            src="@/assets/gachapon/Ecio_Gacha_Open.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="border-clone">
        <img
          v-if="typeBox == 1"
          src="@/assets/gachapon/border-exc.webp"
          alt=""
        />
        <img v-else src="@/assets/gachapon/border-std.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeBox: {
      type: Number,
      default: 0,
    },
  },
  created() {},
  methods: {
    onEnd() {
      this.$emit("endVideoHandler", true);
    },
  },
};
</script>

<style>
.bg-border-close {
  position: relative;
}
.border-clone {
  position: absolute;
  top: 0;
}
.element {
  position: relative;
  min-height: 350px;
  padding: 22px;
  border-radius: 147px;
  overflow: hidden;
}
@media (max-width: 414px) {
  .element {
    padding: 14px;
    border-radius: 103px;
  }
}
</style>
