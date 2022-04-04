<template>
  <div class="content xs:grid xs:fixed inset-x-0 z-20">
    <div class="h-full grid xs:grid-cols-3 xl:grid-cols-4">
      <div
        class="
          col-start-1 col-end-4
          grid
          xs:grid-cols-2
          xl:grid-cols-5
          content-center
          nav-front
        "
      >
        <div class="xs:grid xl:hidden self-center">
          <span
            class="color-white"
            @click="$store.dispatch('setSidebar', !$store.getters.getSidebar)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </span>
        </div>
        <div class="grid justify-center self-center xl:w-9/12">
          <a href="/">
            <img src="../../assets/nidalogo.png" />
          </a>
        </div>
        <!-- <div class="relative xs:hidden xl:grid text-center">
          <span class="color-white"> dashboard </span>
        </div> -->
        <div
          class="relative xs:hidden xl:grid text-center mt-2"
          :class="{ activeMenu: $route.path === '/token' }"
        >
          <router-link to="/token" style="margin: auto;">
            <span
              :class="{ activeSpanMenu: $route.path === '/token' }"
              class="color-white font-17"
            >
              Token Mint
            </span>
          </router-link>
          <div class="flex justify-center">
            <!-- <div
              :class="{ activeBottom: $route.path === '/my-collection' }"
            ></div> -->
          </div>
        </div>
        <div
          class="relative xs:hidden xl:grid text-center mt-2"
          :class="{ activeMenu: $route.path === '/my-collection' }"
        >
          <router-link to="/my-collection" style="margin: auto;">
            <span
              :class="{ activeSpanMenu: $route.path === '/my-collection' }"
              class="color-white font-17"
              style="margin: auto;"
            >
              NFTs Mint
            </span>
          </router-link>
          <div class="flex justify-center">
            <!-- <div
              :class="{ activeBottom: $route.path === '/my-collection' }"
            ></div> -->
          </div>
        </div>
      </div>
      <div
        class="
          xs:col-start-3 xs:col-end-4
          xl:col-start-5 xl:col-end-5
          lg:col-start-4 lg:col-end-5
          grid
          xl:grid-cols-2
          gap-8
          mkp-h-bt
        "
      >
        <div class="relative xs:hidden xl:grid self-center mt-1">
          <!-- <div
            class="background-image-holder xl:text-base 2xl:text-sm text-right"
            style="margin-top: -4%; z-index: 1; height: 35px; width: 185px"
          >
            <img
              alt="background"
              src="../../assets/webv3/tab/connectbutton.png"
            />
          </div> -->
          <!-- <p
            v-if="walletAccount"
            style="z-index: 2"
            class="color-white xl:text-base 2xl:text-sm text-right"
          >
            {{ shortAddress }}
          </p> -->
          <div class="dropdown justify-center header-wallet">
            <!-- <div
              class="background-image-holder"
              style="
                margin-left: -14%;
                margin-top: -3%;
                z-index: 0;
                height: 35px;
                width: 120px;
              "
            >
              <img
                alt="background"
                src="../../assets/webv3/tab/playbutton.png"
              />
            </div>
            <a
              :href="gameUrl"
              class="Quantico"
              style="
                z-index: 1;
                color: #ff00b1;
                font-size: 16px;
                margin-top: 2px;
                position: relative;
              "
            >
              PLAY GAME
            </a> -->
            <!-- <a :href="gameUrl">
              <button class="btn btn-play quandro">PLAY GAME</button>
            </a> -->
          </div>
        </div>

        <div class="relative xs:hidden xl:grid self-center">
          <div
            class="mr-3"
            :class="{
              'dropdown-nft': walletAccount,
            }"
            style="padding: 2px 0 10px 0"
          >
            <div
              class="grid grid-rows-1 grid-flow-col justify-center self-center"
              style="
                display: flex;
                border-radius: 40px;
                background: #2f3245;
                padding: 10px;
                margin-top: 7px;
              "
            >
              <div class="header-dropdown" style="cursor: pointer">
                <a
                  href="#"
                  v-if="!walletAccount"
                  @click="connectWallet"
                  class="quantico text-uppercase"
                  style="color: #c6fc0e; z-index: 1; font-size: 14px"
                >
                  Connect wallet
                </a>
                <a
                  v-if="walletAccount"
                  class="quantico text-uppercase"
                  href="#"
                  style="color: #c6fc0e; z-index: 1; font-size: 16px"
                >
                  {{ shortAddress }}
                </a>
              </div>
            </div>
            <div class="dropdown-nft-content market profile">
              <div
                class="d-flex justify-content-center"
                style="margin: 0 auto; min-height: 150px"
              >
                <span
                  v-if="loading"
                  class="spinner-border text-ecio"
                  style="position: relative; top: 50%; z-index: 9"
                  role="status"
                ></span>
                <div v-else>
                  <!-- <Profile
                    :profile="connectStatus.obj[0]"
                    @disconnect="unconnectWallet"
                    v-if="
                      connectStatus.success &&
                      typeof connectStatus.obj != 'undefined' &&
                      connectStatus.obj[0].email !=
                        walletAccount + '@ecio.space'
                    "
                  /> -->
                  <!-- <Sidebar
                    :lkmBalance="inGameLkm"
                    :ecioBalance="inGameEcio"
                    :lkmBalanceUsd="inGameLkmUsd"
                    :ecioBalanceUsd="inGameEcioUsd"
                    :walletAddress="shortAddress"
                    :displayName="displayName"
                    :account="account"
                    style="right: 1.6%; width: 350px"
                    v-if="
                      connectStatus.success &&
                      typeof connectStatus.obj != 'undefined' &&
                      connectStatus.obj[0].email !=
                        walletAccount + '@ecio.space'
                    "
                  />

                  <CreateAccount
                    :walletAddress="shortAddress"
                    :accessPass="chainId == '0x61' ? accessPass : true"
                    @createAccount="$modal.show('modal-signup')"
                    v-else
                  /> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="xs:grid xl:hidden self-center justify-end">
          <svg
            @click="$store.dispatch('setSideMenu', !$store.getters.getSideMenu)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list text-white text-base"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
      </div>
    </div>
    <modalGame @switchModal="switchModal" />
    <modalSignIn @switchModal="switchModal" @setType="(e) => (type = e)" />
    <modalSignUp
      :walletAddress="walletAccount"
      :userId="
        typeof connectStatus.obj != 'undefined'
          ? connectStatus.obj[0].id.toString()
          : ''
      "
      :accept="accept"
      @connectWallet="connectWallet"
      @setAgree="(e) => (accept = e)"
      @switchModal="switchModal"
      @setEmail="(e) => (emailModal = e)"
    />
    <modalVerify
      type="create"
      :email="emailModal"
      :address="walletAccount"
      @switchModal="switchModal"
      @setType="(e) => (type = e)"
      @resetEmail="(e) => $store.commit('setEmail', '')"
      @verifyEmail="verifyFunc"
    />
    <modalConfirm
      :type="type"
      :accept="accept"
      :address="walletAccount"
      @switchModal="switchModal"
      @linkAccount="linkAccount"
    />
    <modalAgree
      :accept="accept"
      @switchModal="switchModal"
      @setAgree="(e) => (accept = e)"
    />
    <modalSuccess
      :address="walletAccount"
      @switchModal="switchModal"
      @LinkDone="connectWallet"
    />
    <modalRefer
      :profile="
        typeof connectStatus.obj != 'undefined' ? connectStatus.obj[0] : {}
      "
    />
  </div>
