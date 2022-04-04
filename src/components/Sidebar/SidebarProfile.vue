<template>
  <div
    class="
      container-profile
      overflow-y-scroll
      z-10
      xs:pb-14 xs:fixed xs:w-96 xs:p-6
      h-94vh
      xl:p-12
    "
  >
    <div
      class="
        grid grid-rows-1 grid-flow-col
        gap-3
        bg-black
        p-3
        rounded-xl
        justify-center
        mt-2
      "
      style="display: block"
    >
      <div class="row">
        <div class="col-8 text-left">
          <span
            class="
              xs:text-sm
              xl:text-lg
              2xl:text-xl
              text-white
              uppercase
              font-bold
            "
          >
            {{ displayName }}
          </span>
          <span v-clipboard:copy="account" style="cursor: pointer; font-size: 12px;" class="xs:text-sm xl:text-md 2xl:text-md text-white font-bold">
            {{ walletAddress }}
            <i v-clipboard:copy="account" class="pi pi-copy" style="color: #e0fb16; cursor: pointer;"></i>
          </span>
        </div>
        <div class="col-4 text-right">
          <img
            src="../../assets/userprofile/Avatar.png"
            class="cursor-pointer"
          />
        </div>
      </div>
      <!-- <div class="row mt-3 text-white">
        <div class="col-12">
          <img src="../../assets/userprofile/Line.png" />
        </div>
      </div>
      <div class="row mt-3 text-white">
        <div class="col-12">
          <span
            class="
              xs:text-sm
              xl:text-md
              2xl:text-md
              text-white
              uppercase
              font-bold
            "
          >
            REMAIN BATTLE POWER 1100/1256
          </span>
          <div>
            <ProgressBar :value="value" :showValue="false" />
          </div>
        </div>
        <div class="col-12">
          <span
            class="
              xs:text-xs
              xl:text-sm
              2xl:text-sm
              text-gray
              uppercase
              font-bold
            "
          >
            <i
              class="pi pi-exclamation-circle"
              style="color: #e0fb16; margin-right: 5px"
            ></i>
            Reset at 14:00 UTC
          </span>
        </div>
      </div> -->
    </div>

    <div class="mt-5">
      <div class="col-8">
        <span
          class="
            xs:text-xs
            xl:text-sm
            2xl:text-base
            text-gray
            uppercase
            font-bold
          "
          style="color :#3f4148; font-size: 12px;"
        >
          in-game balance
        </span>
      </div>
    </div>
    <div
      class="grid grid-rows-1 grid-flow-col bg-black justify-center mt-3"
      style="display: block; border-radius: 40px"
    >
      <div class="row">
        <div class="col-3" style="padding-left: 0; padding-right: 0">
          <img
            src="../../assets/userprofile/ecioIcon.png"
            style="margin-left: 15px"
            width="56"
          />
        </div>
        <div class="col-9" style="margin: auto; text-align : left;">
          <h2 class="text-lg">{{ecioBalance}} ECIO</h2>
          <span class="text-gray uppercase font-bold" style="color :#3f4148 !important; font-size: 14px !important;"> {{ecioBalanceUsd}} USD </span>
        </div>
      </div>
    </div>
    <div
      class="grid grid-rows-1 grid-flow-col bg-black justify-center mt-3"
      style="display: block; border-radius: 40px"
    >
      <div class="row">
        <div class="col-3" style="padding-left: 0; padding-right: 0">
          <img
            src="../../assets/userprofile/lkmIcon.png"
            style="margin-left: 15px"
            width="56"
          />
        </div>
        <div class="col-9" style="margin: auto; text-align : left;">
          <h2 class="text-lg" style="color: #9a66ff">{{lkmBalance}} LKM</h2>
          <span class="text-gray text-sm uppercase font-bold" style="color :#3f4148 !important; font-size: 14px !important;"> {{lkmBalanceUsd}} usd </span>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="col-8" style="text-align: left;">
        <span
          class="
            xs:text-xs
            xl:text-sm
            2xl:text-base
            text-gray
            uppercase
            font-bold
          "
          style="color :#3f4148; font-size: 12px;"
        >
          Menu
        </span>
      </div>
    </div>
    <div class="mt-5">
      <div class="row">
        <!-- <div class="col-3">
          <img src="../../assets/userprofile/walletIcon.png" />
        </div> -->
        <div class="col-9" style="text-align: left;">
          <a href="/claim-binance">
            <span
              class="
                xs:text-xs
                xl:text-sm
                2xl:text-base
                text-white
                font-bold
                menu-sidebar
                amigo
              "
              style="font-size: 12px;"
            >
              <i
                class="pi pi-shopping-bag"
                style="font-size: 1.7rem !important; margin-right: 10px"
              ></i>
              <!-- <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                xmlns="http://www.w3.org/2000/svg"
                style="display: flex;"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.4414 2.70605H4.44141C3.33684 2.70605 2.44141 3.60149 2.44141 4.70605V14.7061C2.44141 15.8106 3.33684 16.7061 4.44141 16.7061H16.4414C17.546 16.7061 18.4414 15.8106 18.4414 14.7061V13.7061H14.4414C12.2323 13.7061 10.4414 11.9152 10.4414 9.70605C10.4414 7.49692 12.2323 5.70605 14.4414 5.70605H18.4414V4.70605C18.4414 3.60149 17.546 2.70605 16.4414 2.70605ZM12.4414 9.70605C12.4414 8.60149 13.3368 7.70605 14.4414 7.70605H18.4414V11.7061H14.4414C13.3368 11.7061 12.4414 10.8106 12.4414 9.70605ZM20.4414 14.7061V13.7061V11.7061V7.70605V5.70605V4.70605C20.4414 2.49692 18.6505 0.706055 16.4414 0.706055H4.44141C2.23227 0.706055 0.441406 2.49692 0.441406 4.70605V14.7061C0.441406 16.9152 2.23227 18.7061 4.44141 18.7061H16.4414C18.6505 18.7061 20.4414 16.9152 20.4414 14.7061ZM14.4414 10.7061C14.9937 10.7061 15.4414 10.2583 15.4414 9.70605C15.4414 9.15377 14.9937 8.70605 14.4414 8.70605C13.8891 8.70605 13.4414 9.15377 13.4414 9.70605C13.4414 10.2583 13.8891 10.7061 14.4414 10.7061Z"
                  fill="#ffffff"
                />
              </svg> -->

              Claim Binance NFTs
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="row">
        <!-- <div class="col-3">
          <img src="../../assets/userprofile/userIcon.png" />
        </div> -->
        <div class="col-9" style="text-align: left;">
          <a href="/user-setting">
            <span
              class="
                xs:text-xs
                xl:text-sm
                2xl:text-base
                text-white
                font-bold
                menu-sidebar
                amigo
              "
              style="font-size: 12px;"
            >
              <i
                class="pi pi-user"
                style="font-size: 1.7rem !important; margin-right: 10px"
              ></i>
              Account Setting
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="row mt-3 text-white">
      <div class="col-12">
        <img src="../../assets/userprofile/Line.png" />
      </div>
    </div>
    <div class="mt-5">
      <div class="row">
        <!-- <div class="col-3">
          <img src="../../assets/userprofile/logOutIcon.png" />
        </div> -->
        <div class="col-9" style="text-align: left;">
          <span
            class="
              xs:text-xs
              xl:text-sm
              2xl:text-base
              text-white
              font-bold
              menu-sidebar
              amigo
            "
            style="font-size: 12px;"
          >
            <i
              class="pi pi-sign-out"
              style="font-size: 1.7rem !important; margin-right: 10px"
            ></i
            >Log out
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { MultiSelect, BasicSelect } from "vue-search-select";
import { mapGetters } from "vuex";
import "primeicons/primeicons.css";
// import ProgressBar from "primevue/progressbar";
export default {
  components: {
    // ProgressBar,
  },
  props: {
    ecioBalance: {
      type: String,
      default: "-",
    },
    lkmBalance: {
      type: String,
      default: "-",
    },
    ecioBalanceUsd: {
      type: String,
      default: "-",
    },
    lkmBalanceUsd: {
      type: String,
      default: "-",
    },
    walletAddress: {
      type: String,
      default: "",
    },
    displayName: {
      type: String,
      default: "No Name",
    },
    account: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      value: 90,
    };
  },
  computed: mapGetters({
    maxValue: "getRangeValue",
    maxRange: "getMaxRange",
    cards: "getCards",
  }),
  watch: {
    cards(oldCard, newCard) {
      if (oldCard.length !== newCard.length) {
        this.handleUpdateSearchCards();
      }
    },
  },
  methods: {
    shortAddress() {
      return "".concat(
        this.walletAccount.substring(0, 6),
        "...",
        this.walletAccount.slice(-4)
      );
    },
  },
};
</script>
<style>
@media (min-width: 375px) {
  .h-94vh {
    height: 94vh;
  }
}
.active {
  background-color: #e0fb16 !important;
}
.activeSpan {
  color: #000000 !important;
}

.container-profile {
  background-color: #1e202c;
  width: 350px;
}
.quantico {
  font-family: "Quantico";
}
/* .amigo {
  font-family: "Amigo";
} */
.text-gray {
  color: #3f4148 !important;
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
.vue-slider-rail {
  background-color: #000000;
}
.p-progressbar .p-progressbar-value {
  background: #e0fb16;
}
.vue-slider-process {
  background-color: #e0fb16;
}
.vue-slider-dot-handle {
  background-color: #e0fb16;
}
.menu-sidebar:hover {
  color: #e0fb16 !important;
  cursor: pointer;
}
.multi-select {
  background-color: #000000 !important;
  color: #ffffff !important;
}
.multi-select .text {
  color: #ffffff !important;
  font-family: "Quantico";
}
.multi-select a {
  color: #000000 !important;
  font-family: "Quantico";
  left: 10px;
  top: 10px;
}
svg:hover {
  fill: #e0fb16;
}
.img-fit {
  width: 30px;
  height: 30px;
}
.ui.multiple.dropdown > .label {
  background-color: white !important;
}
</style>
