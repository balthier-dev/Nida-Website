<template>
  <modal
    name="modal-signup"
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
            SIGN UP
          </h1>
        </div>
        <div class="col-12" v-if="refer.name">
          <h1 class="text-2xl mb-4 text-white text-center text-uppercase">
            You're invited by
            <span class="text-custom-green">{{ refer.name }}</span>
          </h1>
        </div>
        <div class="col-12 mb-3 text-center" v-if="errCode">
          <h2 class="color-red">{{ errCode }}</h2>
        </div>
        <div class="col-12 mb-3">
          <input
            placeholder="Email*"
            v-model="formData.email"
            type="email"
            class="input-dark left"
          />
        </div>
        <div class="col-12 mb-3">
          <div class="input-group">
            <input
              placeholder="Password *"
              v-model="formData.password"
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
        <div class="col-12 mb-3">
          <input
            placeholder="Display name *"
            v-model="formData.name"
            class="input-dark left"
          />
        </div>
        <div class="col-12 mb-3">
          <div class="amiko search-auto-complete">
            <model-select
              class="text-white custom"
              :options="country"
              v-model="formData.country"
              placeholder="Country/Region *"
            >
            </model-select>
          </div>
        </div>
        <div class="col-12 mb-3 text-white">
          <input
            id="term"
            type="checkbox"
            class="rounded text-pink-500"
            v-model="agree"
            @change="$emit('setAgree', agree)"
          />
          <label for="term" class="text-white text-base">I agree to the </label>
          <span class="text-custom-green"
            >&nbsp;
            <a
              @click="$modal.show('modal-agree')"
              target="_blank"
              class="text-underline"
              >ECIO Terms of Use.</a
            ></span
          >
        </div>
        <div class="col-12 mb-3 text-white">
          <input
            v-model="acceptInfo"
            type="checkbox"
            id="info"
            class="rounded text-pink-500"
          />
          <label for="info" class="text-white text-base"
            >Keep me informed about the latests news.</label
          >
        </div>
        <div class="col-12 mb-3">
          <button
            class="btn wallet w-100 quandro"
            @click="validate"
            :disabled="loading || !agree"
          >
            {{ loading ? "PROCESS..." : "SIGN UP" }}
          </button>
        </div>
        <!-- <div class="col-12 mb-3 text-center">
          <a
            class="text-white text-2xl"
            @click="$emit('switchModal', 'modal-signin', 'modal-signup')"
          >
            Sign in
          </a>
        </div> -->
      </div>
    </div>
  </modal>
