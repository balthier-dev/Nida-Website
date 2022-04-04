<template>
  <div>
    <div class="main-container">
      <section
        class="cover cover-features imagebg text-center backgound-color-market"
        data-overlay="4"
      >
        <div class="nav-bar">
          <div class="container flex p-3">
            <a href="/my-collection" class="nav-menu flex-initial mr-5">
              MY COLLECTIONS
            </a>
            <!-- <a href="/redeem" class="nav-menu active flex-initial">REDEEM</a> -->
          </div>
        </div>

        <div class="container container-m mt-5">
          <div class="row justify-content-center">
            <img
              src="../assets/images/banner-market.png"
              style="max-width: 900px; width: 100%; padding: 20px"
            />
            <div class="grid grid-cols-1 md:gap-1- md:grid-cols-2">
              <MysteryBox
                @approveHandler="approveHandler"
                @redeemHandler="redeemHandler"
                v-if="inProgress === 0"
                :loadApprove="loadApprove"
                :isApprove="isApprove"
                :onload="onload"
                :onloadApprove="onloadApprove"
              ></MysteryBox>

              <ProgressRedeem
                :inProgress="inProgress"
                v-if="inProgress === 1"
                :onProgress="onProgress"
                @openBox="openBox"
              ></ProgressRedeem>

              <VideoPlay
                v-if="inProgress === 2"
                :typeBox="typeBox"
                @endVideoHandler="endVideoHandler"
              ></VideoPlay>

              <VideoPlay
                v-if="inProgress === 3"
                :typeBox="typeBox"
                @endVideoHandler="endVideoHandler"
              ></VideoPlay>

              <div class="bg-card-redeem p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <img
                      v-if="$route.query.type === '0'"
                      src="../assets/cards/0.png"
                    />
                    <img
                      v-else-if="$route.query.type === '1'"
                      src="../assets/cards/1.png"
                    />
                    <img
                      v-else-if="$route.query.type === '2'"
                      src="../assets/cards/2.png"
                    />
                    <img
                      v-else-if="$route.query.type === '3'"
                      src="../assets/cards/3.png"
                    />
                  </div>
                  <div class="justify-start text-left">
                    <div class="title">
                      <h1 style="font-size: 1.8rem">MYSTERY BOX</h1>
                    </div>
                    <div class="detail mt-5">
                      <h1 style="font-size: 1.5rem" class="title">Detail</h1>
                      <p>
                        Unidentified artifacts hidden across the universe. Still
                        can't open with our current technology but you can
                        exchange it with space merchants for a battle equipment
                        and warrior.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- Modal -->

    <modal
      name="redeemSuccess"
      classes="cute-photo"
      transition="scale"
      style="background: rgba(0, 0, 0, 0.7)"
      @before-close="beforeClose"
      :height="600"
      :width="600"
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
          <img :src="cardNftRedeem" />
        </div>
      </div>

      <div class="btn-collection">
        <a class="close-redeem m-auto" href="/my-collection">
          <button
            class="mycollection-redeem"
            :class="{
              'btn-common': typeBox === 'COMMON',
              'btn-rare': typeBox === 'RARE',
              'btn-epic': typeBox === 'EPIC',
              'btn-legendary': typeBox === 'LEGENDARY',
              'mycollection-redeem-genomic': specNFT !== 'SW',
            }"
          >
            COLLECT
          </button>
        </a>
      </div>
    </modal>

    <!-- <modal name="redeemSuccess" :height="600" transition="scale">
      <img src="../assets/cards/epic-card.png" />
    </modal> -->
    <!-- Modal -->
  </div>
</template>

<script>
import Web3 from "web3";
import MysteryBox from "../components/MysteryBox";
import ProgressRedeem from "../components/ProgressRedeem";
import VideoPlay from "../components/VideoPlay";

