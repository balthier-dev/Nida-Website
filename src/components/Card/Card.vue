<template>
  <div>
    <div class="grid grid-cols-2 xs:p-2 md:p-3 2xl:p-4">
      <div>
        <span class="quantico text-white text-base uppercase">
          {{ showType(card.nft_type) }}
        </span>
      </div>
      <div class="justify-self-end">
        <span class="quantico text-base card-id"
          >#{{ "0".repeat(9 - String(card.token_id).length)
          }}{{ String(card.token_id) }}</span
        >
      </div>
    </div>
    <div class="divider" />
    <div class="py-4 px-4 h-80 grid grid-cols-1 items-center">
      <div class="grid justify-center">
        <router-link :to="{ path: `/items/${card.token_id}/` }">
          <img
            class="max-h-72 cursor-pointer"
            :src="changeImageEndpoint(card.image)"
          />
        </router-link>
      </div>
    </div>
    <div class="divider" />
    <div v-if="isOwner">
      <div v-if="card.isSelling" class="grid gap-2 xs:p-2 md:p-3 2xl:p-4">
        <div>
          <button
            v-if="onloadCancel === card.id"
            class="btn bg-ecio-gray rounded-xl"
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
              canceling
            </span>
          </button>

          <button
            v-else
            class="
              btn btn-buy
              bg-custom-cancel
              flex
              items-center
              justify-center
              text-black
            "
            @click="
              $emit('setCard', card);
              $emit('cancelOrder', card);
            "
          >
            <span class="quantico text-black uppercase text-lg">cancel</span>
          </button>
        </div>
      </div>
      <div v-else-if="card.type === 'mystery_box'">
        <button
          class="btn btn-buy bg-custom-green flex items-center justify-center"
        >
          <span class="quantico text-black uppercase text-lg">redeem</span>
        </button>
      </div>

      <div v-else class="grid grid-cols-2 gap-2 xs:p-2 md:p-3 2xl:p-4">
        <div>
          <button
            class="
              btn btn-buy
              bg-custom-purple
              flex
              items-center
              justify-center
            "
            @click="
              $emit('setCard', card);
              $emit('visibleModal', 'sell');
            "
          >
            <span class="quantico text-black uppercase text-lg">sell</span>
          </button>
        </div>
        <div>
          <button
            class="btn btn-buy bg-custom-gray flex items-center justify-center"
            @click="
              $emit('setCard', card);
              $emit('visibleModal', 'gift');
            "
          >
            <span class="quantico text-black uppercase text-lg">gift</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="gap-2 xs:p-2 md:p-3 2xl:p-4 justify-between">
      <div class="col-start-1 col-end-3 self-center grid-rows-1">
        <div>
          <span class="quantico text-custom-green text-xl">
            {{ numberWithCommas(card.price) }} BUSD
          </span>
        </div>
      </div>
      <div class="flex self-center text-center mt-2">
        <router-link
          :to="{ path: `items/${card.token_id}/` }"
          class="btn btn-buy bg-custom-green"
        >
          <span
            class="quantico text-black uppercase text-lg"
            style="margin: auto; left: 0; right: 0; position: absolute"
            >buy</span
          >
        </router-link>

        <div
          v-if="isFavScreen || checkIsFavorite(card.id)"
          class=""
          style="min-width: 50px; margin-left: 10px"
        >
          <button
            class="btn btn-fav bg-black"
            @click="handleUnfavoriteCard(card)"
          >
            <div class="grid justify-center">
              <img src="../../assets/images/fav.png" />
            </div>
          </button>
        </div>
        <div v-else class="" style="min-width: 50px; margin-left: 10px">
          <button
            class="btn btn-fav bg-black"
            @click="handleFavoriteCard(card)"
          >
            <div class="grid justify-center">
              <img src="../../assets/images/unfav.png" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { find } from "lodash";