</template>

<script>
import mautic from "mautic-tracking";
mautic.initialize("https://mt.ecio.space/mtc.js");
import modalGame from "@/components/Modal/ModalGameAccount";
import modalSignIn from "@/components/Modal/ModalSignin";
import modalSignUp from "@/components/Modal/ModalSignup";
import modalConfirm from "@/components/Modal/ModalConfirm";
import modalAgree from "@/components/Modal/ModalAgreement";
import modalSuccess from "@/components/Modal/ModalLinkSuccess";
import modalVerify from "@/components/Modal/ModalVerify";
// import Profile from "@/components/NavProfile.vue";
// import Sidebar from "@/components/Sidebar/SidebarProfile.vue";
// import CreateAccount from "@/components/NavCreateAccount";
// import Sidebar from "@/components/Sidebar/SidebarProfile";
import axios from "axios";
import modalRefer from "@/components/Modal/ModalReferalLink";
import Web3 from "web3";
//import "../../../public/css/theme.css";

export default {
  name: "NavbarMarketPlace",
  components: {
    modalGame,
    modalSignUp,
    modalSignIn,
    modalConfirm,
    modalAgree,
    modalSuccess,
    modalVerify,
    // CreateAccount,
    modalRefer,
    // Profile
    // Sidebar,
  },
  computed: {
    emailModal() {
      return this.$store.state.emailSignup;
    },
    //ตัด address ให้เป็นรูปแบบสั้น
    shortAddress() {
      return "".concat(
        this.walletAccount.substring(0, 6),
        "...",
        this.walletAccount.slice(-4)
      );
    },
  },
  data() {
    return {
      loading: true,
      type: "link",
      accept: false,
      currentActivityId: 1,
      hasRegisterActivity: false,
      walletAccount: "",
      contract: undefined,
      connectStatus: {
        success: true,
      },
      dropdown: true,
      baseUrl: process.env.VUE_APP_API_GATEWAY,
      gameUrl: process.env.VUE_APP_GAME_URL,
      chainId: process.env.VUE_APP_CHAIN_ID,
      accessPass: false,
      inGameLkm: "..",
      inGameEcio: "..",
      inGameEcioNumber: 0,
      inGameLkmNumber: 0,
      inGameLkmUsd: 0,
      inGameEcioUsd: 0,
      displayName: "",
      country: "",
      account: "",
    };
  },
  async mounted() {
    var that = this;
    if (window.ethereum != undefined) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.on("accountsChanged", function () {
        that.connectWallet();
        that.walletAccount = window.ethereum.selectedAddress;
        that.$emit("connected", window.ethereum.selectedAddress);
      });

      window.ethereum.on("chainChanged", () => {
        that.connectWallet();
        that.walletAccount = window.ethereum.selectedAddress;
        that.$emit("connected", window.ethereum.selectedAddress);
      });

      window.ethereum.on("disconnect", () => {
        that.walletAccount = "";
        that.$emit("disconnected", window.ethereum.selectedAddress);
      });

      window.ethereum.on("connected", () => {
        that.$emit("connected", window.ethereum.selectedAddress);
      });

      if (window.ethereum.selectedAddress != "") {
        that.connectWallet();
      }
    }
  },
  methods: {
    async verifyFunc() {
      this.$modal.hide("modal-verify");
      this.$modal.show("modal-success");
    },
    async linkAccount() {
      this.switchModal("modal-success", "modal-confirm");
    },
    async checkConnectWallet() {
      this.loading = true;
      let res = await axios
        .post(`${this.baseUrl}check/wallet`, { wallet: this.walletAccount })
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          console.log("wallet error: ", e);
          return {
            success: false,
          };
        });
      this.connectStatus = res;
    },
    async switchModal(open, close) {
      this.$modal.hide(close);
      this.$modal.show(open);
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) {
          console.log("accounts", accounts);
          this.walletAccount = accounts[0];
        } else {
          this.walletAccount = window.ethereum.selectedAddress;
        }
        mautic.pageView({
          walletaddress: window.ethereum.selectedAddress,
          firstname: window.ethereum.selectedAddress,
        });
        this.account = accounts;
        this.loadUserData();
        await this.checkConnectWallet().then(() => this.checkSpecialPass());
      }
    },
    async unconnectWallet() {
      if (this.validated()) {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });

        this.walletAccount = "";

        mautic.pageView({
          walletaddress: "",
          firstname: "",
        });
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }

      return false;
    },
    async switchNetwork() {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: process.env.VUE_APP_CHAIN_ID,
            chainName: process.env.VUE_APP_CHAIN_NAME,
            rpcUrls: [process.env.VUE_APP_RPC_URL],
            nativeCurrency: {
              name: process.env.VUE_APP_CURRENCY_NAME,
              symbol: process.env.VUE_APP_CURRENCY_SYMBOL,
              decimals: 18,
            },
            blockExplorerUrls: [process.env.VUE_APP_BLOCK_EXPLORER],
          },
        ],
      });
    },
    async loadUserData() {
      axios
        .get(
          "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
            "token?wallet_address=" +
            this.account
        )
        .then((response) => {
          console.log(response.data);
          this.inGameLkm = response.data.coin_lakrima.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }
          );
          this.inGameEcio = response.data.coin_ecio.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          });
          this.inGameEcioNumber = response.data.coin_ecio;
          this.inGameLkmNumber = response.data.coin_lakrima;
          this.inGameLkmUsd = response.data.coin_lakrima_usd.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }
          );
          this.inGameEcioUsd = response.data.coin_ecio_usd.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }
          );
          console.log(this.walletAccount);
          this.displayName = response.data.display_name;
          this.country = response.data.country;
        });
    },
    async checkSpecialPass() {
      if (this.chainId == "0x61") {
        axios
          .get(
            process.env.VUE_APP_API_ALPHA_ENDPOINT +
              "/api/alphaplay/" +
              this.walletAccount
          )
          .then((response) => {
            if (
              response.data.rank ||
              response.data.gold ||
              response.data.silver ||
              response.data.bronze
            ) {
              this.accessPass = true;
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.market.dropdown-nft-content {
  top: 100%;
  border-radius: 20px;
}

.btn-play {
  background: #4804d9;
  border-radius: 3px;
  height: 40px;
  border: none;
  width: 100px !important;
  color: white;
}

.btn-play:hover {
  color: white;
}

.nav-front {
  font-size: 17px;
}
.head.dropdown-nft-content {
  top: 120%;
  border-radius: 20px;
  right: -38%;
}
.dropdown-nft-content.profile {
  min-width: 345px;
  right: -35px;
}
@media screen and (max-width: 560px) {
  .dropdown-nft-content.profile {
    position: inherit;
  }
}
.content {
  height: 80px;
  padding: 15px 50px 50px 50px;
  margin: 0;
}

.color-white {
  color: white;
  font-family: "Quantico";
  text-transform: uppercase;
  cursor: pointer;
}

.color-white:hover {
  color: rgba(224, 251, 22, 1);
}
.quandro {
  font-family: "Quantico";
  text-transform: uppercase;
}

.activeMenu {
  color: #e0fb16;
}
.activeBottom {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #e0fb16 0%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 45%;
  height: 4px;
  bottom: -20px;
  position: absolute;
}

.active {
  background-color: #3f4148 !important;
}
.activeSpanMenu {
  color: #e0fb16;
}
.mkp-h-bt {
  margin-top: -5px;
}
.wallet {
  padding: 5px;
  border-radius: 10px;
  background-color: #4804d9;
  text-align: center;
  color: #fff;
  font-size: 16px !important;
  height: 40px;
}

.wallet:hover {
  color: #fff !important;
}

.wallet.small {
  font-size: 13px !important;
}

a {
  font-weight: 700;
}
</style>