import ABINFTCore from "../contracts/EcioNFTCore.json";
import ABIMysteryBox from "./../contracts/MysteryBox.json";
import ABIredeemtion from "./../contracts/BoxRedeemtion.json";
import { getCardRedeem } from "../api/nft";
export default {
  data() {
    return {
      inProgress: 0,
      isApprove: false,
      nftContract: undefined,
      nftContractOpenBox: undefined,
      nftContractOpenBoxFromGalaxy: undefined,
      nftCore: undefined,
      onload: false,
      onloadApprove: false,
      onProgress: 0,
      redeemTokenId: undefined,
      bgNftRedeem: null,
      cardNftRedeem: null,
      typeBox: null,
      specNFT: null,
      loadApprove: false,
    };
  },
  computed: {},

  components: { MysteryBox, ProgressRedeem, VideoPlay },
  async created() {
    window.web3 = new Web3(window.ethereum);
    this.connectWallet().then(() => {
      this.loadConnect();
    });
    this.onProgressTransaction();
    this.nftCore = await new window.web3.eth.Contract(
      ABINFTCore.abi,
      process.env.VUE_APP_CONTRACT_NFTCORE_V2
    );

    let options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
    this.nftCore.events
      .Transfer(options)
      .on("data", (event) => this.callBackEvent(event));
    // .on("changed", changed => console.log("changed", changed));
    // .on('error', err => throw err)
    // .on("connected", str => console.log("str", str));
  },
  mounted() {},
  methods: {
    async openBox() {
      try {
        const data = await getCardRedeem(this.redeemTokenId);
        // check typebox
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

        this.cardNftRedeem = data.data.image;
      } catch (error) {
        alert("An error occurred. Please try again later.!");
      }

      setTimeout(() => {
        this.inProgress = 2;
      }, 1000);
    },

    endVideoHandler() {
      // Reset inProgress
      this.inProgress = 0;
      this.$modal.show("redeemSuccess");
    },
    callBackEvent(event) {
      const addressReturn = event.returnValues.to.toUpperCase();
      if (event && addressReturn === this.walletAccount) {
        this.redeemTokenId = event.returnValues.tokenId;
        // delay 10s for index images
        setTimeout(() => {
          this.onload = false;
          this.onProgress = 5;
        }, 5000);
      }
    },
    beforeClose() {
      window.location.href = "/my-collection";
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        this.walletAccount = window.ethereum.selectedAddress.toUpperCase();
      }
    },
    validated() {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
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
    approveHandler() {
      if (this.$route.query.platform === "ecio") {
        this.addressApproveEcio();
      }
    },
    sendApprove() {
      this.onloadApprove = true;
    },

    addressApproveEcio() {
      this.loadConnect().then(() => {
        this.nftContract.methods
          .setApprovalForAll(process.env.VUE_APP_CONTRACT_REDEEM, true)
          .send({ from: window.ethereum.selectedAddress })
          // .on("receipt", () => (this.isApprove = true))
          .on("sent", () => this.sendApprove())
          .on("confirmation", (data) => this.confirmApprove(data))
          .on("error", (error) => this.handleErr(error));
      });
    },
    confirmApprove() {
      this.isApprove = true;
      this.onloadApprove = false;
    },

    async loadConnect() {
      window.web3 = new Web3(window.ethereum);
      this.nftContract = await new window.web3.eth.Contract(
        ABIMysteryBox.abi,
        process.env.VUE_APP_CONTRACT_MYSTERY
      );
      this.checkLoadApprove();

      this.nftContractOpenBox = await new window.web3.eth.Contract(
        ABIredeemtion.abi,
        process.env.VUE_APP_CONTRACT_REDEEM
      );
    },

    checkLoadApprove() {
      if (this.$route.query.platform === "ecio") {
        this.nftContract.methods
          .isApprovedForAll(
            window.ethereum.selectedAddress,
            process.env.VUE_APP_CONTRACT_REDEEM
          )
          .call()
          .then((results) => {
            this.loadApprove = true;
            this.isApprove = results;
          });
      }
    },

    redeemHandler() {
      this.onload = true;
      this.$emit("approveRedeem", true);

      if (this.$route.query.platform === "ecio") {
        const typeOfbox = Number(this.$route.query.type) || 0;
        this.loadConnect().then(() => {
          this.nftContractOpenBox.methods
            .openBox(typeOfbox)
            .send({ from: window.ethereum.selectedAddress })
            .on("receipt", function () {
              this.onload = false;
              this.inProgress = 1;
            })
            .on("sent", (sent) => this.onProgressTransaction(sent))
            .on("transactionHash", (transaction) =>
              this.transactionHash(transaction)
            )
            .on("confirmation", (confirm) => this.confirmation(confirm))
            .on("error", (error) => this.handleErr(error));
        });
      }
    },
    confirmation(confirm) {
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
        }
      }
    },
    transactionHash() {
      this.inProgress = 1;
      this.onProgress = 1;
    },
    onProgressTransaction() {},
    typeOfCard(value) {
      if (value === "RARE") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-popup-01.png";
      } else if (value === "EPIC") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-popup-02.png";
      } else if (value === "LEGENDARY") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-popup-03.png";
      } else {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-popup-00.png";
      }
    },

    typeOfBlueprint(value) {
      if (value === "RARE") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-blueprint-rare.png";
      } else if (value === "EPIC") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-blueprint-epic.png";
      } else if (value === "LEGENDARY") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-blueprint-legendary.png";
      } else {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-blueprint-common.png";
      }
    },

    typeOfGenomic(value) {
      if (value === "RARE") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-genomic-rare.png";
      } else if (value === "EPIC") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-genomic-epic.png";
      } else if (value === "LEGENDARY") {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-genomic-legendary.png";
      } else {
        this.bgNftRedeem =
          "https://ecio.sgp1.digitaloceanspaces.com/redeem-genomic-common.png";
      }
    },

    handleErr(err) {
      console.log(err);
      if (err) {
        this.onloadApprove = false;
        this.onload = false;
      }
    },
  },
};
</script>

