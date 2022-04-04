<template>
  <div>
    <div class="bg-card-redeem p-10">
      <h1 style="font-size: 1.8rem">OPEN MYSTERY BOX</h1>
      <div class="one-element" v-if="typeBox">
        <video
          width="100%"
          height="240"
          autoplay
          v-if="$route.query.type === '1'"
          @ended="onEnd()"
        >
          <source
            src="https://ecio.sgp1.digitaloceanspaces.com/Ecio_Rare_Box.mp4"
            type="video/mp4"
          />

          <!-- <source src="movie.ogg" type="video/ogg"> -->
          Your browser does not support the video tag.
        </video>

        <video
          width="100%"
          height="240"
          autoplay
          v-else-if="$route.query.type === '2'"
          @ended="onEnd()"
        >
          <source
            src="https://ecio.sgp1.digitaloceanspaces.com/Ecio_Epic_Box.mp4"
            type="video/mp4"
          />
        </video>

        <video
          width="100%"
          height="240"
          autoplay
          v-else-if="$route.query.type === '3'"
          @ended="onEnd()"
        >
          <source
            src="https://ecio.sgp1.digitaloceanspaces.com/Ecio_Epic_Box.mp4"
            type="video/mp4"
          />
        </video>

        <video width="100%" height="240" autoplay v-else @ended="onEnd()">
          <source
            src="https://ecio.sgp1.digitaloceanspaces.com/Ecio_Common_Box.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeBox: {
      typeof: String,
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

<style></style>
