<template>
  <modal
    name="modal-signin"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    :height="600"
    :width="600"
    :adaptive="true"
  >
    <div class="bg-ecio-bg p-5">
      <div class="flex justify-end">
        <button @click="$modal.hide('modal-signin')">
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
          <h1 class="text-5xl mb-4 text-white text-center">SIGN IN</h1>
        </div>
        <div class="col-12 mb-3">
          <input type="email" placeholder="Email" class="input-dark left" />
        </div>
        <div class="col-12 mb-3">
          <input
            type="password"
            placeholder="Password *"
            class="input-dark left"
          />
        </div>
        <div class="col-12 mb-3">
          <button class="btn wallet w-100 quandro text-2xl" @click="signIn">
            SIGN IN
          </button>
        </div>
        <div class="col-12 mb-3 text-center">
          <a
            class="text-white text-2xl"
            @click="$emit('switchModal', 'modal-signup', 'modal-signin')"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  methods: {
    signIn() {
      this.$emit("setType", "link");
      this.$emit("switchModal", "modal-confirm", "modal-signin");
    },
  },
};
</script>
