<template>
  <modal
    name="modal-success"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    @before-close="$emit('setAccept', false)"
    :height="600"
    :width="600"
    :adaptive="true"
  >
    <div class="bg-ecio-bg p-5 text-uppercase">
      <div class="flex justify-end">
        <button @click="$modal.hide('modal-success')" class="close-modal">
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
            Success!
          </h1>
        </div>

        <div class="col-12 mb-5 text-white text-center text-uppercase">
          <p>
            wallet:<span class="text-custom-green"> {{ shortAddress }}</span>
          </p>
          <p>
            Your account has been created.
          </p>
        </div>
        <div class="col-12 mb-3">
          <button
            :disabled="processing"
            class="btn wallet w-100 quandro text-2xl"
            @click="$emit('LinkDone'), $modal.hide('modal-success')"
          >
            DONE
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
  computed: {
    shortAddress() {
      return "".concat(
        this.address.substring(0, 6),
        "...",
        this.address.slice(-4)
      );
    },
  },
  props: {
    address: {
      default: String,
      return: "",
    },
  },
};
</script>
