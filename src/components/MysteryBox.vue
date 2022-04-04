<template>
  <div>
    <div class="bg-card-redeem p-10">
      <h1 style="font-size: 1.8rem">OPEN MYSTERY BOX</h1>
      <img v-if="mysteryBox" :src="mysteryBox" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <button
            class="btn btn-approve"
            :disabled="isApprove || !loadApprove"
            @click="approveHandler"
          >
            <div class="lds-ring ml-2 mt-0" v-if="onloadApprove">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div v-else>APPROVE</div>
          </button>
        </div>
        <div>
          <button
            class="btn btn-redeemtion "
            @click="redeemHandler"
            :disabled="!isApprove || !loadApprove"
          >
            <div v-if="onload" class="lds-ring ml-2 mt-0">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div v-if="!onload">REDEEM</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MysteryBox",

  props: {
    isApprove: {
      type: Boolean
    },
    onload: {
      type: Boolean
    },
    onloadApprove: {
      type: Boolean
    },
    loadApprove: {
      type: Boolean
    }
  },
  data() {
    return {
      mysteryBox: null
    };
  },
  created() {
    if (this.$route.query.type === "2" || this.$route.query.type === "3") {
      this.mysteryBox =
        "https://ecio.sgp1.digitaloceanspaces.com/redeem-box-02.png";
    } else if (this.$route.query.type === "1") {
      this.mysteryBox =
        "https://ecio.sgp1.digitaloceanspaces.com/redeem-box-01.png";
    } else {
      this.mysteryBox =
        "https://ecio.sgp1.digitaloceanspaces.com/redeem-box-00.png";
    }
  },
  methods: {
    approveHandler() {
      this.$emit("approveHandler", true);
    },
    redeemHandler() {
      this.$emit("redeemHandler", true);
    }
  }
};
</script>

<style></style>
