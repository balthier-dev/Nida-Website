<template>
  <div
    class="
      container-market-place
      overflow-y-scroll
      z-10
      xs:pb-14 xs:fixed xs:w-96 xs:p-6
      h-94vh
      xl:p-12
    "
  >
    <div>
      <span
        class="
          xs:text-base
          xl:text-3xl
          2xl:text-4xl
          quantico
          text-white
          uppercase
          font-bold
        "
      >
        marketplace
      </span>
    </div>
    <div class="mt-8 grid grid-cols-2">
      <div>
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
          item name
        </span>
      </div>
      <div class="text-right">
        <span
          class="
            xs:text-xs
            xl:text-sm
            2xl:text-base
            text-gray
            uppercase
            font-bold
            cursor-pointer
          "
          @click="handleResetFilter"
        >
          [clear filter]
        </span>
      </div>
    </div>
    <div
      v-if="!loading"
      class="max-w-xs quantico uppercase search-auto-complete mt-4"
    >
      <basic-select
        class="text-white"
        :options="options"
        :selected-option="search"
        placeholder="Search.."
        @select="onSearch"
      >
      </basic-select>
    </div>
    <div class="mt-12 grid grid-cols-2">
      <div>
        <span
          class="
            quantico
            text-white
            uppercase
            xs:text-sm
            xl:text-base
            2xl:text-2xl
          "
        >
          price
        </span>
      </div>
      <div class="text-right self-center">
        <span class="quantico text-white uppercase xs:text-xs 2xl:text-base">
          (busd)
        </span>
      </div>
    </div>
    <div>
      <vue-slider
        :enable-cross="false"
        v-model="rangeValue"
        v-bind="{ max: 10000 }"
        @change="onChangeMaxValue"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-3">
      <div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text quantico text-white bg-black border-black"
            >
              $
            </span>
          </div>
          <input
            type="text"
            class="form-control bg-black border-black text-center quantico"
            aria-label="Amount (to the nearest dollar)"
            v-model="rangeValue[0]"
            @change="handleChangeMaxValue($event, 0)"
          />
        </div>
      </div>
      <div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span
              class="input-group-text quantico text-white bg-black border-black"
              >$</span
            >
          </div>
          <input
            type="text"
            class="form-control bg-black border-black text-center quantico"
            aria-label="Amount (to the nearest dollar)"
            v-model="rangeValue[1]"
            @change="handleChangeMaxValue($event, 1)"
          />
        </div>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-3 gap-4">
      <div>
        <button
          @click="handleFilterType('ALL')"
          class="btn bg-black rounded-lg xs:p-0 xl:p-1"
          :class="{ active: filter.filterType === 'ALL' }"
        >
          <span
            class="quantico uppercase text-white xs:text-xs 2xl:text-sm"
            :class="{ activeSpan: filter.filterType === 'ALL' }"
          >
            all
          </span>
        </button>
      </div>
      <div>
        <button
          @click="handleFilterType('CARD')"
          class="btn bg-black rounded-lg xs:p-0 xl:p-1"
          :class="{ active: filter.filterType === 'CARD' }"
        >
          <span
            class="quantico uppercase text-white xs:text-xs 2xl:text-sm"
            :class="{ activeSpan: filter.filterType === 'CARD' }"
          >
            card
          </span>
        </button>
      </div>
      <div>
        <button
          @click="handleFilterType('FRAGMENT')"
          class="btn bg-black rounded-lg xs:p-0 xl:p-1"
          :class="{ active: filter.filterType === 'FRAGMENT' }"
        >
          <span
            class="quantico uppercase text-white xs:text-xs 2xl:text-sm"
            :class="{ activeSpan: filter.filterType === 'FRAGMENT' }"
          >
            fragment
          </span>
        </button>
      </div>
    </div>
    <div class="mt-4 quantico uppercase text-white search-auto-complete">
      <!-- <basic-select
        class="text-white"
        :options="selections"
        :selected-option="tribeSelected"
        placeholder="TRIBE"
        @select="onTribeSelect"
      >
      </basic-select> -->
    </div>
    <div
      v-if="filter.filterType === 'CARD'"
      class="mt-4 grid grid-cols-2 gap-4"
    >
      <div>
        <button
          @click="handleFilterIn('CHARACTER')"
          class="btn bg-black rounded-lg"
          :class="{ active: filter.filterIn === 'CHARACTER' }"
        >
          <span
            :class="{ activeSpan: filter.filterIn === 'CHARACTER' }"
            class="
              quantico
              uppercase
              text-white
              xs:text-xs
              xl:text-sm
              2xl:text-lg
            "
          >
            character
          </span>
        </button>
      </div>
      <!-- <div>
        <button
          @click="handleFilterIn('ATTRIBUTE')"
          :class="{ active: filter.filterIn === 'ATTRIBUTE' }"
          class="btn bg-black rounded-lg"
        >
          <span
            :class="{ activeSpan: filter.filterIn === 'ATTRIBUTE' }"
            class="
              quantico
              uppercase
              text-white
              xs:text-xs
              xl:text-sm
              2xl:text-lg
            "
          >
            attribute
          </span>
        </button>
      </div> -->
    </div>
    <div
      v-else-if="filter.filterType === 'FRAGMENT'"
      class="mt-4 grid grid-cols-2 gap-4"
    >
      <div>
        <button
          class="btn bg-black rounded-lg"
          @click="handleFilterIn('GENOMIC')"
          :class="{ active: filter.filterIn === 'GENOMIC' }"
        >
          <span
            :class="{ activeSpan: filter.filterIn === 'GENOMIC' }"
            class="
              quantico
              uppercase
              text-white
              xs:text-xs
              xl:text-sm
              2xl:text-lg
            "
          >
            genomic
          </span>
        </button>
      </div>
      <div>
        <button
          @click="handleFilterIn('BLUEPRINT')"
          :class="{ active: filter.filterIn === 'BLUEPRINT' }"
          class="btn bg-black rounded-lg"
        >
          <span
            :class="{ activeSpan: filter.filterIn === 'BLUEPRINT' }"
            class="
              quantico
              uppercase
              text-white
              xs:text-xs
              xl:text-sm
              2xl:text-lg
            "
          >
            blueprint
          </span>
        </button>
      </div>
    </div>
    <div
      v-if="filter.filterType === 'CARD' || filter.filterType === 'ALL'"
      class="mt-8"
    >
      <span class="quantico text-white xs:text-sm xl:text-base 2xl:text-xl">
        Level (Star)
      </span>
      <span
        class="
          xs:text-xs
          xl:text-sm
          2xl:text-base
          text-gray
          uppercase
          font-bold
          cursor-pointer
        "
        @click="handleResetStar"
      >
        [clear star]
      </span>
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
      >
        <div v-for="i in 5" :key="i">
          <img
            :src="
              require(`../../assets/images/${
                filter.star >= i ? 'star.png' : 'unstar.png'
              }`)
            "
            class="cursor-pointer img-fit"
            @click="handleStar(i)"
          />
        </div>
      </div>
    </div>
    <div class="mt-4 search-auto-complete">
      <multi-select
        v-if="filter.filterIn === 'BLUEPRINT'"
        class="multi-select quantico uppercase"
        :options="parts"
        :selected-options="partItems"
        placeholder="Part"
        @select="onSelectPart"
      >
      </multi-select>
    </div>
    <div class="mt-4 search-auto-complete">
      <multi-select
        class="multi-select quantico uppercase"
        :options="rarity"
        :selected-options="rarityItems"
        placeholder="Rarity"
        @select="onSelectRarity"
      >
      </multi-select>
    </div>
    <div
      v-if="
        filter.filterIn === 'CHARACTER' ||
        filter.filterIn === 'GENOMIC' ||
        filter.filterType === 'ALL'
      "
      class="mt-4 search-auto-complete"
    >
      <multi-select
        class="multi-select quantico uppercase"
        :options="classes"
        :selected-options="classItems"
        placeholder="Class"
        @select="onSelectClass"
      >
      </multi-select>
    </div>
    <div
      v-if="filter.filterIn === 'BLUEPRINT'"
      class="mt-4 search-auto-complete"
    >
      <multi-select
        class="multi-select quantico uppercase"
        :options="elements"
        :selected-options="elementItems"
        placeholder="Element"
        @select="onSelectElement"
      >
      </multi-select>
    </div>
    <!-- <div
      v-if="filter.filterIn !== 'BLUEPRINT'"
      class="mt-4 search-auto-complete"
    >
      <multi-select
        class="multi-select quantico uppercase"
        :options="camps"
        :selected-options="campItems"
        placeholder="Camp"
        @select="onSelectCamp"
      >
      </multi-select>
    </div> -->
    <div class="mt-4 text-white">
      <button class="btn bg-black" @click="handleFilter">
        <span class="uppercase quantico" style="color: white"> done </span>
      </button>
    </div>
  </div>
