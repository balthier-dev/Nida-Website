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
            <a href="/marketplace" class="nav-menu flex-initial mr-5">
              MY MYSTERY BOXS
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
            v-if="redeemBoxs && redeemBoxs.length"
          >
            <div class="grid grid-cols-2 md:gap-1- md:grid-cols-4">
              <!-- Redeem Card -->
              <div
                class="bg-card-redeem p-4"
                v-for="(item, index) in redeemBoxs"
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
// import { getNFTs } from "../api/nft";
export default {
  computed: {},
  created() {},
  data() {
    return {
      walletAccount: "",
      contract: undefined,
      contractAddress: process.env.VUE_APP_CONTRACT_MYSTERY,
      redeemBoxs: [],
      loading: false,
      empty: false,
    };
  },
  mounted() {
    var that = this;
    window.ethereum.on("chainChanged", () => {
      that.connectWallet();

      that.walletAccount = window.ethereum.selectedAddress;
      that.connectWallet();
      that.loadContract();
    });

    that.connectWallet();
    that.loadContract();
  },
  methods: {
    async balanceOfNFTs(address, tokenId) {
      //Common Box
      await this.contract.methods
        .balanceOf(address, tokenId)
        .call()
        .then((results) => {
          console.log(results);
          //  this.numberOfCommonBox = parseInt(results);
          for (let index = 0; index < parseInt(results); index++) {
            if (tokenId == 0) {
              this.redeemBoxs.push({
                name: "Common Box",
                platform: "ecio",
                tokenId: 0,
                type: 0,
              });
            } else if (tokenId == 1) {
              this.redeemBoxs.push({
                name: "Rare Box",
                platform: "ecio",
                tokenId: 1,
                type: 1,
              });
            } else if (tokenId == 2) {
              this.redeemBoxs.push({
                name: "Epic Box",
                platform: "ecio",
                tokenId: 2,
                type: 2,
              });
            } else if (tokenId == 3) {
              this.redeemBoxs.push({
                name: "Spacial Box",
                platform: "ecio",
                tokenId: 3,
                type: 3,
              });
            }
          }
        });
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.walletAccount = window.ethereum.selectedAddress;
        // this.GetNFTs(this.walletAccount);
        this.loading = true;
        await this.balanceOfNFTs(this.walletAccount, 0);
        await this.balanceOfNFTs(this.walletAccount, 1);
        await this.balanceOfNFTs(this.walletAccount, 2);
        await this.balanceOfNFTs(this.walletAccount, 3);
        this.loading = false;
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
