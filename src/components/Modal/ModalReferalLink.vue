<template>
  <modal
    name="modal-referal"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    @before-close="$emit('setAccept', false)"
    @opened="myRefer()"
    :height="600"
    :width="600"
    :adaptive="true"
  >
    <div class="bg-ecio-bg p-5">
      <div class="row">
        <div class="mb-3 col-12 mx-auto text-uppercase text-center">
          <h2 class="text-white text-2xl">Your Referral link</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-3">
          <div class="d-flex align-items-center">
            <div
              v-if="referCode == ``"
              class="spinner-border ml-auto float-left text-dark"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <div class="input-group mb-3">
              <input
                class="input-dark left"
                :value="referCode != `` ? `${webUrl}?refer=${referCode}` : ``"
                disabled
              />
              <div
                class="input-group-append absolute right-0 top-0 bottom-0 items-center pr-3 datepicker"
                @click="copyText(`${webUrl}?refer=${referCode}`)"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="#E0FB16"
                >
                  <path
                    d="M17 7h6v16h-16v-6h-6v-16h16v6zm5 1h-14v14h14v-14zm-6-1v-5h-14v14h5v-9h9z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      webUrl: process.env.VUE_APP_BASE_URL,
      baseUrl: process.env.VUE_APP_API_GATEWAY,
      referCode: "",
    };
  },
  // mounted() {
  //   if (this.profile.user_name != "undefined") {
  //     this.myRefer();
  //   }
  // },
  methods: {
    copyText(val) {
      var text = val;
      var elem = document.createElement("textarea");
      document.body.appendChild(elem);
      elem.value = text;
      elem.select();
      document.execCommand("copy");
      document.body.removeChild(elem);
      const alertText = (
        <div class="col-12 text-uppercase">
          <h1 class="mb-3 text-xl">Copied to clipboard</h1>
          <span class="text-sm font-weight-normal">
            Your invitation link has been copied.
          </span>
        </div>
      );
      this.$toast.success(alertText, {
        position: "top-right",
        timeout: 3000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
    },
    async myRefer() {
      console.log("myRefer", this.profile.user_name);
      let res = await axios
        .post(`${this.baseUrl}referral/code`, {
          username: this.profile.user_name,
        })
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          console.log("referral/code/ error: ", e);
          return {
            success: false,
          };
        });
      if (res.success) {
        this.referCode = res.obj;
      }
    },
  },
  props: {
    profile: {
      type: Object,
      return: {},
    },
    address: {
      default: String,
      return: "",
    },
  },
};
</script>
<style scoped>
.float-left {
  position: absolute;
  left: 25px;
  top: calc(50% - 20px);
  z-index: 5;
}
</style>
