<template>
  <modal
    name="modal-forgotpassword"
    classes="dialog-class"
    transition="scale"
    style="background: rgba(0, 0, 0, 0.7)"
    :height="600"
    :width="600"
    :adaptive="true"
    :draggable="true"
  >
    <div class="bg-ecio-bg p-5">
      <div class="flex justify-end">
        <button @click="$modal.hide('modal-signup')" class="close-modal">
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
          <h1
            class="font-size-title mb-4 text-white text-center font-weight-bold"
          >
            FORGOT PASSWORD
          </h1>
        </div>
        <div class="col-12 mb-3 text-center" v-if="errCode">
          <h2 class="color-red">{{ errCode }}</h2>
        </div>
        <div class="col-12 mb-3">
          <input
            placeholder="Email*"
            v-model="username"
            class="input-dark left"
          />
        </div>
        <div class="col-12 mb-3">
          <button class="btn wallet w-100 quandro" @click="onFind()">
            SEND
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
var config = {
  ClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
  UserPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
};
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
var userPool = [];
export default {
  data() {
    return {
      errCode: null,
      email: null,
      username: null,
    };
  },
  methods: {
    onFind() {
      userPool = new AmazonCognitoIdentity.CognitoUserPool(config);
      var userData = {
        Username: this.username,
        Pool: userPool,
      };
      console.log("password forgot for " + userData.Username);
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      this.errcode = "";

      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          console.log("forgot password initiated: " + JSON.stringify(data));
        },
        onFailure: (err) => {
          var code = JSON.stringify(err.code);
          console.error("forgot password error: " + code);
          this.errcode = code;
        },
        inputVerificationCode: (data) => {
          var result = JSON.stringify(data);
          console.log("Code sent to: " + result);
          this.$modal.hide("modal-forgotpassword");
          this.$modal.show("modal-resetpassword");
        },
      });
    },
  },
};
</script>
