<template>
  <div class="main-container bg-custom min-h-screen xs:py-16">
    <div class="grid" :class="isSidebar && 'grid-cols-4'">
      <div
        v-if="isSidebar"
        class="xs:hidden xl:grid xl:col-start-1 xl:col-end-2"
      >
        <Sidebar @resetFilter="handleResetFilter" @filter="handleFilter" />
      </div>
      <div v-if="visibleSidebar && isSidebar">
        <Sidebar @resetFilter="handleResetFilter" @filter="handleFilter" />
      </div>
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
        <div :class="!isSidebar && 'xl:ml-40 xl:mr-40'">
          <div class="grid grid-cols-2 justify-between">
            <div
              class="
                sm:w-22
                xl:w-44
                form-select
                quantico
                rounded-xl
                border-0
                search-auto-complete
              "
            >
              <basic-select
                class="text-white"
                :options="options"
                :selected-option="selectedOption"
                placeholder="SORT BY.."
                @select="onFilter"
              >
              </basic-select>
            </div>
            <div class="self-center justify-self-end">
              <span
                class="
                  quantico
                  xs:text-lg
                  md:text-xl
                  lg:text-2xl
                  xl:text-3xl
                  2xl:text-5xl
                  text-white
                  font-weight-bold
                  uppercase
                "
                >{{
                  loading ? "..." : cards.length.toLocaleString()
                }}
                cards</span
              >
            </div>
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
            v-if="!loading && isFavScreen"
          >
            <div v-for="card in cards" :key="card.id" class="card">
              <Card
                :card="card"
                :isOwner="isOwner"
                :key="card.id"
                :isFavScreen="isFavScreen"
                :favorites="favorites"
                @visibleModal="handleVisible"
                @setCard="handleSetCard"
                @unfavoriteCard="handleUnfavoriteCard"
                @unfavorite="unfavorite"
                @updateFavorites="handleUpdateFavorites"
              />
            </div>
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
            v-else-if="!loading && !isFavScreen && cards.length"
          >
            <div
              v-for="index in maxCards"
              :key="cards[index - 1].id"
              class="card"
            >
              <Card
                :card="cards[index - 1]"
                :isOwner="isOwner"
                :key="cards[index - 1].id"
                :isFavScreen="isFavScreen"
                :favorites="favorites"
                :onloadCancel="onloadCancel"
                @transferred="emitTransferred"
                @visibleModal="handleVisible"
                @setCard="handleSetCard"
                @unfavoriteCard="handleUnfavoriteCard"
                @unfavorite="unfavorite"
                @updateFavorites="handleUpdateFavorites"
                @cancelOrder="cancelOrder"
              />
            </div>
          </div>
          <div
            v-if="cards.length > 0 && cards.length !== maxCards && !isFavScreen"
            class="text-center mt-5"
          >
            <span
              class="
                quantico
                text-3xl text-white
                cursor-pointer
                uppercase
                load-more
              "
              @click="handleLoadMore"
            >
              Load more
            </span>
          </div>
        </div>
        <div
          v-if="visibleSideMenu"
          class="fixed right-0 top-0 side-menu-top w-64 h-full side-menu-bg"
        >
          <SideMenu :account="shortAddress" />
        </div>
      </div>
    </div>
    <div>
      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        name="sell"
        class="backdrop"
      >
        <div v-if="currentCard.id" class="bg-ecio-bg p-5">
          <div class="flex justify-end">
            <button @click="$modal.hide('sell')">
              <img
                src="../../assets/images/modal-close.png"
                alt="modal close"
              />
            </button>
          </div>
          <div class="flex justify-center mb-3">
            <span class="text-2xl font-weight-bold quantico text-ecio-green">
              LIST ITEM FOR SALE
            </span>
          </div>
          <div>
            <div class="input-group mb-3">
              <money
                :disabled="onLoadConfirm"
                v-model="amount"
                class="
                  form-control
                  radius-10
                  relative
                  bg-custom-amount
                  border-0
                  text-white
                "
                min="1"
                @keypress="isNumber($event)"
                aria-label="Amount (to the nearest dollar)"
                placeholder="Amount"
              ></money>
              <!-- 
              <input
                :disabled="onLoadConfirm"
                v-model="amount"
                type="number"
                class="form-control radius-10 relative bg-custom-amount border-0 text-white"
                min="1"
                max="10000000000"
                @keypress="isNumber($event)"
                aria-label="Amount (to the nearest dollar)"
                placeholder="Amount"
              /> -->
              <div
                class="
                  input-group-append
                  absolute
                  right-0
                  top-0
                  bottom-0
                  items-center
                "
              >
                <span class="currecy-text-color amiko uppercase text-xs mr-3"
                  >(BUSD)</span
                >
              </div>
            </div>
          </div>
          <!-- <div>
            <span class="text-white">Fees</span>
          </div> -->
          <div class="grid grid-cols-2">
            <div><span class="quantico card-id">Received</span></div>
            <div class="text-right text-white card-id">
              <span class="quantico"
                >{{
                  (amount - amount * (feeRate / 100)).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    }
                  )
                }}
                BUSD</span
              >
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div>
              <span class="quantico card-id">Service Fee ({{ feeRate }}%)</span>
            </div>
            <div class="text-right text-white card-id">
              <span class="quantico"
                >{{
                  (amount * (feeRate / 100)).toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
                BUSD</span
              >
            </div>
          </div>

          <div class="mt-4 flex gap-4">
            <button
              v-if="onloadApprove"
              class="btn bg-custom-purple rounded-xl"
            >
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
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
              class="btn bg-custom-purple rounded-xl"
              @click="approveHandler"
              :disabled="isApprove"
            >
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
              >
                {{ isApprove ? "Approved" : "Approve" }}
              </span>
            </button>

            <button v-if="onLoadConfirm" class="btn bg-custom-green rounded-xl">
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
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
              class="btn bg-custom-green rounded-xl"
              @click="createOrder"
              :disabled="!isApprove"
            >
              <span
                class="quantico uppercase text-black font-weight-bold text-xl"
              >
                confirm
              </span>
            </button>
          </div>
        </div>
      </modal>

      <modal
        height="auto"
        :scrollable="true"
        :adaptive="true"
        name="gift"
        class="backdrop"
      >
        <div v-if="currentCard.id" class="bg-ecio-bg p-5">
          <div class="flex justify-end">
            <button @click="$modal.hide('gift')">
              <img
                src="../../assets/images/modal-close.png"
                alt="modal close"
              />
            </button>
          </div>
          <div class="flex justify-center">
            <span
              class="
                text-2xl
                font-weight-bold
                text-ecio-green
                uppercase
                quantico
              "
            >
              transfer
            </span>
          </div>
          <div class="mt-3 grid justify-center">
            <img
              class="max-h-72"
              :src="changeImageEndpoint(currentCard.image)"
            />
          </div>
          <div
            class="text-center text-white mt-4 my-2 uppercase quantico text-lg"
          >
            <span>Wallet address or ENS name</span>
          </div>
          <div>
            <div class="input-group mb-3">
              <input
                type="text"
                class="
                  form-control
                  radius-10
                  relative
                  bg-custom-amount
                  border-0
                  text-white
                "
                aria-label="Amount (to the nearest dollar)"
                placeholder="e.g. 0x2ef3... or deatinatiom.eth"
                v-model="addressTo"
              />
            </div>
          </div>
          <div class="text-center">
            <span class="text-white quantico"
              >“Card {{ convertTokenId }}” will be transferred to
              {{ addressTo || "..." }}</span
            >
          </div>
          <div class="mt-4">
            <button
              class="btn bg-custom-purple rounded-xl"
              @click="handleTransfer"
              :disabled="onloadApprove"
            >
              <span class="quantico uppercase font-weight-bold text-xl">
                transfer
              </span>
            </button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import mautic from "mautic-tracking";
mautic.initialize("https://mt.ecio.space/mtc.js");
import Card from "../../components/Card/Card.vue";
import Sidebar from "../../components/Sidebar/SidebarMarketPlace.vue";
import SideMenu from "../../components/SideMenu/SideMenu.vue";
import MarketPlace from "./../../contracts/MarketPlace.json";
import NFTCore from "./../../contracts/NFTCore.json";
import { BasicSelect } from "vue-search-select";
import Web3 from "web3";
import banIds from "./../../store/banIds.json";
export default {
  components: {
    Card,
    Sidebar,
    SideMenu,
    BasicSelect,
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
    cards() {
      return this.cardsAll.filter(
        (c) =>
          c.market_owner != "0x3f5F748Ffc13B81fED6282aFBc5D416D281D33Cc" &&
          c.market_owner != "0x8b6E68f7d3C72CD4BfeC2B0D87c5Ef664ea4Ed2e" &&
          c.market_owner != "0x0E4Ca9E0b44b4bbf072136645f44Ef69b9C8762A" &&
          c.market_owner != "0x60365B27ABFF56915e21497d5320186922C2E732" &&
          !banIds.includes(c.token_id)
      );
    },
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
    cardsAll() {
      return this.$store.getters.getCards;
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
      maxCards: 12,
      amount: 0,
      options: [
        { text: "LOWEST ID", value: "low_id" },
        { text: "HIGHEST ID", value: "high_id" },
        { text: "LOWEST PRICE", value: "low_price" },
        { text: "HIGHEST PRICE", value: "high_price" },
        { text: "LATEST", value: "latest" },
        { text: "NFT TYPE", value: "nft_type" },
      ],
      currentCard: {},
      favorites: [],
      addressTo: "",
      walletAccount: "",
      selectedOption: {},
      marketPlaceContract: undefined,
      nftCoreContract: undefined,
      onloadApprove: false,
      isApprove: false,
      onLoadConfirm: false,
      onloadCancel: 0,
      feeRate: process.env.VUE_APP_FEE_RATE,
    };
  },
  watch: {
    selectedOption(newSelected, oldSelected) {
      if (newSelected.text !== oldSelected.text) {
        if (newSelected.text === "LOWEST ID") {
          this.cards.sort((a, b) => a.token_id - b.token_id);
        } else if (newSelected.text === "HIGHEST ID") {
          this.cards.sort((a, b) => b.token_id - a.token_id);
        } else if (newSelected.text === "LOWEST PRICE") {
          this.cards.sort((a, b) => a.price - b.price);
        } else if (newSelected.text === "HIGHEST PRICE") {
          this.cards.sort((a, b) => b.price - a.price);
        } else if (newSelected.text === "LATEST") {
          this.cards.sort(
            (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
          );
        } else if (newSelected.text === "NFT TYPE") {
          this.cards
            .sort((a, b) => (a.rarity > b.rarity ? -1 : 1))
            .sort((a, b) => (a.fragment > b.fragment ? 1 : -1))
            .sort((a, b) => (a.nft_type > b.nft_type ? -1 : 1));
        }
      } else {
        this.cards.sort((a, b) => (a.nft_type > b.nft_type ? 1 : -1));
      }
    },
    cards() {
      if (this.cards.length > 0) {
        this.handleSetMaxRange();
        this.handleSetMaxCard();
      }
    },
  },
  mounted() {
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
      this.loadConnect();
      that.connectWallet();
    }
    this.handleFetchFavorite();

    if (this.isFavScreen) {
      this.fetchFavoriteCards();
    }
  },
  methods: {
    changeImageEndpoint(imageURL) {
      if (typeof imageURL != "undefined") {
        var pathName = new URL(imageURL).pathname;
        imageURL = process.env.VUE_APP_NFT_METADATA_ENDPOINT + pathName;
      }
      return imageURL;
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
    resetFilter() {
      this.selectedOption = { text: "HIGHEST ID", value: "high_id" };
    },
    async handleTransfer() {
      this.loadConnect().then(() => {
        var vm = this;
        this.nftCoreContract.methods
          .safeTransferFrom(
            vm.walletAccount,
            vm.addressTo,
            vm.currentCard.token_id
          )
          .send({ from: vm.walletAccount })
          .on("sent", () => {})
          .on("transactionHash", () => {})
          .on("receipt", () => {})
          .on("confirmation", () => {
            vm.setOnloadApprove(false);
            vm.$modal.hide("gift");
            vm.$emit("transferred", vm.currentCard);
          })
          .on("error", () => {});
      });
    },
    async cancelOrder() {
      this.loadConnect().then(() => {
        var vm = this;
        this.marketPlaceContract.methods
          .cancelOrder(vm.currentCard.orderId)
          .send({ from: vm.walletAccount })
          .on("transactionHash", () => (vm.onloadCancel = vm.currentCard.id))
          .on("receipt", () => {})
          .on("confirmation", () => {
            vm.onloadCancel = 0;
            vm.$emit("canceled", vm.currentCard);
          })
          .on("error", () => {});
      });
    },
    async createOrder() {
      this.loadConnect().then(() => {
        var vm = this;
        // console.log();
        // let price = (
        //   vm.amount -
        //   vm.amount * (this.feeRate / 100)
        // ).toLocaleString(undefined, {
        //   minimumFractionDigits: 3,
        //   maximumFractionDigits: 3,
        // });
         var value = Web3.utils.toWei(
          Web3.utils.toBN(vm.amount).toString(),
          "ether"
        );
        // console.log(value - value * (this.feeRate / 100));
        //amount - amount * (feeRate / 100)
        this.marketPlaceContract.methods
          .createOrder(
            vm.currentCard.contract_address,
            vm.currentCard.token_id,
            value,
            process.env.VUE_APP_BUSD_TOKEN_CONTRACT_ADDRESS
          )
          .send({ from: vm.walletAccount })
          .on("sent", () => {})
          .on("transactionHash", () => vm.setOnloadConfirm(true))
          .on("receipt", () => {})
          .on("confirmation", () => {
            setTimeout(() => {
              window.location.href = "/my-collection";
            }, 2000);
          })
          .on("error", () => {
            vm.setOnloadConfirm(false);
          });
      });
    },
    async approveHandler() {
      this.loadConnect().then(() => {
        var vm = this;
        console.log("this.nftCoreContract", this.nftCoreContract);
        this.nftCoreContract.methods
          .setApprovalForAll(process.env.VUE_APP_MARKET_CONTRACT_ADDRESS, true)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function () {})
          .on("sent", function () {})
          .on("transactionHash", () => vm.setOnloadApprove(true))
          .on("confirmation", function () {
            vm.setIsApprove(true);
            vm.setOnloadApprove(false);
          })
          .on("error", () => {
            vm.setOnloadApprove(false);
          });
      });
    },
    async setOnloadConfirm(condition) {
      this.onLoadConfirm = condition;
    },
    async setOnloadApprove(condition) {
      this.onloadApprove = condition;
    },
    setIsApprove(condition) {
      this.isApprove = condition;
    },
    emitTransferred(card) {
      this.$emit("transferred", card);
    },
    async loadConnect() {
      window.web3 = new Web3(window.ethereum);
      this.marketPlaceContract = await new window.web3.eth.Contract(
        MarketPlace.abi,
        process.env.VUE_APP_MARKET_CONTRACT_ADDRESS
      );
      if (typeof this.currentCard != "undefined") {
        console.log("this.currentCard", this.currentCard);
        this.nftCoreContract = await new window.web3.eth.Contract(
          NFTCore.abi,
          this.currentCard.length > 0
            ? this.currentCard.contract_address
            : this.currentCard.token_id < 5000
            ? process.env.VUE_APP_CONTRACT_NFTCORE_V2
            : process.env.VUE_APP_CONTRACT_NFTCORE_V2
        );
        this.nftCoreContract.methods
          .isApprovedForAll(
            window.ethereum.selectedAddress,
            process.env.VUE_APP_MARKET_CONTRACT_ADDRESS
          )
          .call()
          .then((isApprove) => {
            console.log("isApprove", isApprove);
            this.setIsApprove(isApprove);
          });
      }
    },
    handleResetFilter() {
      this.$emit("handleResetFilter");
    },
    handleSetMaxCard() {
      if (this.cards.length >= 12) {
        this.maxCards = 12;
      } else {
        this.maxCards = this.cards.length;
      }
    },
    async connectWallet() {
      if (this.validated()) {
        this.switchNetwork();

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        this.walletAccount = window.ethereum.selectedAddress;

        mautic.pageView({
          walletaddress: window.ethereum.selectedAddress,
          firstname: window.ethereum.selectedAddress,
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
    handleFetchFavorite() {
      let favorite = localStorage.getItem("favorite");
      if (favorite) {
        const arrays = JSON.parse(localStorage.getItem("favorite"));
        if (arrays.length) {
          this.favorites = arrays;
        }
      }
    },
    handleSetMaxRange() {
      this.$store.dispatch("setRangeValue", [0, 10000]);
      this.$store.dispatch("setMaxRange", 10000);
    },
    fetchFavoriteCards() {
      const favorites = JSON.parse(localStorage.getItem("favorite"));
      this.cards = favorites;
    },
    handleUpdateFavorites(favorites) {
      this.favorites = favorites;
      localStorage.setItem("favorite", JSON.stringify(favorites));
    },
    handleUnfavoriteCard(favorite) {
      this.$emit("setLoading", true);
      this.cards = favorite;
      localStorage.setItem("favorite", JSON.stringify(favorite));
      this.$emit("setLoading", false);
    },
    unfavorite(favorite) {
      this.$emit("setLoading", true);
      this.favorites = favorite;
      localStorage.setItem("favorite", JSON.stringify(favorite));
      this.$emit("setLoading", false);
    },
    handleSetCard(card) {
      this.currentCard = card;
    },
    handleVisible(type) {
      this.amount = 0;
      this.loadConnect().then(() => {});
      this.$modal.show(type);
    },
    usdCurrency(price) {
      let usd = +price || 0;
      return usd.toLocaleString("us-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    handleFilter(search) {
      this.$emit("filter", search);
    },
    onFilter(item) {
      this.selectedOption = item;
    },
    handleLoadMore() {
      const range = this.cards.length - this.maxCards;
      if (range >= 12) {
        this.maxCards += 12;
      } else if (range >= 1 && range <= 11) {
        this.maxCards += range;
      } else {
        this.maxCards = this.cards.length;
      }
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
.currecy-text-color {
  color: #3f4148;
}
.card {
  background-color: #252525;
  border-radius: 10px;
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
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
