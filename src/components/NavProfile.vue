<template>
  <div class="text-center p-5 w-100 font-weight-bold">
    <h3 class="mb-2 text-white text-center text-uppercase text-lg profiles">
      WELCOME BACK COMMANDER
    </h3>
    <h2 class="mb-4 text-uppercase profiles">{{ profile.display_name }}</h2>
    <div class="my-2">
      <button
        class="btn btn-ecio default w-100 quandro text-2xl font-weight-bold"
        disabled
      >
        MY PROFILE
      </button>
    </div>
    <div class="my-2">
      <button
        class="btn btn-ecio default w-100 quandro text-2xl font-weight-bold"
        disabled
      >
        MY GAME REWARDS
      </button>
    </div>
    <div class="my-2">
      <button
        class="
          btn btn-ecio
          default
          w-100
          quandro
          text-2xl text-white
          font-weight-bold
        "
        @click="$modal.show('modal-referal')"
      >
        MY REFERRAL
      </button>
    </div>
    <div class="my-2">
      <a href="/forgot-password">
        <button
          class="
            btn btn-ecio
            default
            w-100
            quandro
            text-2xl text-white
            font-weight-bold
          "
        >
          Forgot Password
        </button></a
      >
    </div>
    <div class="mt-4">
      <button
        class="btn btn-ecio w-100 quandro text-2xl font-weight-bold"
        @click="$emit('disconnect')"
      >
        Disconnect
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    profile: {
      type: Object,
      return: {},
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  font-size: inherit !important;
}
</style>
