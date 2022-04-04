<template>
  <div class="">
    <div class="main-container">
      <section
        class="cover cover-features imagebg text-center backgound-color-market"
        style="min-height: 100vh"
        data-overlay="0"
      >
        <div class="nav-bar">
          <div class="container flex p-3">
            <a href="/marketplace" class="nav-menu active flex-initial mr-5">
              MY COLLECTIONS
            </a>
            <!-- <a href="/redeem" class="nav-menu flex-initial">REDEEM</a> -->
          </div>
        </div>

        <div class="container mt-5">
          <img
            src="../assets/images/banner-market.png"
            style="max-width: 900px; width: 100%; padding: 20px; margin: auto"
          />

          <div
            class="row justify-content-center mt-5"
            v-if="
              (resultNFT && resultNFT.length) || (redeemBox && redeemBox.length)
            "
          >
            <div class="grid grid-cols-2 md:gap-1- md:grid-cols-4">
              <!-- NFTs Card -->

              <div
                class="bg-card-redeem p-4 flex"
                v-for="item in nftsCards"
                :key="`${Number(item.nft_id)}-item`"
              >
                <div style="padding: 0px 0px 30px 0px; margin: auto">
                  <img :src="item.image" />

                  <button
                    v-if="item.image"
                    @click="infoCard(item)"
                    class="btn btn-ecio info"
                  >
                    INFO
                  </button>
                </div>
              </div>
              <!-- NFTs Card -->

              <!-- Redeem Card -->
              <div
                class="bg-card-redeem p-4"
                v-for="(item, index) in redeemBox"
                :key="index"
              >
                <img
                  src="https://ecio.sgp1.digitaloceanspaces.com/0.png"
                  v-if="item.type === 0"
                />
                <img
                  src="https://ecio.sgp1.digitaloceanspaces.com/1.png"
                  v-if="item.type === 1"
                />
                <img
                  src="https://ecio.sgp1.digitaloceanspaces.com/2.png"
                  v-if="item.type === 2"
                />
                <img src="../assets/cards/3.png" v-if="item.type === 3" />
                <a
                  :href="`/redeem?type=${item.type}&platform=${item.platform}&token=${item.tokenId}`"
                  style="color: #000"
                >
                  <button class="btn btn-ecio redeem">REDEEM</button></a
                >
              </div>
              <!-- Redeem Card -->
            </div>
          </div>

          <div class="lds-ring-market" v-if="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div
            v-if="empty"
            style="font-size: 1.3rem; color: #dedede; margin-top: 100px"
          >
            YOU NOT HAVE MYSTERY BOX.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import ABI from "./../contracts/EcioAirDrop.json";
import { getNFTs, getCardRedeem } from "../api/nft";
export default {
  computed: {},
  created() {},
  data() {
    return {
      totalSlot: 4,
      myNFTs: [],
      walletAccount: "",
      myRefferal: 0,
      contract: undefined,
      contractAddress: "0x1ddCD5B73afb734b4AE6B1C139858F36311Ed4d3",
      redeemBox: [],
      nftsCards: [],
      loading: false,
      empty: false,
      resultNFT: [],
    };
  },
  components: {},
  mounted() {
    var that = this;
    window.ethereum.on("chainChanged", () => {
      that.connectWallet();
      that.myNFTs = [];
      that.walletAccount = window.ethereum.selectedAddress;
      that.connectWallet();
      that.loadContract();
    });

    that.myNFTs = [];
    that.connectWallet();
    that.loadContract();
  },
  methods: {
    async GetNFTs(address) {
      this.loading = true;
      const result = await getNFTs(address);
      await result.data.result.filter((res) => {
        if (
          res.token_address.toLowerCase() ===
            process.env.VUE_APP_BUSD_TOKEN_CONTRACT_NFTCORE.toLowerCase() ||
          res.token_address.toLowerCase() ===
            process.env.VUE_APP_BUSD_TOKEN_CONTRACT_NFTCORE_V2.toLowerCase()
        ) {
          //res.token_id
          getCardRedeem(res.token_id).then((res) => {
            this.resultNFT.push(res.data);
          });
        }
      });

      // Check loaded result
      if (result.data.total >= 0) {
        this.loading = false;
      }

      // Filter box  for open || ECIO BOX && GALAXY BOX
      this.nftsCards = this.resultNFT.sort(
        (a, b) => Number(b.token_id) - Number(a.token_id)
      );
      const nftInActive = result.data.result.filter((res) => {
        if (
          res.token_address.toLowerCase() ===
          process.env.VUE_APP_BUSD_TOKEN_CONTRACT_MYSTERY.toLowerCase()
        ) {
          return res;
        }
      });

      // Push amount box Active and inActive
      nftInActive.forEach((data) => {
        if (data.token_id === "0") {
          for (let index = 0; index < Number(data.amount); index++) {
            this.redeemBox.push({
              name: "common box",
              platform: "ecio",
              tokenId: data.token_id,
              type: 0,
            });
          }
        }
        if (data.token_id === "1") {
          for (let index = 0; index < Number(data.amount); index++) {
            this.redeemBox.push({
              name: "rare box",
              platform: "ecio",
              tokenId: data.token_id,
              type: 1,
            });
          }
        }
        if (data.token_id === "2") {
          for (let index = 0; index < Number(data.amount); index++) {
            this.redeemBox.push({
              name: "epic box",
              platform: "ecio",
              tokenId: data.token_id,
              type: 2,
            });
          }
        }
        if (data.token_id === "3") {
          for (let index = 0; index < Number(data.amount); index++) {
            this.redeemBox.push({
              name: "spacial box",
              platform: "ecio",
              tokenId: data.token_id,
              type: 3,
            });
          }
        }
      });

      this.redeemBox = this.redeemBox.sort((a, b) => b.type - a.type);

      setTimeout(() => {
        if (this.redeemBox.length === 0 && this.nftsCards.length === 0) {
          this.empty = true;
        }
      }, 1500);
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.walletAccount = window.ethereum.selectedAddress;
        this.GetNFTs(this.walletAccount);
      }
    },
    async loadContract() {
      //เชื่อม mataMask กับ Web3
      window.web3 = new Web3(window.ethereum);

      //สร้าง Instance ของ Contract ด้วย ABI และ address ของ contract ที่ Deploy ไปแล้ว
      this.contract = new window.web3.eth.Contract(
        ABI.abi,
        this.contractAddress
      );
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
    converseCard(data) {
      const result = JSON.parse(data);
      return result.image;
    },
    infoCard(data) {
      window.location.href = `/info?id=${data.nft_id}`;
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
  /* color: rgb(227, 227, 227) !important; */
  cursor: pointer;
}
a.active:hover {
  color: #deec76 !important;
}
.redeem {
  width: 100%;
  border-radius: 10px !important;
}
.bg-card-redeem {
  background: rgb(0 0 0 / 30%);
  margin: 10px;
  border-radius: 10px;
  position: relative;
}
a.redeem:hover {
  color: #000 !important;
}

.cute-photo-info {
  background-color: transparent;
  width: 800px;
  height: 100%;
  overflow: scroll;
  padding: 30px;
}

.ct-top-right {
  background: none !important;
}

.btn-ecio.info {
  background-color: #c4c4c4;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;

  max-width: 90%;
}

.nft-id {
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: "Quantico";
  margin: 10px 0;
  letter-spacing: 1px;
}
.lds-ring.wait-card div {
  border-color: #fff transparent transparent transparent !important;
}
</style>
