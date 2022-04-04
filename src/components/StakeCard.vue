<template>
  <div>
    <div class="box-stake" :class="{ 'coming-soon': !status }">
      <div class="header text-center">
        <h2>{{ title }}</h2>
      </div>
      <div class="body">
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>Pool End in</h4></div>
            <div class="col-6">
              <p v-if="attribute.poolEnd != null">
                <CountDown :date="attribute.poolEnd" />
              </p>
              <p v-else>-</p>
            </div>
          </div>
        </div>
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>APR</h4></div>
            <div class="col-6">
              <p v-if="attribute.apr > 0">{{ attribute.apr }}%</p>
              <p v-else>-</p>
            </div>
          </div>
        </div>
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>Min Per Staking</h4></div>
            <div class="col-6">
              <p>{{ Number(attribute.minPerStake).toLocaleString() }}</p>
            </div>
          </div>
        </div>
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>Unstake period</h4></div>
            <div class="col-6">
              <p>{{ attribute.unstakePeriodFree }} DAYS FEE 0%</p>
              <p>URGENT FEE {{ attribute.unstakePeriodUrgentFee }}%</p>
            </div>
          </div>
        </div>
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>TOTAL Pool status</h4></div>
            <div class="col-6">
              <p>
                {{
                  status
                    ? (
                        Number(attribute.totalPoolStatusMax) -
                        Number(attribute.totalPoolStatusCurrent)
                      ).toLocaleString()
                    : Number(attribute.totalPoolStatusCurrent).toLocaleString()
                }}
              </p>
              <p>
                /{{ Number(attribute.totalPoolStatusMax).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>Your stake</h4></div>
            <div class="col-6">
              <p class="text-custom-green">
                {{ Number(attribute.yourStake).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-row">
          <div class="row m-0 text-uppercase w-100">
            <div class="col-6"><h4>Your reward</h4></div>
            <div class="col-6">
              <p>
                <!-- {{ Number(attribute.yourReward).toLocaleString(undefined, {minimumFractionDigits: 14} }} -->
                {{
                  Number(attribute.yourReward).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="row mt-4 text-uppercase" v-if="!status">
          <div class="col-12">
            <button class="w-100 btn btn-ecio quantico" disabled>
              COMING SOON
            </button>
          </div>
        </div>
        <div v-else>
          <div
            class="row mt-4 text-uppercase"
            v-if="!isStaked && attribute.stakeStatus == 'NO STAKE'"
          >
            <div class="col-6 pr-2">
              <button
                :disabled="isApproved"
                class="btn btn-ecio-primary w-100"
                @click="$emit('approveHandler', index)"
              >
                APPROVE
              </button>
            </div>
            <div class="col-6 pl-2">
              <button
                :disabled="
                  !isApproved ||
                    Number(attribute.totalPoolStatusCurrent) <
                      Number(attribute.minPerStake) ||
                    isPoolEnd
                "
                class="btn btn-ecio w-100"
                @click="
                  isApproved
                    ? [
                        $modal.show('caution'),
                        $emit('setSelectPool', index, title),
                      ]
                    : ''
                "
              >
                STAKE NOW
              </button>
            </div>
          </div>
          <div
            class="row mt-4"
            v-else-if="isStaked && attribute.stakeStatus == 'STAKED'"
          >
            <div class="col-6 pr-2">
              <button
                class="btn btn-ecio-primary w-100 text-uppercase"
                :disabled="checkPoolRemainMin || isPoolEnd"
                @click="
                  $modal.show('caution'), $emit('setSelectPool', index, title)
                "
              >
                STAKE MORE
              </button>
            </div>
            <div class="col-6 pl-2">
              <button
                class="btn btn-ecio w-100 text-uppercase"
                @click="
                  $modal.show('confirmUnstake'),
                    $emit('setSelectPool', index, title)
                "
              >
                UNSTAKE
              </button>
            </div>
          </div>
          <div class="row mt-2" v-else-if="attribute.stakeStatus == 'WAITING'">
            <div class="col-12">
              <p
                class="
                  text-center
                  mt-2
                  w-100
                  mb-1
                  text-uppercase text-count-time
                "
              >
                Claim with 0% fee in
                <CountDown :date="attribute.releaseTime" />
              </p>
            </div>
            <div class="col-12">
              <button
                :disabled="!timeOut"
                class="btn btn-ecio w-100 text-uppercase"
                @click="
                  $modal.show('claimToken'),
                    $emit('setSelectPool', index, title)
                "
              >
                CLAIM
              </button>
            </div>
            <div class="col-12 mt-2">
              <button
                :disabled="timeOut || !attribute.stakeStatus == 'WAITING'"
                class="btn btn-ecio-danger w-100 text-uppercase"
                @click="
                  $modal.show('unStakeNow'),
                    $emit('emitFree', attribute.unstakePeriodUrgentFee),
                    $emit('setSelectPool', index, title)
                "
              >
                urgent unstake with
                {{ attribute.unstakePeriodUrgentFee }}% fee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountDown from "@/components/CountDown";
export default {
  components: { CountDown },
  props: {
    index: { default: Number, return: 0 },
    attribute: {
      poolEnd: { default: String, return: new Date("12/31/2022 12:00 AM") },
      apr: { default: Number, return: 200 },
      minPerStake: { default: Number, return: 35000 },
      unstakePeriodFree: { default: String, return: "5" },
      unstakePeriodUrgentFee: { default: String, return: "URGENT FEE 10%" },
      totalPoolStatusCurrent: { default: Number, return: 0 },
      totalPoolStatusMax: { default: Number, return: 70000000 },
      yourStake: { default: Number, return: 0 },
      yourReward: { default: Number, return: 0 },
      releaseTime: { default: String, return: new Date() },
      stakeStatus: { default: String, return: "NO STAKE" },
      poolRemain: { default: Boolean, return: true },
      poolRemainMin: { default: Boolean, return: true },
    },
    status: {
      default: Boolean,
      return: false,
    },
    title: {
      default: String,
      return: "",
    },
    isApproved: {
      default: Boolean,
      return: false,
    },
    isStaked: {
      default: Boolean,
      return: false,
    },
    // isLocked: {
    //   default: Boolean,
    //   return: false,
    // },
  },
  data() {
    return {
      dateNow: new Date(),
      remainMin: true,
    };
  },
  mounted() {
    window.setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
  },
  // created() {
  //   this.checkPoolRemainMin();
  // },
  // methods: {
  //   checkPoolRemainMin() {
  //     console.log("remainMin", this.remainMin);
  //     console.log(
  //       "this.remainMin",
  //       Number(this.attribute.totalPoolStatusCurrent)
  //     );
  //     this.remainMin =
  //       Number(this.attribute.totalPoolStatusCurrent) <=
  //       Number(this.attribute.minPerStake);
  //   },
  // },
  computed: {
    checkPoolRemainMin() {
      return (
        Number(this.attribute.totalPoolStatusCurrent) <=
        Number(this.attribute.minPerStake)
      );
    },
    endDate() {
      return this.attribute.releaseTime;
    },
    poolEndDate() {
      return this.attribute.poolEnd;
    },
    isPoolEnd() {
      return this.dateNow >= this.poolEndDate ? true : false;
    },
    timeOut() {
      return this.dateNow >= this.endDate ? true : false;
    },
  },
};
</script>
<style scoped>
.box-stake.coming-soon .header {
  padding-top: 10px;
  background-image: url("../assets/images/staking/header-disable.png");
}
.box-stake .header {
  padding-top: 10px;
  background-image: url("../assets/images/staking/header.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  height: 75px;
}
.box-stake.coming-soon .header h2 {
  color: #818181;
}

.box-stake .header h2 {
  color: #e0fb16;
  text-transform: uppercase;
  font-size: 2.5rem;
}
.box-stake.coming-soon .body {
  background-image: url("../assets/images/staking/body-disable.png");
}

.box-stake .body {
  padding: 35px;
  background-image: url("../assets/images/staking/body.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  /* min-height: 600px; */
}

.box-stake .body .bg-row {
  background: #222326;
  border-radius: 10px;
  height: 55px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
}

.box-stake .body .bg-row h4 {
  color: #818181;
  font-size: 1.1rem;
}
.box-stake .body .bg-row p {
  color: #fff;
  font-weight: bold;
  font-size: 1rem !important;
}
.btn.btn-ecio:disabled {
  transform: none;
  cursor: default;
  border: 0;
  color: #818181;
  background-color: #222326;
  opacity: 1;
}

blockquote,
ol,
p,
pre,
table,
ul,
.h4,
h4 {
  margin: 0 !important;
}
@media (max-width: 1024px) {
  .box-stake .body .bg-row h4 {
    font-size: 14px;
  }
  .box-stake .body .bg-row p {
    font-size: 12px !important;
  }
  .box-stake .body .bg-row {
    height: 40px;
  }
  .box-stake .header h2 {
    color: #e0fb16;
    text-transform: uppercase;
    font-size: 30px;
  }
  .box-stake .body {
    /* min-height: 600px; */
    margin-top: -5px;
    padding: 25px 15px;
  }

  .btn.btn-ecio,
  .btn.btn-ecio-danger,
  .btn.btn-ecio-primary {
    height: 35px;
  }
}
@media (max-width: 600px) {
  .box-stake .body .bg-row h4 {
    font-size: 12px;
  }
  .box-stake .body .bg-row p {
    font-size: 10px !important;
  }
  .box-stake .body .bg-row {
    height: 38px;
  }
  .box-stake .header h2 {
    color: #e0fb16;
    text-transform: uppercase;
    font-size: 25px;
  }
  .box-stake .body {
    /* min-height: 540px; */
    margin-top: -10px;
    padding: 15px;
  }

  .btn.btn-ecio,
  .btn.btn-ecio-danger,
  .btn.btn-ecio-primary {
    height: 28px;
  }
}
@media (max-width: 320px) {
  .box-stake .body {
    margin-top: -20px;
  }
}
</style>
