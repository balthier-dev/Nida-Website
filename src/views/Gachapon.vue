<template>
  <div class="main-container">
    <section class="cover" data-overlay="4">
      <div class="background-image-holder background-top">
        <img alt="background" src="../assets/gachapon/cover.webp" />
      </div>
      <div class="line-left">
        <img src="@/assets/gachapon/line-left.webp" alt="" />
      </div>
      <div class="line-right">
        <img src="@/assets/gachapon/line-right.webp" alt="" />
      </div>

      <div class="label-bottom d-none d-lg-block">
        <img src="@/assets/gachapon/monitor.png" alt="" />
      </div>
      <div class="container" style="padding-bottom: 50px">
        <div class="row mt-1 d-none d-lg-flex text-center">
          <div class="col-10 px-5">
            <!-- activePOD: {{ active }} - {{ rate[active].text }} -
            {{ rate[active].price }}<br />
            ecioBalance: {{ ecioBalance }}<br />
            isApproved: {{ isApproved }}<br />
            inProgress: {{ inProgress }}<br />
            onProgress: {{ onProgress }} -->
            <!-- <h1 class="title-h1 mt-3">EXPERIMENTAL CLONING POD</h1> -->
          </div>
        </div>
        <div class="row mt-4 justify-content-md-center">
          <div class="label-top">
            <img src="@/assets/gachapon/top.webp" alt="" />
          </div>
          <div
            class="
              col-12 col-md-9 col-lg-5
              mt-5
              pr-0
              position-relative
              fix-height
            "
          >
            <div class="bg-border-close">
              <div class="bg-instant">
                <img
                  src="@/assets/gachapon/bg-instant.png"
                  class="mw-100"
                  alt=""
                />
              </div>
              <div
                v-if="
                  inProgress == 0 ||
                    inProgress == 1 ||
                    (inProgress == 2 && onProgress == 0)
                "
              >
                <div class="element">
                  <video width="100%" height="240" loop autoplay muted>
                    <source
                      src="@/assets/gachapon/Ecio_Gacha_Loop.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
              <div class="border-clone">
                <img
                  v-if="active == 1"
                  src="@/assets/gachapon/border-exc.webp"
                  alt=""
                />
                <img v-else src="@/assets/gachapon/border-std.webp" alt="" />
              </div>
            </div>

            <ProgressGachapon
              v-if="(inProgress == 2 || inProgress == 3) && onProgress >= 1"
              :onProgress="onProgress"
              :type="active"
              @openBox="confirmMetaData"
            />

            <VideoPlay
              v-if="inProgress === 4"
              :typeBox="active"
              @endVideoHandler="endVideoHandler"
            />
          </div>
          <div class="col-12 col-md-9 col-lg-7 position-relative pl-4 quandro">
            <div class="background-image">
              <img
                v-if="active == 1"
                class="d-none d-lg-block mb-0"
                src="@/assets/gachapon/bg-detail-ex.webp"
                alt=""
              />
              <img
                v-else
                class="d-none d-lg-block mb-0"
                src="@/assets/gachapon/bg-detail.webp"
                alt=""
              />
              <img
                class="d-lg-none mw-100"
                src="@/assets/gachapon/bg-mobile.png"
                alt=""
              />
            </div>
            <div class="fade-mobile"></div>
            <div class="screen-content">
              <div class="col-12 mt-3 mt-lg-0 margin-banner">
                <img src="@/assets/gachapon/title.webp" class="mw-100" alt="" />
              </div>
              <div class="col-12 col-lg-7 margin-btn">
                <div class="row mt-0">
                  <div class="col-6 px-0">
                    <div
                      class="text-uppercase btn-exc btn-gachapon"
                      :class="{
                        show: active == 1,
                        disable: active == 0 && inProgress > 0,
                      }"
                      @click="
                        inProgress == 0 ? (active = 1) : '',
                          inProgress == 0 ? checkLoadApprove(active) : ''
                      "
                    >
                      Exclusive
                    </div>
                  </div>
                  <div class="col-6 px-0">
                    <div
                      class="text-uppercase btn-std btn-gachapon"
                      :class="{
                        show: active == 0,
                        disable: active == 1 && inProgress > 0,
                      }"
                      @click="
                        inProgress == 0 ? (active = 0) : '',
                          inProgress == 0 ? checkLoadApprove(active) : ''
                      "
                    >
                      Standard
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="content-gacha text-uppercase">
                  <div class="row mt-0">
                    <div class="col-12 mb-2">
                      <h3 class="my-0">{{ rate[active].text }}</h3>
                      <div class="count-time">
                        <span v-show="active == 1">
                          {{ !ltdStartTime ? "Opening in" : "Ends in" }}
                          <CountDown
                            :date="
                              !ltdStartTime
                                ? new Date(rate[active].startIn * 1000)
                                : new Date(rate[active].endIn * 1000)
                            "
                        /></span>
                      </div>
                    </div>

                    <div
                      class="col-12 col-lg-6"
                      v-for="(data, index) in rate[active].rarity"
                      :key="index"
                    >
                      <div class="rate-gachapon">
                        <div>
                          {{ data.text }}
                        </div>
                        <div>{{ data.rate }}%</div>
                      </div>
                    </div>
                    <div class="col-12 text-center d-none d-lg-block mb-3">
                      <h4 class="text-white">GUARANTEED SPACE Warrior</h4>
                      <p class="text-white">
                        Created with only common weapon and common suit
                      </p>
                      <p class="color-red">
                        No battle gear / battle bot / Drone
                      </p>
                      <h4 class="my-2 text-custom-green">
                        <span v-if="rate[active].price > 0"
                          >Cloning COST
                          {{ rate[active].price.toLocaleString() }}
                          $ECIO</span
                        >
                        <span v-else>To be announced</span>
                      </h4>
                    </div>
                    <div class="col-12 col-lg-6">
                      <button
                        class="btn btn-approve"
                        :disabled="
                          !rate[active].isPodOpen ||
                            (active == 1 && ltdTimeout) ||
                            (active == 1 && !ltdStartTime) ||
                            isApproved ||
                            onApproving
                        "
                        @click="approveHandler(allowanceEcio)"
                      >
                        {{
                          onApproving
                            ? "Approving"
                            : isApproved
                            ? "Approved"
                            : "Approve"
                        }}
                        <span
                          v-if="onApproving"
                          class="ml-1 spinner-border spinner-border-sm"
                          style="position: relative; top: -5px"
                          role="status"
                        >
                        </span>
                      </button>
                    </div>
                    <div class="col-12 col-lg-6">
                      <button
                        class="btn btn-clone"
                        :disabled="
                          !rate[active].isPodOpen ||
                            (active == 1 && ltdTimeout) ||
                            (active == 1 && !ltdStartTime) ||
                            !isApproved ||
                            inProgress == 1 ||
                            inProgress == 2 ||
                            inProgress > 3
                        "
                        @click="
                          inProgress == 3
                            ? openGachapon()
                            : cloningHandler(active)
                        "
                      >
                        {{
                          inProgress == 0
                            ? "Create"
                            : inProgress == 1 || inProgress == 4
                            ? "Waiting"
                            : inProgress == 3
                            ? "Start"
                            : "Create"
                        }}
                        <span
                          v-if="inProgress == 1 || inProgress == 4"
                          class="ml-1 spinner-border spinner-border-sm"
                          style="position: relative; top: -5px"
                          role="status"
                        >
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 text-center d-lg-none mt-5">
                <h4 class="text-white">Guaranteed SPACE Warrior</h4>
                <p class="text-white">
                  Created with only common weapon and no armor
                </p>
                <p class="color-red">No battle gear / battle bot / Drone</p>
                <h4 class="my-2 text-custom-green">
                  <span v-if="rate[active].price > 0"
                    >Cloning COST
                    {{ rate[active].price.toLocaleString() }}
                    $ECIO</span
                  >
                  <span v-else>To be announced</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      class="backdrop"
      name="waitConfirmTransaction"
    >
      <div class="bg-ecio-bg p-5 text-uppercase">
        <div>
          <svg
            class="mx-auto"
            width="70"
            height="70"
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enable-background="new 0 0 0 0"
            xml:space="preserve"
          >
            <path
              fill="#e0fb16"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        <h2 class="text-center text-white mb-3 text-2xl">
          Waiting for confirmation
        </h2>
        <h4 class="text-center mb-3 text-xl h2">
          {{ modalWaitingDesc }}
        </h4>
        <h4 class="text-center text-grey mb-3 text-xl">
          Confirm this transaction in your wallet
        </h4>
      </div>
    </modal>
    <modal
      height="auto"
      :scrollable="true"
      :adaptive="true"
      class="backdrop"
      name="transactionSubmit"
    >
      <div class="bg-ecio-bg p-5">
        <h2 class="text-center text-white mb-3 text-2xl text-uppercase">
          Transaction Submitted
        </h2>
        <h2 class="text-center mb-3 text-2xl text-uppercase">
          <a
            class="color-light-blue"
            :href="`${blockExplorerUrl}tx/${txHash}`"
            target="_blank"
            ><u>View on bscscan</u></a
          >
        </h2>
        <div class="col-4 mx-auto">
          <button
            class="btn btn-ecio-dark text-uppercase"
            @click="switchModal('transactionReceipt', 'transactionSubmit')"
          >
            CLOSE
          </button>
        </div>
      </div>
    </modal>
    <modal
      name="redeemSuccess"
      classes="cute-photo modal-position"
      transition="scale"
      style="background: rgba(0, 0, 0, 0.7)"
      :height="600"
      :width="600"
      @closed="cardNftRedeem = null"
      :adaptive="true"
    >
      <!-- <div class="container-img">
        <img class="img-bg" src="../assets/cards/redeem-popup-01.png" />
        <img class="img-card" :src="cardNftRedeem" />
      </div> -->

      <div class="container-img" v-if="bgNftRedeem">
        <img class="img-bg" :src="bgNftRedeem" />
        <div
          class="child"
          :class="{
            'child-genomic': specNFT !== 'SW',
          }"
        >
          <img v-if="cardNftRedeem" :src="cardNftRedeem" class="mb-0" />
        </div>
        <div class="row justify-content-center">
          <div class="col-7 mt-0">
            <button
              class="btn btn-ecio w-100 quandro text-2xl"
              @click="resetAll()"
            >
              Create more
            </button>
          </div>
          <div class="col-7 mt-2">
            <a href="/my-collection" target="_blank">
              <button class="btn wallet w-100 quandro">
                Go to my collection
              </button>
            </a>
          </div>
        </div>
      </div>
    </modal>
    <modal
      name="balance"
      classes="dialog-class"
      transition="scale"
      style="background: rgba(0, 0, 0, 0.7)"
      :height="600"
      :width="600"
      :adaptive="true"
    >
      <div class="bg-ecio-bg p-5">
        <div class="row">
          <div class="col-12 mb-3">
            <div class="box-agree text-white">
              <h1 class="text-3xl text-center text-uppercase mb-3 mt-3">
                Insufficient ECIO balance
              </h1>
            </div>
          </div>
          <div class="col-6 my-3">
            <button
              class="btn btn-ecio default w-100 quandro text-2xl"
              @click="$modal.hide('balance')"
            >
              Back
            </button>
          </div>
          <div class="col-6 my-3">
            <button class="btn wallet w-100 quandro">
              <a
                href="https://pancakeswap.finance/swap?outputCurrency=0x327a3e880bf2674ee40b6f872be2050ed406b021"
                target="_blank"
                >GET ECIO</a
              >
            </button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Web3 from "web3";
