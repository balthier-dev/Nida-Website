<template>
  <div class="main-container bg-custom min-h-screen xs:py-16">
    <div class="grid" :class="isSidebar && 'grid-cols-4'">
      <div
        v-if="isSidebar"
        class="xs:hidden xl:grid xl:col-start-1 xl:col-end-2"
      >
        <Sidebar
          :lkmBalance="inGameLkm"
          :ecioBalance="inGameEcio"
          :lkmBalanceUsd="inGameLkmUsd"
          :ecioBalanceUsd="inGameEcioUsd"
          :walletAddress="shortAddress"
          :displayName="displayName"
          :account="account"
        />
      </div>
      <div v-if="visibleSidebar && isSidebar">
        <Sidebar
          :lkmBalance="inGameLkm"
          :ecioBalance="inGameEcio"
          :lkmBalanceUsd="inGameLkmUsd"
          :ecioBalanceUsd="inGameEcioUsd"
          :walletAddress="shortAddress"
          :displayName="displayName"
          :account="account"
        />
      </div>
      <!-- <div class="row">
        <div class="col-8"> -->
      <div
        class="
          xs:col-start-1
          xl:col-start-2
          col-end-5
          xs:mt-7
          xl:mt-14
          xs:ml-7 xs:mr-10
          xl:ml-10 xl:mr-20
          2xl:ml-0
          xl:mr-20
        "
      >
        <div class="grid grid-cols-1 justify-between mt-4">
          <div class="self-center">
            <span
              class="
                quantico
                xs:text-lg
                md:text-xl
                lg:text-xl
                xl:text-2xl
                2xl:text-3xl
                text-white
                font-weight-bold
                uppercase
              "
              >CLAIM nft from binance</span
            >
          </div>
        </div>
        <div class="grid grid-row mb-5 mt-1">
          <div class="grid grid-cols-2 justify-between">
            <div class="self-center">
              <span
                class="
                  quantico
                  xs:text-md
                  md:text-md
                  lg:text-lg
                  xl:text-xl
                  2xl:text-xl
                  text-grey
                  font-weight-bold
                  uppercase
                "
                >This page is intended to migrate NFT's purchased from Binance
                NFT. If you participated in the Binance NFT sale, you can claim
                to migrate your NFT's to our ecosystem.</span
              >
            </div>
            <div
              class="
                grid grid-cols-2
                gap-3
                bg-black
                p-3
                rounded-xl
                justify-end
                mt-4
              "
              style="
                display: block;
                background: #1e202c;
                width: 350px;
                margin-left: 30%;
              "
            >
              <div class="row">
                <div class="col-8">
                  <h2
                    class="
                      quantico
                      text-uppercase
                      xs:text-xs
                      xl:text-lg
                      2xl:text-lg
                      font-bold
                    "
                  >
                    you have new
                  </h2>
                  <h1
                    class="
                      quantico
                      text-uppercase
                      xs:text-xs
                      xl:text-xl
                      2xl:text-2xl
                      font-bold
                      mt-1
                      text-white
                    "
                  >
                    {{ binanceNftAmount }} Binance NFT
                  </h1>
                </div>
                <div class="col-4" style="margin: auto">
                  <button
                    @click="$modal.show('nftClaim')"
                    class="btn btn-claim text-uppercase"
                  >
                    Claim ALL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12">
            <img
              src="../assets/userprofile/Line.png"
              class="w-100"
              style="opacity: 0.7"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 justify-between mt-5">
          <div class="self-center">
            <span
              class="
                quantico
                xs:text-lg
                md:text-xl
                lg:text-xl
                xl:text-xl
                2xl:text-xl
                text-white
                font-weight-bold
                uppercase
              "
              >Your cards</span
            >
          </div>
        </div>
        <div
          v-if="loadingCard"
          class="lds-ring-market"
          style="border-color: #e0fb16 transparent transparent transparent"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          class="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            2xl:grid-cols-4
            xs:gap-6
            lg:gap-12
            2xl:gap-12
            xs:mt-6
            xl:mt-12
          "
          v-if="!loadingCard"
        >
          <div v-for="card in cards" :key="card.id" class="card">
            <BinanceCard
              :card="card"
              :isOwner="isOwner"
              :key="card.id"
              :isFavScreen="isFavScreen"
              :favorites="favorites"
            />
          </div>
        </div>

        <!-- </div>
          <div class="col-4"></div>
        </div> -->
        <div v-else class="grid grid-cols-1 justify-between mt-5"></div>
        <div
          v-if="visibleSideMenu"
          class="fixed right-0 top-0 side-menu-top w-64 h-full side-menu-bg"
        >
          <SideMenu :account="shortAddress" />
        </div>
      </div>
    </div>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="nftClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-end">
          <button @click="$modal.hide('nftClaim')">
            <img src="../assets/images/modal-close.png" alt="modal close" />
          </button>
        </div>
        <div class="flex">
          <span
            class="text-2xl font-weight-bold text-ecio-green uppercase quantico"
          >
            PLEASE CONFIRM
          </span>
        </div>
        <!-- <div class="text-white mt-4 my-2 uppercase quantico text-lg">
          <span>NFT ITEM  {{ binanceNftAmount }} pcs</span>
        </div> -->
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                NFT ITEM
              </span>
            </div>
            <div class="col-6 text-right">
              <span class="text-grey quantico uppercase text-md">
                {{ binanceNftAmount }} pcs
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <span
                class="text-white quantico uppercase font-weight-bold text-md"
              >
                Claim Date
              </span>
            </div>
            <div class="col-6 text-right">
              <span class="text-grey quantico uppercase text-md">
                {{ lastClaim }}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-2 mb-2 divider" style="border-bottom: 1px solid #fff" />
        <div class="mt-4">
          <div class="row">
            <div class="col-6">
              <button
                v-if="onloadApprove"
                class="btn bg-custom-approve rounded-xl"
              >
                <span
                  class="quantico uppercase text-white font-weight-bold text-lg"
                >
                  <div
                    class="lds-ring"
                    style="
                      border-color: #fff transparent transparent transparent;
                    "
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  Processing
                </span>
              </button>
              <button
                v-else
                class="btn bg-custom-approve rounded-xl"
                :disabled="isApprovedEcio"
                @click="approveHandler"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  approve
                </span>
              </button>
            </div>
            <div class="col-6">
              <button
                v-if="onLoadConfirm"
                class="btn bg-custom-green rounded-xl"
              >
                <span
                  class="quantico uppercase text-black font-weight-bold text-lg"
                >
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  Processing
                </span>
              </button>

              <button
                v-else
                class="btn btn-claim rounded-xl text-uppercase font-weight-bold"
                :disabled="!isApprovedEcio || binanceNftAmount == 0"
                @click="claimHandler"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="unMigrateModal"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-center">
          <img src="../assets/images/nft-card.png" />
        </div>
        <div class="mt-4 text-center">
          <span class="text-white quantico uppercase font-weight-bold text-2xl">
            You have {{ unMigrateNFT.length }} unclaim NFTs.
          </span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-12">
              <button v-if="onLoadConfirm" class="btn btn-claim rounded-xl" style="padding-top: 5px;">
                <span
                  class="quantico uppercase font-weight-bold"
                >
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <!-- Processing -->
                </span>
              </button>

              <button
                v-else
                class="btn rounded-xl btn-claim"
                @click="signUnmigrateNFT"
              >
                <span class="quantico uppercase font-weight-bold">
                  SIGN TO CLAIM
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="successClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-center">
          <img src="../assets/userprofile/true.png" />
        </div>
        <div class="mt-4 text-center">
          <span class="text-white quantico uppercase font-weight-bold text-2xl">
            NFT FROM BINANCE has been CLAIMED
          </span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-12">
              <button
                class="btn rounded-xl bg-custom-close"
                @click="hideSuccessClaim"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      name="falseClaim"
      class="backdrop"
    >
      <div class="bg-ecio-bg p-5">
        <div class="flex justify-center">
          <img src="../assets/userprofile/false.png" />
        </div>
        <div class="mt-4 text-center">
          <span class="text-white quantico uppercase font-weight-bold text-2xl">
            Something went wrong in the claiming process
          </span>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-12">
              <button
                class="btn rounded-xl bg-custom-close"
                @click="$modal.hide('falseClaim')"
              >
                <span class="quantico uppercase font-weight-bold text-white">
                  close
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import mautic from "mautic-tracking";
import { recoverPersonalSignature } from "eth-sig-util";
import { ethers } from "ethers";
mautic.initialize("https://mt.ecio.space/mtc.js");
import "primevue/resources/themes/arya-green/theme.css";
import BinanceCard from "../components/Card/BinanceCard.vue";
import Sidebar from "../components/Sidebar/SidebarProfile.vue";
import SideMenu from "../components/SideMenu/SideMenu.vue";
import BinanceNFT from "@/contracts/BinanceNFT.json";
import BinanceMirgrateNFT from "@/contracts/BinanceMigrate.json";
import Web3 from "web3";
import axios from "axios";
import ERC20 from "./../contracts/ERC20.json";
export default {
  components: {
    Sidebar,
    SideMenu,
    BinanceCard,
  },
  props: {
    isOwner: {
      type: Boolean,
      default: false,
    },
    isSidebar: {
      type: Boolean,
      default: true,
    },
    isFavScreen: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
    },
    reSort: {
      type: Boolean,
    },
  },
  computed: {
    convertTokenId() {
      return (
        "#" +
        "0".repeat(9 - String(this.currentCard.token_id).length) +
        this.currentCard.token_id
      );
    },
    visibleSidebar() {
      return this.$store.getters.getSidebar;
    },
    visibleSideMenu() {
      return this.$store.getters.getSideMenu;
    },
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
      addressTo: "",
      validMaximum: false,
      validLimit: false,
      walletAccount: "",
      account: "",
      selectedOption: {},
      ecioContract: undefined,
      lkmContract: undefined,
      ecioBalance: 0,
      lkmBalance: 0,
      busdBalance: 0,
      bnbBalance: 0,
      ecioBalanceUsd: 0,
      lkmBalanceUsd: 0,
      ecioAmount: 0,
      lkmAmount: 0,
      nftCoreContract: undefined,
      busdContract: undefined,
      claimTokenContract: undefined,
      binanceNftContract: undefined,
      binanceMigrateNftContract: undefined,
      binanceNftAmount: 0,
      onloadApprove: false,
      isApproveEcio: false,
      onLoadConfirm: false,
      totalClaimLkm: 0,
      totalClaimEcio: 0,
      inGameLkm: "-",
      inGameEcio: "-",
      inGameEcioNumber: "-",
      inGameLkmNumber: "-",
      inGameLkmUsd: "-",
      inGameEcioUsd: "-",
      displayName: "",
      country: "",
      feeRate: 5,
      isApprovedEcio: false,
      lastClaim: new Date(),
      nextClaim: "",
      dynamicFee: "-",
      stackClaim: "-",
      startCountTime: "",
      userWithdrawTax: 5000,
      loadingCard: false,
      unMigrateNFT: [],
      cards: [
        // {
        //   id: 99,
        //   owner: "test",
        //   nft_type: "card",
        //   token_id: "212300001136",
        //   image:
        //     "https://public.nftstatic.com/static/nft/res/cd718d6384f748a6bfe55d23244df380.png",
        // },
      ],
      tokens: [],
      blockNumber: 0,
    };
  },
  mounted() {
    console.log("in mount");
    var that = this;
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
    if (
      window.ethereum.selectedAddress != "" ||
      typeof window.ethereum != "undefined"
    ) {
      this.connectWallet().then(() => {
        // this.testSign();
        console.log("test Wallet");
        this.loadBalanceOf();
      });
    }
  },
  methods: {
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.ecioContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.ecioBalance = Number(
              Web3.utils.fromWei(results, "ether")
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
        this.lkmContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.lkmBalance = Number(
              Web3.utils.fromWei(results, "ether")
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
        this.busdContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.busdBalance = Number(
              Web3.utils.fromWei(results, "ether")
            ).toLocaleString(undefined, {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            });
          });
      });
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log(window.web3.eth.getBalance(window.ethereum.selectedAddress));
        this.bnbBalance = await window.web3.eth.getBalance(
          window.ethereum.selectedAddress
        );
        this.account = await window.web3.eth.getAccounts();
        this.walletAccount = window.ethereum.selectedAddress;
        this.checkLoadApprove();
        this.listUnmigrateItem();
        // this.testSign();
        // console.log(Web3.currentProvider.selectedAddress);
      }
    },
    async loadUserData() {
      this.loadingCard = true;
      axios
        .get(
          "https://n9wv0b0vy9.execute-api.ap-southeast-1.amazonaws.com/prod/api/v1/" +
            "token?wallet_address=" +
            this.account
        )
        .then((response) => {
          this.loadingCard = false;
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
    async loadBalanceOf() {
      console.log("try to load balance");
      // this.loadingCard = true;
      // let i = 0;
      await this.loadContract().then(() => {
        this.binanceNftContract.methods
          .balanceOf(this.walletAccount)
          .call()
          .then((pl) => {
            console.log(pl);
            this.binanceNftAmount = pl;
            for (let i = 0; i < pl; i++) {
              console.log("index : " + i);
              this.loadBinanceTokenInfo(i);
              if (i === pl.lenth - 1) {
                this.loadingCard = false;
              }
            }
          });
      });
    },
    async loadBinanceTokenInfo(index) {
      let card = {};
      await this.loadContract().then(() => {
        this.binanceNftContract.methods
          .tokenOfOwnerByIndex(this.walletAccount, index)
          .call()
          .then((res) => {
            this.tokens.push(Number(res));
            this.binanceNftContract.methods
              .tokenURI(res)
              .call()
              .then((url) => {
                axios.get(url).then((response) => {
                  console.log(response);
                  card.token_id = res;
                  card.id = index;
                  card.nft_type = "card";
                  card.image = response.data.image;
                  console.log(card);
                  this.cards.push(card);
                });
              });
          });
      });
    },
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }

      this.ecioContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_ECIO_CONTRACT_ADDRESS
      );

      this.lkmContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_LAKRIMA_CONTRACT_ADDRESS
      );

      this.busdContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_BUSD_TOKEN_CONTRACT_ADDRESS
      );

      this.binanceNftContract = await new window.web3.eth.Contract(
        BinanceNFT.abi,
        process.env.VUE_APP_NFT_BINANCE_CONTRACT_ADDRESS
      );

      this.binanceMigrateNftContract = await new window.web3.eth.Contract(
        BinanceMirgrateNFT.abi,
        process.env.VUE_APP_NFT_BINANCE_MIGRATE_CONTRACT_ADDRESS
      );
    },
    async checkLoadApprove() {
      await this.loadContract().then(() => {
        this.binanceNftContract.methods
          .isApprovedForAll(
            this.walletAccount,
            process.env.VUE_APP_NFT_BINANCE_MIGRATE_CONTRACT_ADDRESS
          )
          .call()
          .then((pl) => {
            this.isApprovedEcio = pl;
          });
      });
    },
    approveHandler() {
      this.onloadApprove = true;
      this.loadContract().then(() => {
        this.binanceNftContract.methods
          .setApprovalForAll(
            process.env.VUE_APP_NFT_BINANCE_MIGRATE_CONTRACT_ADDRESS,
            true
          )
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendApprove(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptApprove(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => {
            this.showToastError(error);
            this.onloadApprove = false;
          });
      });
    },
    claimHandler() {
      this.onLoadConfirm = true;
      console.log(this.tokens);
      this.loadContract().then(() => {
        this.binanceMigrateNftContract.methods
          .claim(this.tokens)
          .send({ from: this.walletAccount, value: 5000000000000000 }) // in WEI, which is equivalent to 1 ether })
          .on("sent", (data) => this.sendClaim(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptClaim(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => {
            this.showToastError(error);
            console.log(error);
            // this.signClaimNFT();
            // this.onloadApprove = false;
          });
      });
    },
    sendApprove(data) {
      console.log("sendApprove data", data);
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);
    },
    receiptApprove() {
      // this.successTransaction("Approved your wallet", this.txHash);
      this.isApprovedEcio = true;
      this.onloadApprove = false;
      this.checkLoadApprove();
    },
    sendClaim(data) {
      console.log("sendClaim data", data);
    },
    receiptClaim(data) {
      this.blockNumber = data.blockNumber;
      axios
        .post(
          process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT + "claim_tokens",
          {
            wallet_address: this.account[0],
            token_ids: this.tokens,
          }
        )
        .then((response) => {
          console.log(response);
        });
      this.signClaimNFT();
    },
    checkAmountLkm() {
      // console.log(this.lkmAmount);
      // console.log(this.inGameLkmNumber);
      if (this.lkmAmount > 100000) {
        this.validMaximum = true;
      } else {
        this.validMaximum = false;
      }
      if (this.lkmAmount > this.inGameLkmNumber) {
        this.validLimit = true;
      } else {
        this.validLimit = false;
      }
      this.dynamicFee = Number(
        this.lkmAmount * (this.feeRate / 100)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      this.totalClaimLkm =
        this.lkmAmount - this.lkmAmount * (this.feeRate / 100);
    },
    checkAmountEcio() {
      if (this.ecioAmount > 100000) {
        this.validMaximum = true;
      } else {
        this.validMaximum = false;
      }
      if (this.ecioAmount > this.inGameEcioNumber) {
        this.validLimit = true;
      } else {
        this.validLimit = false;
      }
      this.dynamicFee = Number(
        this.ecioAmount * (this.feeRate / 100)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      this.totalClaimEcio =
        this.ecioAmount - this.ecioAmount * (this.feeRate / 100);
    },
    async testSign() {
      axios
        .post(process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT + "nonce", {
          wallet_address: this.account[0],
        })
        .then((response) => {
          let message = response.data.toString();
          // let message = "HELLO TEST";
          let hashMsg = Web3.utils.keccak256(message);
          window.web3 = new Web3(window.ethereum);
          if (typeof window.ethereum == "undefined") {
            window.web3.setProvider(
              new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
            );
          }
          window.web3.eth.sign(
            hashMsg,
            this.walletAccount,
            function (err, result) {
              if (err) return console.error(err);
              console.log("NONCE : " + response.data);
              console.log("SIGNED SIG:" + result);

              // Recover address from Sig
              const address = recoverPersonalSignature({
                data: hashMsg,
                sig: result,
              });
              console.log("RECOVER : " + address);

              const pk = ethers.utils.recoverPublicKey(
                ethers.utils.arrayify(hashMsg),
                result
              );

              console.log("PUB KEY : " + pk);
            }
          );
        });
    },
    async listUnmigrateItem() {
      axios
        .get(
          process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT +
            "claim_tokens?wallet_address=" +
            this.account[0]
        )
        .then((response) => {
          if (response.data.code == 500) {
            console.log(response.data);
          } else {
            response.data.map((list, index) => {
              if (!list.is_migrate) {
                this.unMigrateNFT.push(list.token_id);
              }
              if (
                index === response.data.length - 1 &&
                this.unMigrateNFT.length > 0
              ) {
                console.log(this.unMigrateNFT);
                this.$modal.show("unMigrateModal");
              }
              // console.log(list.token_id+ " : " +list.is_migrate);
            });
          }
        });
    },
    hideSuccessClaim() {
      this.$modal.hide("successClaim");
      this.loadBalanceOf();
    },
    async signClaimNFT() {
      // let wallet = await window.web3.eth.getAccounts();
      this.onLoadConfirm = true;
      axios
        .post(process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT + "nonce", {
          wallet_address: this.account[0],
        })
        .then((response) => {
          // let message = response.data + this.lkmAmount;
          // console.log(response);
          let message = response.data;
          console.log("MSG b4 hash : " + message);
          let hashMsg = Web3.utils.keccak256(message);
          window.web3 = new Web3(window.ethereum);
          if (typeof window.ethereum == "undefined") {
            window.web3.setProvider(
              new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
            );
          }
          let that = this;
          window.web3.eth.sign(
            hashMsg,
            that.walletAccount,
            function (err, result) {
              if (err) return console.error(err);
              console.log("SIGNED SIG:" + result);
              const pk = ethers.utils.recoverPublicKey(
                ethers.utils.arrayify(hashMsg),
                result
              );
              console.log("PUB KEY : " + pk);
              console.log(that.tokens);
              // window.web3.eth.getBlockNumber().then((blockNumber) => {
              axios
                .post(
                  process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT + "migrate",
                  {
                    block_number: that.blockNumber,
                    wallet_address: that.account[0],
                    token_ids: that.tokens,
                    signature: result,
                  }
                )
                .then((res) => {
                  if (res.data.code !== 200) {
                    that.switchModal("falseClaim", "nftClaim");
                  } else {
                    that.onLoadConfirm = false;
                    console.log(res);
                    that.cards = [];
                    // that.loadUserData();
                    // that.loadBalanceOf();
                    that.switchModal("successClaim", "nftClaim");
                  }
                })
                .catch((err) => {
                  that.onLoadConfirm = false;
                  console.log("ERROR");
                  that.switchModal("falseClaim", "nftClaim");
                  console.log(err);
                });
              // });
            }
          );
        });
    },
    async signUnmigrateNFT() {
      // let wallet = await window.web3.eth.getAccounts();
      this.onLoadConfirm = true;
      axios
        .post(process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT + "nonce", {
          wallet_address: this.account[0],
        })
        .then((response) => {
          // let message = response.data + this.lkmAmount;
          // console.log(response);
          let message = response.data;
          console.log("MSG b4 hash : " + message);
          let hashMsg = Web3.utils.keccak256(message);
          window.web3 = new Web3(window.ethereum);
          if (typeof window.ethereum == "undefined") {
            window.web3.setProvider(
              new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
            );
          }
          let that = this;
          window.web3.eth.sign(
            hashMsg,
            that.walletAccount,
            function (err, result) {
              if (err) return console.error(err);
              console.log("SIGNED SIG:" + result);
              const pk = ethers.utils.recoverPublicKey(
                ethers.utils.arrayify(hashMsg),
                result
              );
              console.log("PUB KEY : " + pk);
              console.log(that.tokens);
              // window.web3.eth.getBlockNumber().then((blockNumber) => {
              axios
                .post(
                  process.env.VUE_APP_API_BINANCE_MIGRATE_ENDPOINT + "migrate",
                  {
                    wallet_address: that.account[0],
                    token_ids: that.unMigrateNFT,
                    signature: result,
                  }
                )
                .then((res) => {
                  if (res.data.code !== 200) {
                    that.switchModal("falseClaim", "nftClaim");
                  } else {
                    that.onLoadConfirm = false;
                    console.log(res);
                    that.cards = [];
                    // that.loadUserData();
                    // that.loadBalanceOf();
                    that.$modal.hide("unMigrateModal");
                    that.switchModal("successClaim", "nftClaim");
                  }
                })
                .catch((err) => {
                  that.onLoadConfirm = false;
                  console.log("ERROR");
                  that.switchModal("falseClaim", "nftClaim");
                  console.log(err);
                });
              // });
            }
          );
        });
    },
    switchModal(open, close) {
      this.$modal.show(open);
      this.$modal.hide(close);
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      console.log(charCode);
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
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
  },
};
</script>

<style>
.side-menu-top {
  margin-top: 100px;
}
.preview {
  color: #3f4148;
}
.vm--modal {
  height: auto !important;
}
.load-more:hover {
  color: #e0fb16 !important;
}
.side-menu-bg {
  background-color: #1d1d1d;
}
.bg-custom-amount {
  background-color: #222326 !important;
}
.bg-custom-amount:focus {
  background-color: #222326;
}
.amiko {
  font-family: "Amiko";
}
.radius-10 {
  border-radius: 10px !important;
}
.bg-custom {
  background-color: #111111;
}
.bg-custom-purple {
  background-color: #9a66ff;
}
.bg-custom-approve {
  background-color: #4804d9;
}
.bg-custom-close {
  background-color: #2f3245;
}
.currecy-text-color {
  color: #3f4148;
}
.card {
  background-color: #252525;
  border-radius: 4px;
}
.bg-custom-green {
  background: #e0fb16;
}
.divider {
  border-bottom: 1px solid #000000;
}
.card-id {
  color: rgba(255, 255, 255, 0.5);
}
.form-select {
  background-color: #000000;
  color: #ffffff;
  padding-left: 10px;
  height: 40px;
}
.quantico {
  font-family: Quantico;
}
.search-auto-complete .ui.selection.dropdown {
  border-radius: 10px;
  background-color: #000000 !important;
  border-color: #000000;
}
.search-auto-complete .ui.selection.active.dropdown:hover,
.ui.selection.active.dropdown:hover .menu {
  border-color: #000000;
  background-color: #000000;
}
.search-auto-complete .ui.selection.dropdown .menu > .item {
  color: #ffffff;
  border-color: #000000;
}
.search-auto-complete .ui.dropdown .menu .selected.item,
.ui.dropdown.selected {
  background: linear-gradient(0deg, #3f4148, #3f4148), #222326;
}
.search-auto-complete .ui.dropdown .menu {
  border-color: #000000;
}
.search-auto-complete .ui.dropdown .menu {
  background-color: #000000;
  border-color: #000000 !important;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}

.bg-custom-green:disabled {
  background: #9e9e9e;
}

.bg-custom-purple:disabled {
  background: #9e9e9e;
}
.text-custom-green {
  color: #e0fb16;
}
.text-custom-purple {
  color: #9a66ff;
}
.text-custom-red {
  color: red;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 3px;
  border: 3px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
.p-tabview .p-tabview-panels {
  background: none;
  font-family: "Quantico";
}
.p-tabview .p-tabview-nav {
  font-family: "Quantico";
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  background: none;
}
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: none;
  border-color: #e0fb16;
  color: #e0fb16;
}
.btn-claim {
  font-size: 1.2rem;
  padding: 20px;
  text-align: center;
  background-color: #e0fb16;
  color: #000;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  font-family: "Quantico" !important;
}
.p-tabview
  .p-tabview-nav
  li:not(.p-highlight):not(.p-disabled):hover
  .p-tabview-nav-link {
  border-color: #e0fb16 !important;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
