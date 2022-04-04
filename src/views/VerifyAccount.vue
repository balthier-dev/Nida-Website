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
                    <div class="col-4 col-lg-4 mx-auto mb-5">
                      <img
                        src="@/assets/images/Picture1.png"
                        class=""
                        alt="modal logo"
                      />
                    </div>
                  </div>
                  <div class="row mt-0  text-center">
                    <div class="col-12">
                      <h1
                        class="
                          font-size-title
                          mb-5
                          text-white text-center
                          font-weight-bold
                        "
                      >
                        Verify Account
                      </h1>
                    </div>
                    <div class="col-12 mb-3 text-center" v-if="errCode">
                      <h2 class="color-red text-2xl mb-5">{{ errCode }}</h2>
                    </div>
                    <div class="col-12 mb-5 text-center" v-if-else="confirmed">
                      <h2 class="text-2xl mb-3">
                        Your account has been verified.
                      </h2>
                    </div>
                    <div class="col-12 mb-5">
                      <button
                        class="
                            btn
                            wallet
                            quandro
                            text-white text-2xl
                            border-0
                            font-weight-bold pt-2
                          "
                        style="
                          z-index: 1;
                          font-size: 16px;
                          position: relative;
                          width: 200px;
                        "
                      >
                        <a href="/" class="mr-3 text-uppercase">
                          Go home
                        </a>
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
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
var userPool = [];
var authData = {
  ClientId: process.env.VUE_APP_COGNITO_CLIENT_ID,
  UserPoolId: process.env.VUE_APP_COGNITO_USERPOOL_ID,
};
export default {
  data() {
    return {
      code: this.$route.query.c,
      email: this.$route.query.u,
      errCode: null,
      confirmed: false,
    };
  },
  mounted() {
    if (this.$route.query.u && this.$route.query.c) {
      this.onSubmit();
    } else {
      window.location.href = "/";
    }
  },
  methods: {
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
          this.errCode = JSON.parse(JSON.stringify(err.code));
        } else {
          console.log("confirmation success: " + JSON.stringify(result));
          this.confirmed = true;
        }
      });
    },
  },
};
</script>
