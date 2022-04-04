<template>
  <span v-if="days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0"
    >0 Days 0 Hr 0 Min</span
  >
  <span v-else>
    <span v-if="days > 0">
      {{ days | two_digits }} {{ days > 1 ? "Days" : "Day" }}
    </span>
    <span v-if="hours > 0"> {{ hours | two_digits }} Hr </span>
    <span v-if="minutes > 0"> {{ minutes | two_digits }} Min </span>
    <span v-if="days == 0 && hours == 0"> {{ seconds | two_digits }} S </span>
  </span>
</template>

<script>
export default {
  name: "CountDown",
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
      //   if (
      //     this.days <= 0 &&
      //     this.hours <= 0 &&
      //     this.minutes <= 0 &&
      //     this.seconds <= 0
      //   ) {
      //     this.$emit("countDownEnded", true);
      //     console.log("countDownEnded!");
      //   }
    }, 1000);
  },
  props: {
    date: {
      default: String,
      return: "-",
    },
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
    };
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(this.date / 1000);
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    },
  },
};
</script>
