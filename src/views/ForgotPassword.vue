<template>
  <div class="">
    <div class="main-container">
      <section class="cover imagebg" data-overlay="4" style="height: 100vh">
        <div class="background-image-holder background-top">
          <img alt="background" src="../assets/images/bg-staking.png" />
        </div>
        <div class="container h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-6">
              <div>
                <div class="bg-ecio-bg p-5">
                  <div class="row">
                    <div class="col-6 col-lg-4 mx-auto mb-5">
                      <img
                        src="@/assets/images/Picture1.png"
                        class=""
                        alt="modal logo"
                      />
                    </div>
                  </div>
                  <div class="row mt-0">
                    <div class="col-12">
                      <h1
                        class="
                          font-size-title
                          mb-5
                          text-white text-center
                          font-weight-bold
                        "
                      >
                        FORGOT PASSWORD
                      </h1>
                    </div>
                    <div class="col-12 mb-3 text-center" v-if="errCode">
                      <h2 class="color-red">{{ errCode }}</h2>
                    </div>
                    <div class="col-12 mb-5">
                      <input
                        placeholder="Email*"
                        v-model="username"
                        class="input-dark left"
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <button
                        class="btn wallet w-100 quandro hover-border-0"
                        @click="onFind()"
                      >
                        Send link to email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
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
          //window.location.href = "/reset-password?u=" + this.username;
          this.notiSuccess();
        },
      });
    },
    notiSuccess() {
      const text = {
        component: (
          <div class="col-12 text-uppercase">
            <h2 class="mb-3 text-2xl text-custom-green">Email sent</h2>
            <h3 class="mb-3 text-xl h2">
              <p class="text-white font-weight-normal">
                Check your email and open the link
                <br /> we sent to continue
              </p>
            </h3>
          </div>
        ),
      };
      this.$toast.success(text, {
        position: "top-right",
        timeout: 5000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background: #000;
}
.bg-ecio-bg {
  border-radius: 20px;
  background: #000;
}
</style>
