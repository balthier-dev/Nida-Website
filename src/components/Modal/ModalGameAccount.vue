<template>
  <modal
    name="modal-account"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    :height="600"
    :width="600"
    :adaptive="true"
  >
    <div class="bg-ecio-bg p-5">
      <div class="flex justify-end">
        <button @click="$modal.hide('modal-account')" class="close-modal">
          <img src="@/assets/images/modal-close.png" alt="modal close" />
        </button>
      </div>
      <div class="row">
        <div class="mb-3 col-12 col-lg-4 mx-auto">
          <img src="@/assets/images/Picture1.png" class="" alt="modal logo" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1 class="text-5xl mb-4 text-white text-center">Game Account</h1>
        </div>
        <div class="col-12 mb-3">
          <button
            class="btn wallet w-100 quandro"
            @click="$emit('switchModal', 'modal-signin', 'modal-account')"
          >
            Link Existing Game Account
          </button>
        </div>
        <div class="col-12 mb-3">
          <button
            class="btn wallet w-100 quandro"
            @click="$emit('switchModal', 'modal-signup', 'modal-account')"
          >
            Create New Game Account
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>