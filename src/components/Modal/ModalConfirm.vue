<template>
  <modal
    name="modal-confirm"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    @before-close="$emit('setAccept', false)"
    :height="600"
    :width="600"
    :adaptive="true"
  >
    <div class="bg-ecio-bg p-5">
      <div class="flex justify-end">
        <button @click="$modal.hide('modal-confirm')" class="close-modal">
          <img src="@/assets/images/modal-close.png" alt="modal close" />
        </button>
      </div>
      <div class="row">
        <div class="mb-3 col-6 col-lg-4 mx-auto">
          <img src="@/assets/images/Picture1.png" class="" alt="modal logo" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1 class="text-5xl mb-4 text-white text-center text-uppercase">
            Last step!
          </h1>
        </div>

        <div class="col-12 mb-3 text-white text-center">
          <p>
            Your account hac been created. Link your address wallet to your
            account now to get started
          </p>
          <p>Your wallet: {{ address }}</p>
        </div>
        <div class="col-12 mb-3">
          <button
            :disabled="processing"
            class="btn wallet w-100 quandro text-2xl"
            @click="
              type == 'link' && !accept
                ? $emit('switchModal', 'modal-agree', '')
                : type == 'link' && accept
                ? linkAccount()
                : linkAccount()
            "
          >
            {{ processing ? "Processing..." : "Link" }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  data() {
    return {
      processing: false,
    };
  },
  methods: {
    async linkAccount() {
      this.processing = true;
      setTimeout(() => {
        this.$emit("linkAccount", this.type);
        this.processing = false;
      }, 2000);
    },
  },
  props: {
    accept: {
      default: Boolean,
      return: false,
    },
    type: {
      default: String,
      return: "",
    },
    address: {
      default: String,
      return: "",
    },
  },
};
</script>