import MarketPlace from "./../../contracts/MarketPlace.json";
import ERC20 from "./../../contracts/ERC20.json";
import Web3 from "web3";
export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    isOwner: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFavScreen: {
      type: Boolean,
      required: true,
      default: false,
    },
    favorites: {
      type: Array,
      default: () => [],
    },
    onloadCancel: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pathname: function () {
      return this.$route.fullPath.split("/v2/")[1];
    },
  },
  data() {
    return {
      types: {
        card: "card",
        fragment: "fragment",
        mystery_box: "mystery box",
        blueprint: "blueprint",
      },
      feeRate: process.env.VUE_APP_FEE_RATE,
      marketPlaceContract: undefined,
      ecioContract: undefined,
    };
  },
  mounted() {},
  methods: {
    changeImageEndpoint(imageURL) {
      if (typeof imageURL != "undefined") {
        var pathName = new URL(imageURL).pathname;
        imageURL = process.env.VUE_APP_NFT_METADATA_ENDPOINT + pathName;
      }

      // if (process.env.ENV == "mainnet") {
      //   return imageURL.replace(
      //     "metadata.ecio.space",
      //     "metadata-v2.ecio.space"
      //   );
      // }
      return imageURL;
    },
    numberWithCommas(x) {
      if (x == undefined) {
        return "0";
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async approveHandler() {
      this.loadConnect().then(() => {
        var vm = this;
        var value = Web3.utils.toWei(
          Web3.utils.toBN(vm.card.price).toString(),
          "ether"
        );
        this.ecioContract.methods
          .approve(process.env.VUE_APP_MARKET_CONTRACT_ADDRESS, value)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function () {
            vm.createSale();
          })
          .on("sent", function () {})
          .on("transactionHash", function () {})
          .on("confirmation", function () {})
          .on("error", function () {});
      });
    },
    createSale() {
      this.loadConnect().then(() => {
        var vm = this;
        this.marketPlaceContract.methods
          .createSale(vm.card.orderId)
          .send({ from: window.ethereum.selectedAddress })
          .on("receipt", function () {
            vm.$emit("transferred", vm.card);
          })
          .on("sent", function () {})
          .on("transactionHash", function () {})
          .on("confirmation", function () {})
          .on("error", function () {});
      });
    },
    async loadConnect() {
      window.web3 = new Web3(window.ethereum);
      this.marketPlaceContract = await new window.web3.eth.Contract(
        MarketPlace.abi,
        process.env.VUE_APP_MARKET_CONTRACT_ADDRESS
      );
      this.ecioContract = await new window.web3.eth.Contract(
        ERC20.abi,
        this.card.buyWith
      );
    },
    checkIsFavorite(id) {
      return find(this.favorites, { id }) ? true : false;
    },
    toWeiCurrency(price) {
      if (!price) {
        return 0;
      }
      var value = Web3.utils.fromWei(
        Web3.utils.toBN(price).toString(),
        "ether"
      );
      return value.toLocaleString("us-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    showType(type) {
      return this.types[type];
    },
    handleFavoriteCard(card) {
      let favorite;
      if (localStorage.getItem("favorite")) {
        favorite = JSON.parse(localStorage.getItem("favorite"));
      } else {
        favorite = [];
      }
      favorite.push(card);
      this.$emit("updateFavorites", favorite);
    },
    handleUnfavoriteCard(card) {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      favorite = favorite.filter((fav) => fav.id !== card.id);
      if (this.isFavScreen) {
        this.$emit("unfavoriteCard", favorite);
        this.$store.dispatch("setCards", favorite);
      } else {
        this.$emit("unfavorite", favorite);
      }
    },
  },
};
</script>
<style>
.bg-custom-green {
  background-color: #e0fb16;
}
.bg-custom-purple {
  background-color: #9a66ff;
}
.bg-custom-gray {
  background-color: #c4c4c4;
}
.bg-custom-cancel {
  background-color: #585858;
}
.divider {
  border-bottom: 1px solid #000000;
}
.card-id {
  color: rgba(255, 255, 255, 0.5);
}
.btn-buy {
  border-radius: 10px;
  height: 40px;
}
.btn-fav {
  border-radius: 10px;
  height: 40px;
}
.quantico {
  font-family: Quantico;
}
.last-price {
  color: rgba(255, 255, 255, 0.3);
}

@media all and (max-width: 768px) {
  .btn-buy {
    width: 120px !important;
  }
}
</style>