<style>
.feature__body.condition p {
  font-size: 1.5rem !important;
}
.backgound-color-market {
  background-image: linear-gradient(to right, #2d0860, #090214);
  min-height: 100vh;
}
.nav-bar {
  padding: 10px;
  background: #000;
}
a.nav-menu.active {
  color: #e0fb16;
}
.nav-menu {
  color: #fff;
}
.nav-menu {
  font-size: 1.2rem;
  font-weight: 500;
}
a:hover {
  cursor: pointer;
}
a.active:hover {
  color: #deec76 !important;
}
.btn {
  width: 100%;
}
.bg-card-redeem {
  background: rgb(0 0 0 / 30%);
  margin: 10px;
}
.btn-approve {
  background: #9a66ff;
  font-size: 1.2rem !important;
  border: none;
  border-radius: 10px;
}
.btn-redeemtion {
  background: #e0fb16;
  font-size: 1.2rem !important;
  border: none;
  border-radius: 10px;
}
.btn-redeemtion:disabled,
.btn-approve:disabled {
  background: #c4c4c4;
  color: #666666;
}

.cute-photo {
  background-color: transparent !important;
  width: 800px;
  box-shadow: none !important;
}

.ct-top-right {
  cursor: pointer;
  margin: 20px;
  padding: 10px 20px;
  font-weight: 600;
  color: white;
  text-shadow: 0 0px 20px black;
  background: #555;
  border-radius: 100px;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
}
.scale-enter,
.scale-leave-active {
  opacity: 0.4;
  transform: scale(0.3) translateY(24px);
}
a.close-redeem:hover {
  color: #000 !important;
}
a.nav-menu:hover {
  color: #eee;
}

.container-img {
  font-family: arial;
  font-size: 24px;
  /* Setup */
  position: relative;
}

.child {
  /* width: 240px;
  margin-top: 40px; */
  margin-top: 40px;
  width: 250px;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn-collection {
  border: none;
  color: #000;
  font-size: 1.2rem;
}
.btn-legendary {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(254, 18, 184) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  border: none;
  width: 200px;
}
.btn-epic {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(154, 102, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  border: none;
  width: 200px;
}
.btn-rare {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  border: none;
  width: 200px;
}
.btn-common {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(230, 230, 230, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  border: none;
  width: 200px;
}
.btn-collection {
  max-width: 800px;
  margin: auto;
  position: relative;
}
.child-genomic {
  margin-top: 40px;
  width: 290px;
  position: absolute;
  top: 45% !important;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mycollection-redeem-genomic {
  font-family: "Quantico";
  max-width: 150px;
  margin: auto;
  display: block;
  margin-top: -90px !important;
  font-weight: 600;
}
</style>
