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
                    <div class="col-12 mb-4 text-center" v-if="errCode">
                      <h2 class="color-red">{{ errCode }}</h2>
                    </div>
                    <!-- <div class="col-12 mb-3">
                      <input
                        placeholder="Code*"
                        v-model="code"
                        class="input-dark left"
                      />
                    </div> -->
                    <div class="col-12 mb-3">
                      <div class="input-group">
                        <input
                          placeholder="Password*"
                          v-model="password"
                          :type="viewPassword ? 'text' : 'password'"
                          class="input-dark left"
                        />
                        <div
                          class="
                            input-group-append
                            absolute
                            right-0
                            top-0
                            bottom-0
                            items-center
                            pr-3
                          "
                          style="cursor: pointer"
                          @click="viewPassword = !viewPassword"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <svg
                              fill="#808080"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              v-if="viewPassword"
                            >
                              <path
                                d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"
                              />
                            </svg>
                            <svg
                              fill="#808080"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              v-else
                            >
                              <path
                                d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 7l-3.36-2.171c-.405.625-.64 1.371-.64 2.171 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-.742 0-1.438.202-2.033.554l2.033 3.446z"
                              />
                            </svg>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mb-4">
                      <div class="input-group">
                        <input
                          placeholder="Comfirm Password*"
                          v-model="repassword"
                          :type="viewRePassword ? 'text' : 'password'"
                          class="input-dark left"
                        />
                        <div
                          class="
                            input-group-append
                            absolute
                            right-0
                            top-0
                            bottom-0
                            items-center
                            pr-3
                          "
                          style="cursor: pointer"
                          @click="viewRePassword = !viewRePassword"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <svg
                              fill="#808080"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              v-if="viewRePassword"
                            >
                              <path
                                d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"
                              />
                            </svg>
                            <svg
                              fill="#808080"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              v-else
                            >
                              <path
                                d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 7l-3.36-2.171c-.405.625-.64 1.371-.64 2.171 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-.742 0-1.438.202-2.033.554l2.033 3.446z"
                              />
                            </svg>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mb-4">
                      <button
                        class="btn wallet w-100 quandro hover-border-0"
                        @click="onSubmit()"
                      >
                        CONFIRM
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
      viewPassword: false,
      viewRePassword: false,
      errCode: null,
      email: null,
      username: null,
      password: null,
      repassword: null,
      code: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.password == this.repassword) {
        userPool = new AmazonCognitoIdentity.CognitoUserPool(config);
        var userData = {
          Username: this.$route.query.u,
          Pool: userPool,
        };
        this.code = this.$route.query.c;
        console.log("password change for " + userData.Username);
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        this.errcode = "";

        cognitoUser.confirmPassword(this.code, this.password, {
          onSuccess: () => {
            this.resetField();
            this.notiSuccess();
          },
          onFailure: (err) => {
            var code = JSON.stringify(err.code);
            console.log("forgot password confirm error: " + code);
            this.errcode = code;
            setTimeout(() => {
              this.errCode = "";
            }, 4000);
          },
        });
      } else {
        this.errCode = "Password not math";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      }
    },
    resetField() {
      this.code = null;
      this.password = null;
      this.repassword = null;
      this.errCode = null;
    },
    notiSuccess() {
      const text = {
        component: (
          <div class="col-12 text-uppercase">
            <h2 class="mb-3 text-2xl text-custom-green">
              Password has been reset
            </h2>
            <h3 class="mb-3 text-xl h2">
              <a class="text-white font-weight-normal" href="/" target="_blank">
                <u>Login now </u>
              </a>
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