import ERC20 from "./../contracts/ERC20.json";
import ABINFTCore from "@/contracts/EcioNFTCore.json";
import ABIGashapon from "@/contracts/GashaponOpener.json";
import ProgressGachapon from "../components/ProgressGachapon";
import VideoPlay from "../components/VideoGachapon";
import { getCardRedeem } from "../api/nft";
import TransactionReceipt from "@/components/TransactionReceipt";
import CountDown from "@/components/CountDown";

export default {
  components: {
    ProgressGachapon,
    VideoPlay,
    CountDown,
  },
  computed: {
    ltdTimeout() {
      if (this.rate[1].endIn - this.dateNow > 0) {
        return false;
      } else {
        return true;
      }
    },
    ltdStartTime() {
      if (this.rate[1].startIn - this.dateNow > 0) {
        //ยังไม่เริ่ม
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      dateNow: Math.trunc(new Date().getTime() / 1000),
      allowanceEcio: 250000,
      typeBox: null,
      specNFT: null,
      bgNftRedeem: null,
      cardNftRedeem: null,
      walletAccount: "",
      isApproved: false,
      onApproving: false,
      active: 1,
      onProgress: 0,
      inProgress: 0,
      modalWaitingDesc: "",
      txHash: "",
      gashaponContract: undefined,
      nftContract: undefined,
      ecioBalance: 0,
      blockExplorerUrl: process.env.VUE_APP_BLOCK_EXPLORER,
      // nftCoreContract: process.env.VUE_APP_CONTRACT_NFTCORE_V2,
      // gashaponContract: process.env.VUE_APP_CONTRACT_GACHAPON,
      // ecioContract: process.env.VUE_APP_ECIO_CONTRACT_ADDRESS,
      rate: [
        {
          text: "Standard CLONING POD",
          rarity: [
            {
              text: "common",
              rate: 60,
            },
            {
              text: "Rare",
              rate: 35,
            },
            {
              text: "Epic",
              rate: 5,
            },
            {
              text: "Limited",
              rate: 0,
            },
          ],
          price: 12500,
          isPodOpen: false,
        },
        {
          text: "Exclusive CLONING POD",
          rarity: [
            {
              text: "common",
              rate: 55,
            },
            {
              text: "Rare",
              rate: 35,
            },
            {
              text: "Epic",
              rate: 5,
            },
            {
              text: "Limited",
              rate: 5,
            },
          ],
          price: 9500,
          isPodOpen: false,
          startIn: 1642770000,
          endIn: 1642957200, //1642957200
        },
      ],
    };
  },
  async mounted() {
    window.setInterval(() => {
      this.dateNow = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
    window.web3 = new Web3(window.ethereum);
    if (typeof window.ethereum == "undefined") {
      window.web3.setProvider(
        new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
      );
    }
    this.connectWallet().then(() => {
      this.loadContract();
      this.checkLoadApprove(this.active);
      this.loadLtdEndTime();
      this.loadLtdStartTime();
      this.loadAccountBalance();
    });

    // this.loadLtdEndTime();

    this.nftCoreContract = await new window.web3.eth.Contract(
      ABINFTCore.abi,
      process.env.VUE_APP_CONTRACT_NFTCORE_V2
    );
    let options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
    this.nftCoreContract.events
      .Transfer(options)
      .on("data", (event) => this.callBackEvent(event));
  },
  methods: {
    async loadAccountBalance() {
      this.loadContract().then(() => {
        this.ecioContract.methods
          .balanceOf(window.ethereum.selectedAddress)
          .call()
          .then((results) => {
            this.ecioBalance = Number(Web3.utils.fromWei(results, "ether"));
          });
      });
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        return true;
      }
      return false;
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        this.walletAccount = window.ethereum.selectedAddress;
      }
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
    async loadContract() {
      window.web3 = new Web3(window.ethereum);
      if (typeof window.ethereum == "undefined") {
        window.web3.setProvider(
          new Web3.providers.HttpProvider(process.env.VUE_APP_RPC_URL)
        );
      }
      this.gashaponContract = await new window.web3.eth.Contract(
        ABIGashapon.abi,
        process.env.VUE_APP_CONTRACT_GACHAPON
      );

      this.ecioContract = await new window.web3.eth.Contract(
        ERC20.abi,
        process.env.VUE_APP_ECIO_CONTRACT_ADDRESS
      );
    },
    async loadLtdEndTime() {
      await this.loadContract().then(() => {
        this.gashaponContract.methods
          .ltdEndTime()
          .call()
          .then((res) => {
            this.rate[1].endIn = res;
          });
      });
    },
    async loadLtdStartTime() {
      await this.loadContract().then(() => {
        this.gashaponContract.methods
          .ltdStartTime()
          .call()
          .then((res) => {
            console.log("loadLtdStartTime", res);
            this.rate[1].startIn = res;
          });
      });
    },
    async checkLoadApprove(active) {
      await this.loadContract().then(() => {
        console.log("require allowance", this.rate[active].price);
        this.ecioContract.methods
          .allowance(this.walletAccount, process.env.VUE_APP_CONTRACT_GACHAPON)
          .call()
          .then((pl) => {
            let allowanceAmount = Web3.utils.fromWei(pl, "ether");
            console.log("allowanceAmount", allowanceAmount);
            if (allowanceAmount >= this.rate[active].price) {
              // this.isStaked = false;
              this.isApproved = true;
            } else {
              this.isApproved = false;
            }
          });
      });

      // this.ecioContract.methods
      //   .isApprovedForAll(
      //     window.ethereum.selectedAddress,
      //     process.env.VUE_APP_CONTRACT_GACHAPON
      //   )
      //   .call()
      //   .then((results) => {
      //     console.log("checkLoadApprove", results);
      //     this.isApprove = results;
      //   });
    },
    approveHandler(amount) {
      this.loadContract().then(() => {
        var allowEcioWei = Web3.utils.toWei(
          Web3.utils.toBN(amount).toString(),
          "ether"
        );
        this.ecioContract.methods
          .approve(process.env.VUE_APP_CONTRACT_GACHAPON, allowEcioWei)
          .send({ from: this.walletAccount })
          .on("sent", (data) => this.sendApprove(data))
          .on("transactionHash", (tx) => this.transactionHash(tx))
          .on("receipt", (data) => this.receiptApprove(data))
          // .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => {
            this.showToastError(error);
            this.onApproving = false;
          });
      });
    },
    sendApprove(data) {
      console.log("sendApprove data", data);
      this.onApproving = true;
      this.modalWaitingDesc = "Approving your wallet";
      this.switchModal("waitConfirmTransaction", "");
    },
    transactionHash(transaction) {
      console.log("transaction", transaction);

      this.inProgress = 2;
      if (this.isApproved) {
        this.onProgress = 1;
      }
      this.txHash = transaction;
      this.switchModal("transactionSubmit", "waitConfirmTransaction");
    },
    receiptApprove(data) {
      console.log("Approve data", data);
      this.successTransaction("Approved your wallet", this.txHash);
      this.inProgress = 0;
      this.onApproving = false;
      this.isApproved = true;
      this.checkLoadApprove(this.active);
    },
    cloningHandler(active) {
      this.inProgress = 1;
      let approve =
        this.ecioBalance - this.rate[active].price > -1 ? true : false;
      if (approve) {
        this.loadContract().then(() => {
          console.log("openGacha");
          this.gashaponContract.methods
            .openGasha(this.active)
            .send({ from: window.ethereum.selectedAddress })
            .on("sent", (sent) => this.sentCloning(sent))
            .on("transactionHash", (tx) => this.transactionHash(tx))
            .on("receipt", function(data) {
              console.log("Clone Receipt", data);
              this.inProgress = 0;
              this.onProgress = 0;
            })
            .on("confirmation", (confirm) => this.confirmation(confirm))
            .on("error", (error) => this.showToastError(error));
        });
      } else {
        this.$modal.show("balance");
        this.inProgress = 0;
        this.onProgress = 0;
      }
    },
    sentCloning(data) {
      console.log("sentCloning", data);
      this.modalWaitingDesc = "";
      this.switchModal("waitConfirmTransaction", "");
      //this.onProgress = 1;
    },
    confirmMetaData() {
      this.inProgress = 3;
    },
    endVideoHandler() {
      // Reset inProgress
      setTimeout(() => {
        this.$modal.show("redeemSuccess");
      }, 1000);

      this.inProgress = 0;
      this.onProgress = 0;
      this.checkLoadApprove(this.active);
    },
    async openGachapon() {
      try {
        console.log("this.redeemTokenId", this.redeemTokenId);
        this.inProgress = 4;
        const data = await getCardRedeem(this.redeemTokenId);
        console.log("openBox", data);
        this.cardNftRedeem = data.data.image;
        console.log("this.redeemTokenId card", this.cardNftRedeem);
        // check typeBฺox
        const filterRarity = data.data.attributes.find((res) => {
          return res.trait_type === "rarity";
        });
        this.typeBox = filterRarity.value;

        // NFT type SW|GM|BP
        const filterNftType = data.data.attributes.find((res) => {
          return res.trait_type === "nft_type";
        });

        this.specNFT = filterNftType.value;
        // Check is card
        if (filterNftType.value === "SW") {
          this.typeOfCard(this.typeBox);
        }

        if (filterNftType.value === "BP") {
          this.typeOfBlueprint(this.typeBox);
        }

        if (filterNftType.value === "GM") {
          this.typeOfGenomic(this.typeBox);
        }

        this.loadAccountBalance();
      } catch (error) {
        console.log("openBox error", error);
        this.showToastError({
          message: "An error occurred. Please try again later.!",
        });
      }
    },
    confirmation(confirm) {
      console.log("confirmation", confirm);
      if (this.inProgress > 0 && this.onProgress > 0) {
        if (this.inProgress < 3) {
          this.inProgress = 2;
        }
        // check event confirm before on progress
        if (this.onProgress < 5) {
          if (confirm < 5) {
            this.onProgress = 1;
          } else if (confirm < 10) {
            this.onProgress = 2;
          } else if (confirm < 12) {
            this.onProgress = 3;
          } else if (confirm < 16) {
            this.onProgress = 4;
          } else {
            this.onProgress = 5;
          }
          console.log("confirm onProgress", this.onProgress);
        }
      }
    },
    callBackEvent(event) {
      // this.redeemTokenId = event;

      console.log("event", event);
      console.log("callBackEvent", event.returnValues.tokenId);
      this.walletAccount = this.walletAccount.toLowerCase();
      const addressReturn = event.returnValues.to.toLowerCase();

      console.log("walletAccount", this.walletAccount);
      console.log("addressReturn", addressReturn);

      if (addressReturn === this.walletAccount) {
        console.log(
          "addressReturn === this.walletAccount",
          addressReturn === this.walletAccount
        );
        this.redeemTokenId = event.returnValues.tokenId;
        // delay 10s for index images
        setTimeout(() => {
          this.onProgress = 5;
        }, 5000);
      }
    },
    successTransaction(txt, tx) {
      const text = {
        component: TransactionReceipt,
        props: {
          title: "Transaction Receipt",
          txt: txt,
          blockExplorerUrl: this.blockExplorerUrl,
          tx: tx,
        },
      };
      this.$toast.success(text, {
        position: "top-right",
        timeout: 5000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
    },
    showToastError(err) {
      this.switchModal("transactionReject", "waitConfirmTransaction");
      this.inProgress = 0;
      this.onProgress = 0;
      console.log("handleErr", err);
      const text = (
        <div class="col-12 text-uppercase">
          <h1 class="mb-3 text-xl">Transaction failed</h1>
          <span class="text-sm font-weight-normal">{err.message}</span>
        </div>
      );
      this.$toast.error(text, {
        position: "top-right",
        timeout: 5000,
        hideProgressBar: true,
        icon: true,
        rtl: false,
      });
    },
    resetAll() {
      this.inProgress = 0;
      this.onProgress = 0;
      this.checkLoadApprove(this.active);
      this.$modal.hide("redeemSuccess");
    },
    switchModal(open, close) {
      this.$modal.show(open);
      this.$modal.hide(close);
    },
    typeOfCard(value = "common") {
      console.log("value", value);
      this.bgNftRedeem = require(`@/assets/gachapon/${value.toLowerCase()}/card.png`);
    },
    typeOfBlueprint(value = "common") {
      this.bgNftRedeem = require(`@/assets/gachapon/${value.toLowerCase()}/blueprint.png`);
    },
    typeOfGenomic(value = "common") {
      this.bgNftRedeem = require(`@/assets/gachapon/${value.toLowerCase()}/genomic.png`);
    },
  },
};
</script>
<style scoped>
.label-bottom {
  position: absolute;
  left: -5px;
  right: -15px;
  bottom: -5%;
  z-index: 4 !important;
}
.label-top {
  position: absolute;
  top: -3%;
  left: 1%;
  z-index: 3 !important;
}

.line-left,
.line-right {
  position: absolute;
  top: -15px;
}

.line-left {
  left: -12px;
}

.line-right {
  right: -12px;
}
.line-top {
  position: absolute;
  top: -85px;
  left: -78px;
  right: -91px;
}
.title-web {
  position: absolute;
}
.quandro {
  z-index: initial !important;
}
.screen-content {
  z-index: 10 !important;
  position: relative;
}
.margin-banner {
  margin-top: -15px !important;
}
.margin-btn {
  margin-top: -5px;
  margin-bottom: 15px;
  margin-left: 30px;
}
.bg-instant {
  position: absolute;
  right: 22px;
  left: 22px;
  top: 22px;
}
.cute-photo {
  top: 0 !important;
}
.main-container,
.imagebg,
.cover {
  min-height: 100vh;
  overflow: hidden;
}
.content-gacha {
  padding: 10px 85px;
}

h3 {
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin: 15px 0;
}

h4 {
  font-size: 18px;
  font-weight: 700;
}

p {
  font-weight: 700;
  font-size: 14px !important;
  font-family: "Quantico" !important;
}

.content-gacha .btn-approve {
  font-size: 1.2rem;
  padding: 20px;
  text-align: center;
  background-color: #4804d9;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  font-family: "Quantico" !important;
}

.content-gacha .btn-approve:disabled,
.content-gacha .btn-clone:disabled {
  border: 1px solid #252525;
}

.content-gacha .btn-clone {
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

.rate-gachapon {
  background-color: #222326;
  border-radius: 10px;
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #fff;
  font-size: 14px;
}

.background-image {
  top: -22%;
  left: 2%;
  right: -13%;
  position: absolute;
}

.content-gacha .row {
  margin-right: -8px;
  margin-left: -8px;
}

.btn-gachapon {
  width: 100%;
  font-size: 20px;
  color: #585858;
  padding: 28px 0;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
}

.btn-exc {
  background-image: url("../assets/gachapon/bg-exc.webp");
  background-position: top center;
  background-size: cover;
}

.btn-exc.disable,
.btn-std.disable {
  background-image: url("../assets/gachapon/btn-disable.webp");
  color: #585858;
}

.btn-exc.show {
  background-image: url("../assets/gachapon/bg-exc-active.webp");
  color: #000;
}

.btn-std {
  background-image: url("../assets/gachapon/bg-std.webp");
  background-position: top center;
  background-size: cover;
}

.btn-std.show {
  background-image: url("../assets/gachapon/bg-std-active.webp");
  color: #000;
}

.position-bg {
  margin-top: -75px;
}

.count-time {
  font-size: 14px;
  color: #fff;
  height: 18px;
  text-align: center;
  margin: 7px 0 10px;
}

.fix-height {
  height: 517px;
  overflow: hidden;
  margin-top: 43px;
}

@media (max-width: 1180px) {
  .label-bottom {
    bottom: -3%;
  }
  .label-top {
    top: 4%;
    left: 1%;
    right: 75%;
  }
  .btn-gachapon {
    font-size: 16px;
    padding: 23px 0;
  }

  .margin-banner {
    margin-top: 15px !important;
  }
  .margin-btn {
    margin-top: -10px;
  }
  .position-bg {
    margin-top: -106px;
  }
  h3 {
    font-size: 22px;
  }
  .rate-gachapon {
    font-size: 12px;
    padding: 7px 25px;
  }
  h4 {
    font-size: 16px;
  }
  .content-gacha {
    padding: 4px 50px;
  }
  .background-image {
    left: 0%;
    top: -19%;
    right: -15%;
  }
  .content-gacha .btn-approve,
  .content-gacha .btn-clone {
    height: 25px;
    padding: 17px;
  }
}

@media only screen and (min-width: 415px) and (max-width: 912px) {
  .fade-mobile {
    position: absolute;
    bottom: -50%;
    top: 0%;
    left: -50%;
    right: -50%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  .label-top {
    top: -2%;
    left: 3%;
    right: 51%;
  }
  .line-top {
    top: -20px;
    left: -8%;
    right: -3%;
  }
  .fix-height {
    height: 560px;
  }
  p {
    font-size: 18px !important;
  }
  h4 {
    font-size: 24px;
  }
  .btn-gachapon {
    font-size: 22px;
    padding: 38px 0;
  }
  .count-time {
    margin: 7px 0 20px;
  }
  .margin-btn {
    margin-top: 0px;
    margin-bottom: 30px;
    margin-left: 10px;
  }
  .background-image {
    top: 16%;
    left: -2%;
    right: 0%;
  }
  .position-bg {
    margin-top: 40px;
  }
  .content-gacha .btn-approve {
    margin: 18px 0;
    padding: 25px;
  }
  .content-gacha .btn-clone {
    padding: 25px;
  }
  .rate-gachapon {
    font-size: 18px;
    padding: 15px 25px;
  }
}

@media (max-width: 414px) {
  .fade-mobile {
    position: absolute;
    bottom: -50%;
    top: 0%;
    left: -10%;
    right: -10%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  .label-top {
    top: -1%;
    left: 2%;
    right: 48%;
  }
  .line-top {
    top: -20px;
    left: -8%;
    right: -3%;
  }

  .fix-height {
    height: 348px;
  }
  .count-time {
    font-size: 10px;
  }
  .margin-btn {
    margin-top: 15px;
    margin-bottom: 5px;
    margin-left: 5px;
  }
  .position-bg {
    margin-top: 25px;
  }
  .content-gacha {
    padding: 5px 28px;
  }
  .btn-gachapon {
    margin-top: 0;
    font-size: 16px;
    padding: 22px 0;
  }
  h3 {
    font-size: 16px;
  }
  .rate-gachapon {
    margin-bottom: 10px;
  }
  .content-gacha .btn-approve {
    margin: 12px 0;
  }
  .background-image {
    top: 15%;
    left: -2%;
    right: 0%;
  }
}
h4 {
  margin-bottom: 0 !important;
}
p {
  margin-bottom: 0 !important;
}
</style>