</template>
<script>
import axios from "axios";
import country from "@/store/country";
import { ModelSelect } from "vue-search-select";
import {
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
const CLIENT_ID = process.env.VUE_APP_COGNITO_CLIENT_ID;
const USERPOOL_ID = process.env.VUE_APP_COGNITO_USERPOOL_ID;
var authData = {
  ClientId: CLIENT_ID,
  UserPoolId: USERPOOL_ID,
};
var userPool = new CognitoUserPool(authData);
export default {
  props: {
    walletAddress: {
      type: String,
      return: "",
    },
    referCode: {
      type: String,
      return: "",
    },
    referName: {
      type: String,
      return: "",
    },
    userId: {
      type: String,
      return: "",
    },
    accept: {
      type: Boolean,
      return: false,
    },
  },
  components: {
    ModelSelect,
  },
  computed: {
    country() {
      let data = country.map((e) => {
        return {
          text: e.text,
          value: e.code,
        };
      });

      return data;
    },
  },
  watch: {
    accept() {
      this.agree = this.accept;
    },
  },
  mounted() {
    if (typeof this.$route.query.refer != "undefined") {
      this.getReferName(this.$route.query.refer);
    }
  },
  data() {
    return {
      agree: false,
      loading: false,
      acceptInfo: false,
      viewPassword: false,
      formData: {
        email: "",
        password: "",
        name: "",
        country: "",
      },
      errCode: "",
      refer: {
        name: "",
        code: "",
      },
      baseUrl: process.env.VUE_APP_API_GATEWAY,
    };
  },
  methods: {
    async getReferName(code) {
      let res = await axios
        .post(`${this.baseUrl}email/referral/code`, {
          code: code,
        })
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          console.log("wallet error: ", e);
          return {
            success: false,
          };
        });
      console.log("getReferName", res);
      this.refer.code = code;
      this.refer.name = res.obj.display_name;
    },
    validate() {
      let email = String(this.formData.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      console.log(email);
      if (email == null) {
        this.errCode = "Valid email address format";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (!this.formData.email) {
        this.errCode = "E-mail is required";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (!this.formData.password) {
        this.errCode = "Password is required";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (!this.formData.name) {
        this.errCode = "Display name is required";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (!this.formData.country) {
        this.errCode = "Country is required";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (!this.agree) {
        this.errCode = "Please accept ECIO term of use";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (!this.acceptInfo) {
        this.errCode = "Please accept informed about the latests news";
        setTimeout(() => {
          this.errCode = "";
        }, 4000);
      } else if (this.formData.password) {
        // if (!/^(?=.*[0-9])/.test(this.formData.password)) {
        //   this.errCode = "Password must contain at least 1 number";
        //   setTimeout(() => {
        //     this.errCode = "";
        //   }, 4000);
        // } else

        if (this.formData.password.length < 8) {
          this.errCode = "Password must be 8-20 characters";
          setTimeout(() => {
            this.errCode = "";
          }, 4000);
        }

        // else if (!/^(?=.*[a-z])/.test(this.formData.password)) {
        //   this.errCode = "Password must contain at least 1 lower case letter";
        //   setTimeout(() => {
        //     this.errCode = "";
        //   }, 4000);
        // } else if (!/^(?=.*[A-Z])/.test(this.formData.password)) {
        //   this.errCode = "Password must contain at least 1 upper case letter";
        //   setTimeout(() => {
        //     this.errCode = "";
        //   }, 4000);
        // } else if (!/^(?=.*[!@#$%^&*"])/.test(this.formData.password)) {
        //   this.errCode =
        //     'Password must contain at least 1 special character (!@#$%^&*")';
        //   setTimeout(() => {
        //     this.errCode = "";
        //   }, 4000);
        // }
        else {
          this.createAccount(this.formData, this.walletAddress);
        }
      }
    },
    async createAccount(formData, wallet) {
      this.loading = true;
      console.log("authData", authData);
      console.log(formData, wallet);
      this.$store.commit("setEmail", formData.email);
      let attributeList = [];

      let dataEmail = {
        Name: "email",
        Value: formData.email,
      };

      let dataWallet = {
        Name: "custom:wallet_address",
        Value: wallet,
      };

      let referralCode = {
        Name: "custom:referral_code",
        Value: this.refer.code,
      };

      let dataName = {
        Name: "preferred_username",
        Value: formData.name,
      };

      let dataCountry = {
        Name: "custom:country",
        Value: formData.country,
      };

      let dataId = {
        Name: "custom:id",
        Value: this.userId.toString(),
      };

      let reg = new RegExp(/[\w\W]+[@]+/g, "gi");
      let matches = formData.email.match(reg);
      let user = wallet;
      if (matches.length > 0) {
        user = matches[0].slice(0, matches[0].length - 1);
      }
      let attributeEmail = new CognitoUserAttribute(dataEmail);
      let attributewallet = new CognitoUserAttribute(dataWallet);
      let attributereferralCode = new CognitoUserAttribute(referralCode);
      let attributerecountry = new CognitoUserAttribute(dataCountry);
      let attributedisplay_name = new CognitoUserAttribute(dataName);
      let attributeid = new CognitoUserAttribute(dataId);

      attributeList.push(attributeEmail);
      attributeList.push(attributewallet);
      attributeList.push(attributereferralCode);
      attributeList.push(attributerecountry);
      attributeList.push(attributedisplay_name);
      attributeList.push(attributeid);

      userPool.signUp(
        user,
        formData.password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            console.log("auth.signUp error", err);
            this.errCode = JSON.parse(
              JSON.stringify(
                err.code == "UsernameExistsException"
                  ? "User already exists."
                  : err.code
              )
            );
            this.loading = false;
            setTimeout(() => {
              this.errCode = "";
            }, 4000);
          } else {
            this.$emit("connectWallet");
            this.$emit("switchModal", "modal-verify", "modal-signup");
            console.log("user name is " + result.user.getUsername());
          }
          this.loading = false;
        }
      );
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: inherit !important;
}
.search-auto-complete .ui.selection.dropdown {
  height: 40px;
  background-color: #222326 !important;
  border-color: #222326;
  padding-top: 11px !important;
  color: #d6f017 !important;
}

.ui.dropdown,
.ui.dropdown input {
  font-size: 15px !important;
}
.custom {
  line-height: inherit !important;
}
</style>