</template>
<script>
import { MultiSelect, BasicSelect } from "vue-search-select";
import { mapGetters } from "vuex";
import VueSlider from "vue-slider-component";

export default {
  components: {
    BasicSelect,
    MultiSelect,
    VueSlider,
  },
  data() {
    return {
      allFilter: {},
      options: [],
      loading: false,
      rangeValue: [0, 10000],
      selections: [
        { value: "SOLARIAN", text: "SOLARIAN" },
        { value: "ANDROMEDIAN", text: "ANDROMEDIAN" },
        { value: "SCULTPIAN", text: "SCULTPIAN" },
        { value: "EXAMPLE", text: "EXAMPLE" },
      ],
      parts: [
        { value: "WEAPON", text: "WEAPON" },
        { value: "SUITE", text: "BATTLE SUIT" },
        { value: "DRONE", text: "BATTLE DRONE" },
        { value: "BOT", text: "BATTLE PET" },
        { value: "GEAR", text: "BATTLE GEAR" },
      ],
      rarity: [
        { value: "COMMON", text: "COMMON" },
        { value: "RARE", text: "RARE" },
        { value: "EPIC", text: "EPIC" },
        { value: "LEGENDARY", text: "LEGENDARY" },
        { value: "LIMITED", text: "LIMITED" },
      ],
      classes: [
        { value: "TANKER", text: "TANKER" },
        { value: "NUKER", text: "NUKER" },
        { value: "FIGHTER", text: "FIGHTER" },
        { value: "SUPPORTER", text: "SUPPORTER" },
      ],
      elements: [
        { value: "BIONIC", text: "BIONIC" },
        { value: "KINETIC", text: "KINETIC" },
        { value: "ELECTRIC", text: "ELECTRIC" },
        { value: "RADIATION", text: "RADIATION" },
        { value: "GRAVITATION", text: "GRAVITATION" },
      ],
      camps: [
        { value: "VENUS", text: "VENUS" },
        { value: "TITAN", text: "TITAN" },
        { value: "EUROPA", text: "EUROPA" },
        { value: "EARTH", text: "EARTH" },
        { value: "MARS", text: "MARS" },
      ],
      search: {
        value: "",
        text: "",
      },
      rareStyle: "",
      partItems: [],
      rarityItems: [],
      classItems: [],
      elementItems: [],
      campItems: [],
      lastSelectItemPart: {},
      lastSelectItemRarity: {},
      lastSelectItemClasses: {},
      lastSelectItemElement: {},
      lastSelectItemCamp: {},
      tribeSelected: {},
      filter: {
        filterType: "ALL",
        filterIn: "",
        star: 0,
      },
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
  mounted() {
    this.handleUpdateSearchCards();
    this.checkAllFilter();
    this.handleResetFilter();
  },
  methods: {
    checkAllFilter() {
      this.allFilter = JSON.parse(localStorage.getItem("allFilter"));
      if (this.allFilter) {
        this.filter.filterType = this.allFilter.filterType ?? "ALL";
        this.filter.filterIn = this.allFilter.filterIn;
        this.filter.star = this.allFilter.star ?? 0;
        this.rangeValue = this.allFilter.rangeValue ?? [0, 10000];
        this.partItems = this.allFilter.partItems;
        this.lastSelectItemPart = this.allFilter.lastSelectItemPart;
        this.rarityItems = this.allFilter.rarityItems;
        this.lastSelectItemRarity = this.allFilter.lastSelectItemRarity;
        this.classItems = this.allFilter.classItems;
        this.lastSelectItemClasses = this.allFilter.lastSelectItemClasses;
        this.elementItems = this.allFilter.elementItems;
        this.lastSelectItemElement = this.allFilter.lastSelectItemElement;
        this.campItems = this.allFilter.campItems;
        this.lastSelectItemCamp = this.allFilter.lastSelectItemCamp;
      }
    },
    handleUpdateSearchCards() {
      this.loading = true;
      this.options = [];
      let tempCards = [];
      this.cards.filter((card) => {
        if (card.name && card.id && !tempCards.includes(card.name)) {
          tempCards.push(card.name);
          this.options.push({
            value: card.id,
            text: card.name,
          });
        }
      });
      this.loading = false;
    },
    onTribeSelect(item) {
      this.tribeSelected = item;
    },
    handleChangeMaxValue(e, index) {
      this.rangeValue[index] = +e.target.value;
      this.allFilter = {
        ...this.allFilter,
        rangeValue: this.rangeValue,
      };
      this.setAllFilter();
    },
    setAllFilter() {
      localStorage.setItem("allFilter", JSON.stringify(this.allFilter));
    },
    handleResetStar() {
      this.filter = {
        filterType: this.filter.filterType,
        filterIn: this.filter.filterIn,
        star: 0,
      };
    },
    handleResetFilter() {
      this.loading = true;
      localStorage.removeItem("allFilter");
      this.search = {
        value: "",
        text: "",
      };
      this.filter = {
        filterType: "ALL",
        filterIn: "",
        star: 0,
      };
      this.partItems = [];
      this.rarityItems = [];
      this.classItems = [];
      this.elementItems = [];
      this.campItems = [];
      this.options = [];
      this.rangeValue = [0, 10000];
      this.$emit("resetFilter");
      this.loading = false;
    },
    handleFilterType(filterType) {
      localStorage.removeItem("allFilter");
      this.search = {
        value: "",
        text: "",
      };
      this.filter = {
        filterType: filterType,
        filterIn: "",
        star: 0,
      };
      if (filterType === "CARD") {
        this.filter.filterIn = "CHARACTER";
      } else if (filterType === "FRAGMENT") {
        this.filter.filterIn = "GENOMIC";
      } else if (filterType === "ALL") {
        this.filter.filterIn = "";
      }
      this.filter.filterType = filterType;
      this.allFilter = {
        ...this.allFilter,
        filter: this.filter,
      };
      this.setAllFilter();
    },
    handleFilterIn(filterIn) {
      this.filter.filterIn = filterIn;
      this.allFilter = {
        ...this.allFilter,
        filter: this.filter,
      };
      this.setAllFilter();
    },
    handleStar(number) {
      this.filter.star = number;
      this.allFilter = {
        ...this.allFilter,
        filter: this.filter,
      };
      this.setAllFilter();
    },
    onSearch(item) {
      this.search = item;
      this.allFilter = {
        ...this.allFilter,
        search: this.search,
      };
      this.setAllFilter();
    },
    onSelectPart(items, lastSelectItem) {
      this.partItems = items;
      this.lastSelectItemPart = lastSelectItem;
      this.allFilter = {
        ...this.allFilter,
        partItems: this.partItems,
        lastSelectItemPart: this.lastSelectItemPart,
      };
      this.setAllFilter();
    },
    onSelectRarity(items, lastSelectItem) {
      this.rarityItems = items;
      this.lastSelectItemRarity = lastSelectItem;
      this.allFilter = {
        ...this.allFilter,
        rarityItems: this.rarityItems,
        lastSelectItemRarity: this.lastSelectItemRarity,
      };
      this.setAllFilter();
    },
    onSelectClass(items, lastSelectItem) {
      this.classItems = items;
      this.lastSelectItemClasses = lastSelectItem;
      this.allFilter = {
        ...this.allFilter,
        classItems: this.classItems,
        lastSelectItemClasses: this.lastSelectItemClasses,
      };
      this.setAllFilter();
    },
    onSelectElement(items, lastSelectItem) {
      this.elementItems = items;
      this.lastSelectItemElement = lastSelectItem;
      this.allFilter = {
        ...this.allFilter,
        elementItems: this.elementItems,
        lastSelectItemElement: this.lastSelectItemElement,
      };
      this.setAllFilter();
    },
    onSelectCamp(items, lastSelectItem) {
      this.campItems = items;
      this.lastSelectItemCamp = lastSelectItem;
      this.allFilter = {
        ...this.allFilter,
        campItems: this.campItems,
        lastSelectItemCamp: this.lastSelectItemCamp,
      };
      this.setAllFilter();
    },
    onChangeMaxValue(value) {
      this.rangeValue = value;
      this.allFilter = {
        ...this.allFilter,
        rangeValue: this.rangeValue,
      };
      this.setAllFilter();
    },
    handleFilter() {
      const filterAll = {
        search: this.search.text,
        star: String(this.filter.star),
        parts: this.partItems ? this.partItems.map((item) => item.value) : [],
        rarity: this.rarityItems
          ? this.rarityItems.map((item) => item.value)
          : [],
        classes: this.classItems
          ? this.classItems.map((item) => item.value)
          : [],
        elements: this.elementItems
          ? this.elementItems.map((item) => item.value)
          : [],
        camps: this.campItems ? this.campItems.map((item) => item.value) : [],
        fragment: this.filter.filterIn,
        nft_type: this.filter.filterType,
        price: {
          min: this.rangeValue[0],
          max: this.rangeValue[1],
        },
      };
      this.$emit("filter", filterAll);
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

.container-market-place {
  background-color: #1d1d1d;
}
.quantico {
  font-family: "Quantico";
}
.text-gray {
  color: #3f4148;
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
.vue-slider-process {
  background-color: #e0fb16;
}
.vue-slider-dot-handle {
  background-color: #e0fb16;
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
.img-fit {
  width: 30px;
  height: 30px;
}
.ui.multiple.dropdown>.label {
  background-color: white !important;
}

</style>
