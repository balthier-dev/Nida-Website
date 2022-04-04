<template>
  <div class="main-container p-8 bg-custom min-h-screen">
    <div class="mr-24">
      <div class="grid grid-cols-2 justify-between">
        <div class="custom-select self-center relative">
          <select class="form-select rounded-xl border-0">
            <option
              v-for="(option, index) in options"
              :selected="index === 0"
              class="quandro"
              v-bind:key="index"
            >
              {{ option }}
            </option>
          </select>
          <div class="absolute top-0 right-2 h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill text-white h-full mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              />
            </svg>
          </div>
        </div>
        <div class="self-center justify-self-end">
          <spap
            class="quandro md:text-4xl lg:text-5xl xl:text-7xl text-white bold"
            >234560 cards</spap
          >
        </div>
      </div>
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-24 mt-12">
        <div v-for="card in cards" v-bind:key="card.id" class="card">
          <div class="grid grid-cols-2 p-4">
            <div>
              <span class="quandro text-white text-base">card</span>
            </div>
            <div class="justify-self-end">
              <span class="quandro text-base card-id">{{ card.id }}</span>
            </div>
          </div>
          <div class="divider" />
          <div class="py-4 px-4">
            <img src="../../assets/images/character1.png" />
          </div>
          <div class="divider" />
          <div class="grid grid-cols-3 p-4">
            <div class="self-center">
              <span class="quandro text-custom-green text-xl text-base"
                >${{ card.price }}</span
              >
            </div>
            <div class="self-center">
              <button class="btn bg-custom-green">
                <span class="quandro text-black">buy</span>
              </button>
            </div>
            <div class="self-center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          id: "#000000001",
          price: 2000,
        },
        {
          id: "#000000002",
          price: 3000,
        },
        {
          id: "#000000003",
          price: 4000,
        },
        {
          id: "#000000004",
          price: 1000,
        },
        {
          id: "#000000005",
          price: 2000,
        },
        {
          id: "#000000006",
          price: 2000,
        },
        {
          id: "#000000007",
          price: 2000,
        },
        {
          id: "#000000008",
          price: 2000,
        },
        {
          id: "#000000009",
          price: 2000,
        },
        {
          id: "#000000010",
          price: 2000,
        },
      ],
      options: [
        "Lowest ID",
        "Highest ID",
        "Lowest Price",
        "Highest Price",
        "Latest",
      ],
    };
  },
};
</script>

<style>
.custom-select {
  width: 230px;
}
.bg-custom {
  background-color: #111111;
}
.card {
  background-color: #252525;
  border-radius: 10px;
  cursor: pointer;
}
.text-custom-green {
  color: #e0fb16;
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
.quandro {
  font-family: Quantico;
  text-transform: uppercase;
}
.form-select {
  background-color: #000000;
  color: #ffffff;
  padding-left: 10px;
}
</style>
