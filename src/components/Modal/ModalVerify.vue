<template>
  <modal
    name="modal-verify"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    @before-close="(code = null), (time = 0)"
    :height="600"
    :width="800"
    :adaptive="true"
    @opened="countDown()"
  >
    <div class="bg-ecio-bg">
      <div class="row">
        <div class="col-4">
          <img src="@/assets/ecio-cover.png" alt="" />
        </div>
        <div class="col-12 col-md-8 pr-5 py-4">
          <!-- <div class="flex justify-end">
            <button @click="$modal.hide('modal-verify')" class="close-modal">
              <img src="@/assets/images/modal-close.png" alt="modal close" />
            </button>
          </div> -->

          <div class="row">
            <div class="col-12">
              <h1 class="text-5xl mb-4 mt-5 text-white text-uppercase">
                verification
              </h1>
            </div>
            <div class="col-12 mb-4 text-center" v-if="errcode">
              <h2 class="color-red">{{ errcode }}</h2>
            </div>
            <div class="col-12 mb-4">
              <span
                class="quandro text-white text-uppercase text-lg font-weight-bold"
                >EMAIL</span
              >
              <input
                :disabled="true"
                class="input-dark left"
                type="email"
                v-model="email"
              />
            </div>
            <div class="col-12">
              <span
                class="quandro text-white text-uppercase text-lg  font-weight-bold"
                >Enter code</span
              >
            </div>
            <div class="col-12 col-md-8 mb-5">
              <input
                type="text"
                v-model="code"
                class="input-dark left"
                maxlength="6"
              />
            </div>
            <div class="col-12 col-md-4 mb-4">
              <button
                class="btn wallet w-100 quandro text-2xl"
                :class="time > 0 ? 'small' : ''"
                :disabled="time > 0"
                @click="email ? sendcode() : null"
              >
                <span v-if="time > 0" class="text-white">
                  Resend code in
                  <span class="text-custom-green">{{ time }}s</span>
                </span>
                <span v-else> Send code </span>
              </button>
            </div>
            <div class="col-12 mb-4">
              <button
                :disabled="!code"
                class="btn wallet w-100 quandro text-2xl  font-weight-bold"
                @click="onSubmit"
              >
                Confirm
              </button>
            </div>
            <div class="col-12 mb-3 text-white">
              <div class="my-3 text-center text-">
                Confirm that you have read and you agree to the
                <span>
                  <a
                    href="/term-of-use"
                    target="_blank"
                    class="text-custom-green text-underline"
                    >ECIO Term of Use.</a
                  >
                </span>
              </div>
              <!-- <div class="text-center">
                You already have an account ?
                <a
                  href="#"
                  class="text-custom-green"
                  @click="$emit('switchModal', 'modal-signin', 'modal-verify')"
                  >Connect now</a
                >
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
var userPool = [];
var authData = {
  ClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
  UserPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
};
export default {
  data() {
    return {
      code: null,
      time: 0,
      errcode: "",
    };
  },
  props: {
    type: {
      default: String,
      return: "",
    },
  },
  computed: {
    email() {
      return this.$store.state.emailSignup;
    },
  },
  mounted() {
    //this.$modal.show("modal-verify");
  },
  watch: {
    email() {
      console.log("watch", this.email);
    },
  },
  methods: {
    emitData() {
      this.$emit("switchModal", "modal-confirm", "modal-verify");
      this.$emit("setEmail", this.email);
      this.$emit("setModal", this.type);
    },
    onSubmit() {
      userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
      let reg = new RegExp(/[\w\W]+[@]+/g, "gi");
      let matches = this.email.match(reg);
      let user = "";
      if (matches.length > 0) {
        user = matches[0].slice(0, matches[0].length - 1);
      }
      var userData = {
        Username: user,
        Pool: userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmRegistration(this.code, true, (err, result) => {
        if (err) {
          console.error("confirmation error: " + JSON.stringify(err));
          this.errcode = JSON.stringify(err.code);
          setTimeout(() => {
            this.errcode = "";
          }, 4000);
        } else {
          console.log("confirmation success: " + JSON.stringify(result));
          this.confirmed = true;
          this.$emit("verifyEmail", this.email, this.code);
        }
      });
    },
    countDown() {
      this.time = 60;
      let interval = setInterval(() => {
        this.time = this.time - 1;
        if (this.time == 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
    async sendcode() {
      this.countDown();
      this.loader = "sending";
      userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
      var userData = {
        Username: this.email,
        Pool: userPool,
      };
      console.log("resending confirmation code to " + userData.Username);
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          console.error("sending error: " + JSON.stringify(err));
          this.errcode = JSON.stringify(err.code);
          setTimeout(() => {
            this.errcode = "";
          }, 4000);
        } else {
          this.$store.commit("setUsername", this.email);
          console.log("sending success success: " + JSON.stringify(result));
        }
      });
    },
  },
};
</script>
